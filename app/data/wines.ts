export const wines = [
  { id: 'anjou25', image: 'anjou', grape: 'Chenin', production: 5733 },
  { id: 'anjou24', image: 'anjou', grape: 'Chenin', production: 4667 },
  { id: 'rose25', image: 'rose', grape: 'Grolleau', production: 2133 },
  { id: 'epure', image: 'epure', grape: 'Chenin', production: 4910 },
  { id: 'eclat', image: 'eclat', grape: 'Grolleau', production: 1078 },
  { id: 'layon25', image: 'layon', grape: 'Chenin', production: 2800 },
] as const

export type WineId = (typeof wines)[number]['id']
