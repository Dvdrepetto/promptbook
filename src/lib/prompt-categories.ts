export const PROMPT_CATEGORIES = [
  {
    name: 'Herramientas IA',
    slug: 'herramientas-ia',
    description:
      'Prompts para sacar mejor resultado de asistentes, modelos y generadores.',
    subcategories: [
      { name: 'ChatGPT', slug: 'chatgpt' },
      { name: 'Claude', slug: 'claude' },
      { name: 'Gemini', slug: 'gemini' },
      { name: 'Midjourney', slug: 'midjourney' },
    ],
  },
  {
    name: 'Programacion',
    slug: 'programacion',
    description:
      'Ayuda para escribir, refactorizar, depurar y documentar codigo.',
    subcategories: [
      { name: 'Debugging', slug: 'debugging' },
      { name: 'Refactor', slug: 'refactor' },
      { name: 'APIs', slug: 'apis' },
      { name: 'SQL', slug: 'sql' },
    ],
  },
  {
    name: 'Academico',
    slug: 'academico',
    description:
      'Prompts para estudiar, resumir, practicar y preparar examenes.',
    subcategories: [
      { name: 'Resumir', slug: 'resumir' },
      { name: 'Explicar conceptos', slug: 'explicar-conceptos' },
      { name: 'Flashcards', slug: 'flashcards' },
      { name: 'Ensayos', slug: 'ensayos' },
    ],
  },
  {
    name: 'Marketing',
    slug: 'marketing',
    description:
      'Ideas para campañas, anuncios, copies y estrategia de contenido.',
    subcategories: [
      { name: 'Ads', slug: 'ads' },
      { name: 'Email marketing', slug: 'email-marketing' },
      { name: 'SEO', slug: 'seo' },
      { name: 'Social media', slug: 'social-media' },
    ],
  },
  {
    name: 'Negocios',
    slug: 'negocios',
    description:
      'Prompts para analisis, decisiones, propuestas y organizacion comercial.',
    subcategories: [
      { name: 'Pitch decks', slug: 'pitch-decks' },
      { name: 'Analisis de mercado', slug: 'analisis-de-mercado' },
      { name: 'Ventas', slug: 'ventas' },
      { name: 'Operaciones', slug: 'operaciones' },
    ],
  },
  {
    name: 'Productividad',
    slug: 'productividad',
    description:
      'Flujos para planificar mejor, organizar tareas y ahorrar tiempo.',
    subcategories: [
      { name: 'Planificacion', slug: 'planificacion' },
      { name: 'Notion', slug: 'notion' },
      { name: 'Automatizacion', slug: 'automatizacion' },
      { name: 'Prioridades', slug: 'prioridades' },
    ],
  },
  {
    name: 'Creacion de contenido',
    slug: 'creacion-de-contenido',
    description:
      'Prompts para escribir, estructurar y mejorar contenido digital.',
    subcategories: [
      { name: 'Blog', slug: 'blog' },
      { name: 'YouTube', slug: 'youtube' },
      { name: 'Newsletter', slug: 'newsletter' },
      { name: 'Guiones', slug: 'guiones' },
    ],
  },
  {
    name: 'Diseno e imagen',
    slug: 'diseno-e-imagen',
    description:
      'Prompts visuales para concepto, estilo, composicion y direccion creativa.',
    subcategories: [
      { name: 'Branding', slug: 'branding' },
      { name: 'Fotografia', slug: 'fotografia' },
      { name: 'Ilustracion', slug: 'ilustracion' },
      { name: 'Producto', slug: 'producto' },
    ],
  },
  {
    name: 'Educacion y docencia',
    slug: 'educacion-y-docencia',
    description:
      'Material para clases, actividades, evaluaciones y aprendizaje guiado.',
    subcategories: [
      { name: 'Planeamiento', slug: 'planeamiento' },
      { name: 'Rubricas', slug: 'rubricas' },
      { name: 'Actividades', slug: 'actividades' },
      { name: 'Correcciones', slug: 'correcciones' },
    ],
  },
  {
    name: 'Escritura y comunicacion',
    slug: 'escritura-y-comunicacion',
    description:
      'Prompts para redactar mejor, adaptar tono y comunicar con claridad.',
    subcategories: [
      { name: 'Emails', slug: 'emails' },
      { name: 'Presentaciones', slug: 'presentaciones' },
      { name: 'Storytelling', slug: 'storytelling' },
      { name: 'Copywriting', slug: 'copywriting' },
    ],
  },
] as const

export function getCategoryBySlug(slug: string) {
  return PROMPT_CATEGORIES.find((category) => category.slug === slug)
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string) {
  return getCategoryBySlug(categorySlug)?.subcategories.find(
    (subcategory) => subcategory.slug === subcategorySlug
  )
}

export function isValidCategory(categorySlug: string) {
  return Boolean(getCategoryBySlug(categorySlug))
}

export function isValidSubcategory(categorySlug: string, subcategorySlug: string) {
  return Boolean(getSubcategoryBySlug(categorySlug, subcategorySlug))
}
