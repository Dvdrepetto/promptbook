const BLOCKED_WORDS = [
  'boludo',
  'boluda',
  'pelotudo',
  'pelotuda',
  'idiota',
  'imbecil',
  'estupido',
  'estupida',
  'mierda',
  'puta',
  'puto',
  'forro',
  'forra',
  'gil',
  'mogolico',
  'mogolica',
  'pendejo',
  'pendeja',
  'conchudo',
  'conchuda',
  'cabron',
  'cabrona',
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'bastard',
  'wtf',
  'pija',
  'polla',
]

function normalizeText(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function containsBlockedWords(text: string) {
  const normalizedText = normalizeText(text)

  return BLOCKED_WORDS.some((word) => {
    const normalizedWord = normalizeText(word)
    return normalizedText.includes(normalizedWord)
  })
}

export function validateCleanText(text: string, fieldLabel: string) {
  if (containsBlockedWords(text)) {
    throw new Error(`El campo "${fieldLabel}" incluye lenguaje no permitido.`)
  }
}
