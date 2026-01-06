// Shared validation utilities

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(email: string): string | null {
  const strVal = email.trim();
  if (!strVal) return 'This field is required';
  if (!EMAIL_REGEX.test(strVal)) return 'Please enter a valid email address';
  if (strVal.length > 255) return 'Email address is too long';
  return null;
}

export function validateEmailForQuasar(val: string): boolean | string {
  const error = validateEmail(val);
  return error || true;
}

export function validateName(val: string): boolean | string {
  if (!val) return 'This field is required';
  const nameRegex = /^[A-Za-z\sñÑ-]+$/;
  if (!nameRegex.test(val)) {
    return 'Only letters, spaces, ñ, Ñ, and hyphens are allowed';
  }
  return true;
}

export function validateMobileNumber(val: string): boolean | string {
  if (!val) return 'This field is required';
  const numberRegex = /^\d+$/;
  if (!numberRegex.test(val)) {
    return 'Only numbers are allowed';
  }
  if (val.length < 10 || val.length > 11) {
    return 'Mobile number must be 10 or 11 digits';
  }
  return true;
}

export function validateText(
  val: string | number | null,
  fieldName: string,
  maxLength: number,
): boolean | string {
  const strVal = String(val || '').trim();
  if (!strVal) return 'This field is required';
  if (strVal.length > maxLength) return `${fieldName} must be less than ${maxLength} characters`;
  const textRegex = /^[A-Za-z0-9\s.,\-'&()]+$/;
  if (!textRegex.test(strVal)) {
    return `${fieldName} contains invalid characters`;
  }
  return true;
}

export function sanitizeText(value: string, maxLength: number): string {
  return value.replace(/[<>"'`]/g, '').trim().slice(0, maxLength);
}

export function sanitizeName(value: string): string {
  return value.replace(/[^A-Za-z\sñÑ-]/g, '');
}

export function sanitizeMobile(value: string): string {
  const sanitized = value.replace(/\D/g, '');
  return sanitized.length > 11 ? sanitized.slice(0, 11) : sanitized;
}

export function sanitizeEmail(value: string): string {
  return value.trim().toLowerCase().slice(0, 255);
}

