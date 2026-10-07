export type SignInMethod = 'google' | 'whatsapp' | 'facebook' | 'cuenta';

export const SIGN_IN_OPTIONS: Record<
  SignInMethod,
  { name: string; detail: string; label: string }
> = {
  google: { name: 'Sofía', detail: 'sofia.parches@gmail.com', label: 'Google' },
  whatsapp: { name: 'Sofía', detail: '+57 310 555 0142', label: 'WhatsApp' },
  facebook: { name: 'Sofía', detail: 'Sofía en Facebook', label: 'Facebook' },
  cuenta: { name: 'Nuevo parche', detail: 'Cuenta nueva', label: 'Cuenta nueva' },
};

export function displayNameFromEmail(email: string): string {
  const local = email.split('@')[0]?.trim() ?? '';
  if (!local) return 'Tú';
  return local.charAt(0).toLocaleUpperCase('es-CO') + local.slice(1);
}

export function applyCreatedAccount(email: string) {
  SIGN_IN_OPTIONS.cuenta = {
    name: displayNameFromEmail(email),
    detail: email,
    label: 'Cuenta nueva',
  };
}
