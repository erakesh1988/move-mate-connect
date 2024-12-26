export const USER_ROLES = ['customer', 'partner', 'vendor', 'hr'] as const;
export type UserRole = (typeof USER_ROLES)[number];