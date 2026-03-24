export const PROMPT_CATEGORIES = [
  {
    name: 'Herramientas IA',
    slug: 'herramientas-ia',
    description:
      'Prompts pensados para asistentes, buscadores, notebooks y generadores concretos.',
    subcategories: [
      { name: 'ChatGPT', slug: 'chatgpt' },
      { name: 'Claude', slug: 'claude' },
      { name: 'Gemini', slug: 'gemini' },
      { name: 'Perplexity', slug: 'perplexity' },
      { name: 'NotebookLM', slug: 'notebooklm' },
      { name: 'GitHub Copilot', slug: 'github-copilot' },
      { name: 'DALL·E', slug: 'dalle' },
      { name: 'Midjourney', slug: 'midjourney' },
    ],
  },
  {
    name: 'Programacion y desarrollo',
    slug: 'programacion',
    description:
      'Prompts para escribir, refactorizar, depurar, documentar y diseñar software.',
    subcategories: [
      { name: 'Debugging', slug: 'debugging' },
      { name: 'Refactor', slug: 'refactor' },
      { name: 'APIs', slug: 'apis' },
      { name: 'SQL', slug: 'sql' },
    ],
  },
  {
    name: 'Estudio y aprendizaje',
    slug: 'academico',
    description:
      'Prompts para estudiar, resumir, practicar, investigar y preparar examenes.',
    subcategories: [
      { name: 'Resumir', slug: 'resumir' },
      { name: 'Explicar conceptos', slug: 'explicar-conceptos' },
      { name: 'Flashcards', slug: 'flashcards' },
      { name: 'Ensayos', slug: 'ensayos' },
    ],
  },
  {
    name: 'Marketing y crecimiento',
    slug: 'marketing',
    description:
      'Prompts para campañas, anuncios, contenido y adquisicion de audiencia.',
    subcategories: [
      { name: 'Ads', slug: 'ads' },
      { name: 'Email marketing', slug: 'email-marketing' },
      { name: 'SEO', slug: 'seo' },
      { name: 'Social media', slug: 'social-media' },
    ],
  },
  {
    name: 'Negocio y estrategia',
    slug: 'negocios',
    description:
      'Prompts para analisis, decisiones, propuestas, ventas y operaciones.',
    subcategories: [
      { name: 'Pitch decks', slug: 'pitch-decks' },
      { name: 'Analisis de mercado', slug: 'analisis-de-mercado' },
      { name: 'Ventas', slug: 'ventas' },
      { name: 'Operaciones', slug: 'operaciones' },
    ],
  },
  {
    name: 'Productividad y sistemas',
    slug: 'productividad',
    description:
      'Prompts para planificar, organizar tareas, documentar procesos y ahorrar tiempo.',
    subcategories: [
      { name: 'Planificacion', slug: 'planificacion' },
      { name: 'Notion', slug: 'notion' },
      { name: 'Automatizacion', slug: 'automatizacion' },
      { name: 'Prioridades', slug: 'prioridades' },
    ],
  },
  {
    name: 'Contenido y medios',
    slug: 'creacion-de-contenido',
    description:
      'Prompts para escribir, estructurar y mejorar contenido en distintos formatos.',
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
      'Prompts para clases, actividades, evaluaciones y aprendizaje guiado.',
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
