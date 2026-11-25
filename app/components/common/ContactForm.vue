<template>
  <div class="contact-form">
    <p v-if="!mounted" class="contact-form__fallback">
      {{ t('components.contact_form.javascript_required') }}
    </p>
    <div v-if="mounted" class="contact-form__availability">
      <p
        ref="availabilityElement"
        tabindex="-1"
        role="status"
        aria-atomic="true">
        {{ availabilityMessage }}
      </p>
      <button
        v-if="availability === 'unavailable' || availability === 'failure'"
        ref="availabilityButton"
        type="button"
        :disabled="pending"
        @click="checkAvailability">
        {{ t('components.contact_form.check_again') }}
      </button>
    </div>
    <form
      ref="formElement"
      method="post"
      action="/api/contact"
      novalidate
      :aria-busy="pending"
      @submit.prevent="submit"
      @input="handleInput">
      <p>{{ t('components.contact_form.required') }}</p>
      <div v-if="invalidFields.length" class="contact-form__summary">
        <p>{{ t('components.contact_form.invalid') }}</p>
        <ul>
          <li v-for="field in invalidFields" :key="field.id">
            <a
              :href="`#contact-${field.id}`"
              @click.prevent="focusField(field.id)">
              {{ t(`components.contact_form.${field.id}`) }}:
              {{ t(`components.contact_form.${errors[field.id]}`) }}
            </a>
          </li>
        </ul>
      </div>
      <fieldset :disabled="!mounted || pending">
        <legend class="sr-only">
          {{ t('components.contact_form.legend') }}
        </legend>
        <div class="contact-form__fields">
          <div
            v-for="field in fields"
            :key="field.id"
            class="contact-form__field"
            :class="{
              'contact-form__field--wide':
                field.id === 'email' || field.id === 'message',
            }">
            <label :for="`contact-${field.id}`">
              {{ t(`components.contact_form.${field.id}`)
              }}{{ field.required ? ' *' : '' }}
            </label>
            <textarea
              v-if="field.id === 'message'"
              id="contact-message"
              v-model="form.message"
              name="message"
              rows="4"
              required
              :maxlength="field.maximum"
              :aria-invalid="Boolean(errors.message)"
              :aria-describedby="
                errors.message ? 'contact-error-message' : undefined
              "
              @blur="validateField('message')" />
            <input
              v-else
              :id="`contact-${field.id}`"
              v-model="form[field.id]"
              :name="field.id"
              :type="field.type"
              :inputmode="field.id === 'phone' ? 'tel' : undefined"
              :autocomplete="field.autocomplete"
              :spellcheck="field.id === 'email' ? false : undefined"
              :maxlength="field.maximum"
              :required="field.required"
              :aria-invalid="Boolean(errors[field.id])"
              :aria-describedby="
                errors[field.id] ? `contact-error-${field.id}` : undefined
              "
              @blur="validateField(field.id)" />
            <p
              v-if="errors[field.id]"
              :id="`contact-error-${field.id}`"
              class="contact-form__error">
              {{ t(`components.contact_form.${errors[field.id]}`) }}
            </p>
          </div>
        </div>
        <div class="contact-form__honeypot" aria-hidden="true" inert>
          <label for="contact-website">
            {{ t('components.contact_form.website') }}
          </label>
          <input
            id="contact-website"
            v-model="form.website"
            name="website"
            maxlength="200"
            tabindex="-1"
            autocomplete="off" />
        </div>
      </fieldset>
      <p class="contact-form__privacy">
        {{ t('components.contact_form.privacy') }}
        <NuxtLink :to="localePath('/privacy')">
          {{ t('components.contact_form.privacy_link') }}
        </NuxtLink>
      </p>
      <button
        class="contact-form__send"
        type="submit"
        :disabled="
          !mounted ||
          pending ||
          availability !== 'available' ||
          coolingDown ||
          feedback === 'retry_expired'
        ">
        {{
          t(
            pending
              ? 'components.contact_form.sending'
              : 'components.contact_form.send'
          )
        }}
      </button>
    </form>
    <p
      ref="feedbackElement"
      class="contact-form__feedback"
      tabindex="-1"
      role="status"
      aria-atomic="true">
      {{
        pending
          ? t('components.contact_form.sending')
          : feedback
            ? t(`components.contact_form.${feedback}`)
            : ''
      }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type {
  ContactFormAvailability,
  ContactFormErrors,
  ContactFormFeedback,
  ContactFormField,
  ContactFormFieldDefinition,
} from '~/types/contact'

const { t } = useI18n()
const localePath = useLocalePath()

const fields = [
  {
    id: 'name',
    type: 'text',
    autocomplete: 'name',
    maximum: 120,
    required: false,
  },
  {
    id: 'phone',
    type: 'tel',
    autocomplete: 'tel',
    maximum: 60,
    required: false,
  },
  {
    id: 'email',
    type: 'email',
    autocomplete: 'email',
    maximum: 254,
    required: true,
  },
  {
    id: 'message',
    type: 'text',
    autocomplete: 'off',
    maximum: 5000,
    required: true,
  },
] as const satisfies readonly ContactFormFieldDefinition[]

const form = reactive({
  name: '',
  phone: '',
  email: '',
  message: '',
  website: '',
})

const formElement = useTemplateRef('formElement')
const feedbackElement = useTemplateRef('feedbackElement')
const availabilityElement = useTemplateRef('availabilityElement')
const availabilityButton = useTemplateRef('availabilityButton')

const errors = ref<ContactFormErrors>({})
const feedback = ref<ContactFormFeedback>('')
const availability = ref<ContactFormAvailability>('checking')
const mounted = ref(false)
const pending = ref(false)
const coolingDown = ref(false)

const invalidFields = computed(() =>
  fields.filter(field => errors.value[field.id])
)

const availabilityMessage = computed(() =>
  t(
    `components.contact_form.${
      availability.value === 'failure' ? 'status_failure' : availability.value
    }`
  )
)

let statusController: AbortController | undefined
let sendController: AbortController | undefined
let cooldownTimer: ReturnType<typeof setTimeout> | undefined
let requestId = ''
let requestCreatedAt = 0

async function checkAvailability() {
  if (pending.value || statusController) {
    return
  }

  const restoreFocus = document.activeElement === availabilityButton.value

  availability.value = 'checking'
  statusController = new AbortController()

  const controller = statusController
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const result = await $fetch('/api/contact/status', {
      signal: controller.signal,
      retry: 0,
      cache: 'no-store',
    })

    if (mounted.value) {
      availability.value =
        result.available === true ? 'available' : 'unavailable'
    }
  } catch {
    if (mounted.value) {
      availability.value = 'failure'
    }
  } finally {
    clearTimeout(timeout)

    statusController = undefined

    await nextTick()

    if (
      mounted.value &&
      restoreFocus &&
      document.activeElement === document.body
    ) {
      availabilityElement.value?.focus()
    }
  }
}

function focusField(field: ContactFormField) {
  formElement.value?.querySelector<HTMLElement>(`#contact-${field}`)?.focus()
}

function validateField(field: ContactFormField) {
  if (field !== 'email' && field !== 'message') {
    return
  }

  const value = form[field].trim()

  const error = !value
    ? 'required_error'
    : field === 'email' && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)
      ? 'email_error'
      : undefined

  errors.value = { ...errors.value, [field]: error }
}

function handleInput(event: Event) {
  const target = event.target

  if (!(
    target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
  )) {
    return
  }

  const field = fields.find(item => item.id === target.name)

  if (field?.id === 'phone') {
    const value = target.value
    const filtered = value.replace(/[^\d+().\-\s]/g, '')

    if (filtered !== value) {
      const caret = target.selectionStart

      form.phone = filtered
      target.value = filtered

      if (caret !== null) {
        const position = value
          .slice(0, caret)
          .replace(/[^\d+().\-\s]/g, '').length

        target.setSelectionRange(position, position)
      }
    }
  }

  if (field) {
    errors.value = Object.fromEntries(
      Object.entries(errors.value).filter(([id]) => id !== field.id)
    )
  }

  feedback.value = ''
  requestId = ''
}

function recordFailure(data: unknown) {
  feedback.value = 'failure'

  if (!data || typeof data !== 'object' || !('error' in data)) {
    return
  }

  const detail = data.error

  if (!detail || typeof detail !== 'object') {
    return
  }

  if ('code' in detail) {
    switch (detail.code) {
      case 'invalid':
      case 'unavailable':
      case 'rate':
        feedback.value = detail.code
    }
  }

  if (
    'fields' in detail &&
    detail.fields &&
    typeof detail.fields === 'object'
  ) {
    const serverFields = detail.fields as Record<string, unknown>

    for (const { id } of fields) {
      const code = serverFields[id]

      if (
        code === 'required_error' ||
        code === 'email_error' ||
        code === 'length_error' ||
        code === 'characters_error'
      ) {
        errors.value[id] = code
      }
    }
  }
}

async function submit() {
  if (
    !mounted.value ||
    pending.value ||
    availability.value !== 'available' ||
    coolingDown.value
  ) {
    return
  }

  errors.value = {}
  feedback.value = ''

  validateField('email')
  validateField('message')

  const firstInvalid = invalidFields.value[0]

  if (firstInvalid) {
    feedback.value = 'invalid'

    await nextTick()

    focusField(firstInvalid.id)

    return
  }

  // Retain the UUID after ambiguous failures; never silently resend an expired enquiry
  if (requestId && Date.now() - requestCreatedAt >= 24 * 60 * 60 * 1000) {
    feedback.value = 'retry_expired'

    return
  }

  pending.value = true

  let timeout: ReturnType<typeof setTimeout> | undefined

  try {
    if (!requestId) {
      requestId = crypto.randomUUID()
      requestCreatedAt = Date.now()
    }

    sendController = new AbortController()

    const controller = sendController

    timeout = setTimeout(() => controller.abort(), 30000)

    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, requestId },
      signal: controller.signal,
      retry: 0,
    })

    if (!mounted.value) {
      return
    }

    if (response.accepted !== true) {
      recordFailure(response)
    } else {
      feedback.value = 'success'
      Object.assign(form, {
        name: '',
        phone: '',
        email: '',
        message: '',
        website: '',
      })
      requestId = ''
    }
  } catch (error) {
    if (!mounted.value) {
      return
    }

    recordFailure(
      error && typeof error === 'object' && 'data' in error
        ? error.data
        : undefined
    )

    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response instanceof Response
    ) {
      const seconds = Number(error.response.headers.get('Retry-After'))

      if (Number.isFinite(seconds) && seconds > 0 && seconds <= 86400) {
        coolingDown.value = true
        cooldownTimer = setTimeout(() => {
          coolingDown.value = false
        }, seconds * 1000)
      }
    }
  } finally {
    clearTimeout(timeout)
    sendController = undefined
    pending.value = false

    const moveFocus =
      document.activeElement === document.body ||
      formElement.value?.contains(document.activeElement)

    await nextTick()

    if (mounted.value && moveFocus) {
      const first = invalidFields.value[0]

      if (first) {
        focusField(first.id)
      } else {
        feedbackElement.value?.focus()
      }
    }
  }
}

onMounted(() => {
  mounted.value = true
  void checkAvailability()
})

onBeforeUnmount(() => {
  mounted.value = false
  statusController?.abort()
  sendController?.abort()
  clearTimeout(cooldownTimer)
})
</script>

<style lang="scss" scoped>
.contact-form {
  form {
    position: relative;
  }

  fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  &__summary {
    padding: $space-16;
    margin-block: $space-16;
    border: 2px solid $green;

    p {
      margin: 0;
      font-weight: 700;
    }

    ul {
      margin-bottom: 0;
      padding-left: $space-20;
    }

    a {
      display: inline-flex;
      align-items: center;
      min-height: $control-size;
    }
  }

  &__availability {
    border-left: 3px solid $green;
    padding-left: $space-16;
  }

  &__fields {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: $space-24;
  }

  label {
    display: block;
    margin-bottom: $space-6;
  }

  input,
  textarea {
    width: 100%;
    min-width: 0;
    min-height: $control-size;
    padding: $space-10;
    border: 1px solid $green;
    border-radius: 0;
    background: rgba($paper, 0.55);
    color: $ink;
    scroll-margin-top: calc(var(--site-header-height, 80px) + 16px);
  }

  textarea {
    resize: vertical;
  }

  &__honeypot {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }

  &__send {
    min-width: min(128px, 100%);
    color: $paper;
    background: $vine;
  }

  &__error {
    margin: $space-4 0 0;
    color: $contact-error;
    font-weight: 700;
  }

  [aria-invalid='true'] {
    border-width: 2px;
    border-color: $contact-error;

    &:focus-visible {
      outline-color: $contact-error;
    }
  }

  &__privacy {
    font-size: 0.9375rem;

    a {
      display: inline-flex;
      align-items: center;
      min-height: $control-size;
    }
  }

  &__feedback {
    scroll-margin-top: calc(var(--site-header-height, 80px) + 16px);

    &:empty {
      margin: 0;
    }
  }
}

@media (forced-colors: active) {
  .contact-form {
    &__error {
      color: CanvasText;
    }

    [aria-invalid='true'] {
      border-color: CanvasText;

      &:focus-visible {
        outline-color: Highlight;
      }
    }
  }
}

@media (min-width: $breakpoint-mobile) {
  .contact-form {
    &__fields {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__field--wide {
      grid-column: 1 / -1;
    }
  }
}
</style>
