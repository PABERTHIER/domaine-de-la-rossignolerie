export type ContactFormField = 'name' | 'phone' | 'email' | 'message'

export interface ContactFormFieldDefinition {
  id: ContactFormField
  type: 'text' | 'tel' | 'email'
  autocomplete: string
  maximum: number
  required: boolean
}

export type ContactFieldError =
  'required_error' | 'email_error' | 'length_error' | 'characters_error'

export type ContactFormErrors = Partial<
  Record<ContactFormField, ContactFieldError>
>

export type ContactFormFeedback =
  | ''
  | 'invalid'
  | 'failure'
  | 'unavailable'
  | 'rate'
  | 'success'
  | 'retry_expired'

export type ContactFormAvailability =
  'checking' | 'available' | 'unavailable' | 'failure'
