export function generateId(prefix?: string): string {
  const randomUUID = crypto.randomUUID().replace(/-/g, '').slice(0, 8);
  if (prefix) {
    return `${prefix}-${randomUUID}`;
  }
  return randomUUID;
}
