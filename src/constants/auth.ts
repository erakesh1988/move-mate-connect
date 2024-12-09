export const USER_ROLES = ['customer', 'partner', 'vendor'] as const;
export type UserRole = (typeof USER_ROLES)[number];