export const statusColors = {
  operational: 'bg-green-500',
  degraded: 'bg-yellow-500',
  down: 'bg-red-500',
} as const

export const statusTexts = {
  operational: 'All Services Nominal',
  degraded: 'Degraded Performance',
  down: 'Service Outage',
} as const

export type ServiceStatus = keyof typeof statusColors
