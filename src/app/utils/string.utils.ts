export function toTitleCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function slugify(
  str: string,
  options: { toLowerCase?: boolean; replacement?: string } = {},
): string {
  const { toLowerCase = true, replacement = '-' } = options;

  let result = str
    .normalize('NFD') // décompose accents
    .replace(/[\u0300-\u036f]/g, '') // supprime accents
    .replace(/[^a-zA-Z0-9\s]/g, '') // supprime caractères spéciaux
    .trim();

  if (toLowerCase) {
    result = result.toLowerCase();
  }

  return result.replace(/\s+/g, replacement);
}
