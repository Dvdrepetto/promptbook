insert into public.prompts (
  title,
  prompt,
  tool,
  category,
  subcategory,
  likes_count
)
select
  seed.title,
  seed.prompt,
  seed.tool,
  seed.category,
  seed.subcategory,
  seed.likes_count
from (
  values
    (
      'Asistente experto para ChatGPT',
      'Actua como un asistente experto en productividad digital. Antes de responder, resume en una frase lo que entendiste. Luego entrega una respuesta en 3 bloques: recomendacion principal, pasos concretos y posibles errores a evitar. Si falta contexto, hazme hasta 3 preguntas breves antes de continuar.',
      'chatgpt',
      'herramientas-ia',
      'chatgpt',
      12
    ),
    (
      'Claude para sintetizar documentos',
      'Quiero que leas el siguiente texto y lo transformes en un resumen ejecutivo claro para una persona que no tiene tiempo. Estructura la salida en: contexto, ideas principales, riesgos, decisiones sugeridas y preguntas abiertas. Mantene un tono profesional y directo.',
      'claude',
      'herramientas-ia',
      'claude',
      9
    ),
    (
      'Gemini para investigar un tema',
      'Ayudame a investigar el siguiente tema como si fueras un analista. Organiza la respuesta en: panorama general, conceptos clave, ejemplos actuales, oportunidades, riesgos y una lista final de fuentes o lineas de investigacion que deberia seguir.',
      'gemini',
      'herramientas-ia',
      'gemini',
      7
    ),
    (
      'Perplexity para investigar con fuentes',
      'Actua como un asistente de investigacion con foco en fuentes confiables. Quiero que respondas esta pregunta con una sintesis clara, cites los puntos mas importantes y me digas que aspectos deberia verificar o profundizar despues.',
      'perplexity',
      'herramientas-ia',
      'perplexity',
      8
    ),
    (
      'NotebookLM para resumir materiales',
      'Voy a trabajar con apuntes, PDFs y notas. Quiero que me ayudes a transformar ese material en una sintesis practica con: ideas clave, citas utiles, conexiones entre conceptos, preguntas de repaso y posibles huecos de comprension.',
      'notebooklm',
      'herramientas-ia',
      'notebooklm',
      6
    ),
    (
      'GitHub Copilot para implementar funciones',
      'Ayudame a implementar esta funcionalidad como si fueras un compañero senior. Primero propone la estructura general, luego escribe el codigo, explica decisiones importantes y sugiere pruebas minimas para validar que no se rompio nada.',
      'github_copilot',
      'herramientas-ia',
      'github-copilot',
      9
    ),
    (
      'DALL·E para visual publicitario',
      'Create a polished advertising visual for a modern product launch, clean composition, cinematic light, realistic textures, premium brand feeling, subtle depth, sharp focus, editorial quality.',
      'dalle',
      'herramientas-ia',
      'dalle',
      11
    ),
    (
      'Midjourney editorial futuristic',
      'Futuristic editorial portrait of a creative entrepreneur in a minimalist studio, dramatic rim light, soft haze, premium fashion styling, cinematic framing, hyper detailed skin, modern magazine cover aesthetic --ar 4:5 --stylize 250',
      'midjourney',
      'herramientas-ia',
      'midjourney',
      14
    ),
    (
      'Debugger para errores React',
      'Actua como un senior frontend engineer. Voy a darte un error de React y quiero que identifiques: causa mas probable, como reproducirlo, como aislarlo, solucion recomendada y una version corregida del codigo. Si notas riesgos de regresion, incluyelos al final.',
      'chatgpt',
      'programacion',
      'debugging',
      16
    ),
    (
      'Refactor limpio de componente',
      'Refactoriza el siguiente componente con foco en legibilidad, nombres claros y separacion de responsabilidades. Conserva el comportamiento actual. Devuelveme: problemas detectados, estrategia de refactor, codigo mejorado y breve explicacion de por que quedo mejor.',
      'claude',
      'programacion',
      'refactor',
      11
    ),
    (
      'Diseño de API REST',
      'Actua como arquitecto backend. Necesito diseñar una API REST para este caso de uso. Propon endpoints, payloads, validaciones, codigos de error, reglas de autenticacion y un ejemplo de flujo completo entre cliente y servidor.',
      'gemini',
      'programacion',
      'apis',
      10
    ),
    (
      'SQL para analitica de negocio',
      'Escribe una consulta SQL para resolver este problema. Primero explica la logica de la consulta en lenguaje simple. Luego entrega la query final, una variante optimizada y posibles indices que ayudarian si la tabla creciera mucho.',
      'chatgpt',
      'programacion',
      'sql',
      13
    ),
    (
      'Resumen para estudiar rapido',
      'Resume el siguiente material como si estuviera preparando un examen. Organiza la salida en conceptos clave, definiciones simples, ejemplos rapidos y 5 preguntas de repaso para autoevaluarme.',
      'chatgpt',
      'academico',
      'resumir',
      8
    ),
    (
      'Explicacion clara de concepto complejo',
      'Explicame este concepto como si fueras un profesor muy claro. Empieza con una definicion simple, luego usa una analogia cotidiana, despues un ejemplo concreto y termina con una mini comprobacion para saber si lo entendi.',
      'claude',
      'academico',
      'explicar-conceptos',
      15
    ),
    (
      'Generador de flashcards',
      'Convierte este contenido en flashcards efectivas. Cada tarjeta debe tener una pregunta clara al frente y una respuesta corta detras. Incluye primero las mas importantes y evita tarjetas ambiguas o demasiado largas.',
      'chatgpt',
      'academico',
      'flashcards',
      6
    ),
    (
      'Estructura de ensayo academico',
      'Ayudame a construir un ensayo sobre este tema. Quiero tesis principal, argumentos a favor, posibles contraargumentos, estructura de introduccion, desarrollo y conclusion, y sugerencias para sonar mas claro y academico.',
      'gemini',
      'academico',
      'ensayos',
      9
    ),
    (
      'Copy para anuncios de Meta',
      'Actua como copywriter de performance marketing. Crea 5 variantes de anuncios para Meta Ads sobre este producto. Incluye hook inicial, beneficio principal, objecion resuelta y llamada a la accion. Usa tonos diferentes para testear.',
      'chatgpt',
      'marketing',
      'ads',
      17
    ),
    (
      'Secuencia de email marketing',
      'Diseña una secuencia de 4 emails para nutrir leads frios. Para cada email incluye objetivo, asunto, preview text, cuerpo del mensaje y CTA. Mantene coherencia entre todos y aumenta la intencion de compra progresivamente.',
      'claude',
      'marketing',
      'email-marketing',
      10
    ),
    (
      'Ideas SEO con intencion de busqueda',
      'Quiero una estrategia SEO para este tema. Dame clusters de contenido, keywords por intencion de busqueda, ideas de articulos prioritarios, titulos tentativos y una recomendacion de enlazado interno.',
      'gemini',
      'marketing',
      'seo',
      8
    ),
    (
      'Calendario para social media',
      'Crea un calendario de contenidos para redes sociales de 2 semanas. Quiero pilares de contenido, ideas de posts, formato sugerido, hook para cada pieza y CTA. Ajustalo a una marca cercana pero profesional.',
      'chatgpt',
      'marketing',
      'social-media',
      12
    ),
    (
      'Pitch deck para startup',
      'Ayudame a estructurar un pitch deck para esta idea de negocio. Quiero slide por slide: problema, solucion, mercado, modelo de negocio, traccion, competencia, go to market y pedido final a inversores.',
      'claude',
      'negocios',
      'pitch-decks',
      11
    ),
    (
      'Analisis rapido de mercado',
      'Actua como analista de negocio. Evalua este mercado con foco en tamaño de oportunidad, competidores, segmentos, barreras de entrada, ventajas diferenciales y riesgos. Termina con una conclusion clara.',
      'gemini',
      'negocios',
      'analisis-de-mercado',
      9
    ),
    (
      'Guion comercial para ventas',
      'Crea un guion de ventas consultivas para una primera llamada con un prospecto. Debe incluir apertura, preguntas de descubrimiento, deteccion de dolor, presentacion de valor, manejo de objeciones y cierre suave.',
      'chatgpt',
      'negocios',
      'ventas',
      13
    ),
    (
      'Mejora de operaciones internas',
      'Analiza este proceso operativo y ayudame a optimizarlo. Identifica cuellos de botella, tareas repetitivas, riesgo de errores manuales y oportunidades de automatizacion. Devuelve una version mejorada paso a paso.',
      'claude',
      'negocios',
      'operaciones',
      7
    ),
    (
      'Plan semanal realista',
      'Quiero que conviertas esta lista de tareas en un plan semanal realista. Ordena por prioridad, energia requerida y dependencias. Devuelveme bloques de trabajo, descansos recomendados y tareas que deberia posponer.',
      'chatgpt',
      'productividad',
      'planificacion',
      14
    ),
    (
      'Sistema en Notion',
      'Ayudame a diseñar un sistema en Notion para gestionar proyectos personales y de trabajo. Quiero bases de datos recomendadas, propiedades, vistas utiles, relaciones entre tablas y una rutina semanal de mantenimiento.',
      'claude',
      'productividad',
      'notion',
      10
    ),
    (
      'Automatizacion de tareas repetidas',
      'Analiza estas tareas repetitivas y propon una automatizacion simple. Para cada una indica herramienta sugerida, flujo propuesto, pasos de implementacion y riesgo de errores o excepciones.',
      'gemini',
      'productividad',
      'automatizacion',
      8
    ),
    (
      'Priorizar lo importante',
      'Ayudame a priorizar esta lista de tareas como si fueras mi jefe de proyecto. Clasifica en urgente, importante, delegable y descartable. Explica por que y propon el siguiente paso recomendado.',
      'chatgpt',
      'productividad',
      'prioridades',
      12
    ),
    (
      'Idea y estructura de articulo blog',
      'Genera una idea de articulo de blog sobre este tema y desarrollala en una estructura completa. Quiero titulo, subtitulos, resumen por seccion, CTA final y posibles variantes para distintos niveles de audiencia.',
      'chatgpt',
      'creacion-de-contenido',
      'blog',
      9
    ),
    (
      'Guion YouTube con retencion',
      'Crea un guion para YouTube con enfoque en retencion. Incluye hook de apertura, promesa del video, estructura principal, cambios de ritmo, cierre y CTA. El tono debe ser claro, dinamico y natural.',
      'claude',
      'creacion-de-contenido',
      'youtube',
      13
    ),
    (
      'Newsletter semanal valiosa',
      'Escribe una newsletter semanal sobre este tema. Necesito asunto, apertura breve, 3 ideas principales con valor practico y cierre con CTA. Quiero que suene cercana, util y facil de leer.',
      'chatgpt',
      'creacion-de-contenido',
      'newsletter',
      11
    ),
    (
      'Guion corto para reels o shorts',
      'Crea un guion breve para video corto sobre este tema. Usa una apertura fuerte, desarrollo rapido, una idea central memorable y una llamada a la accion simple. Piensalo para reels, shorts o TikTok.',
      'gemini',
      'creacion-de-contenido',
      'guiones',
      8
    ),
    (
      'Concepto de branding visual',
      'Actua como director creativo. A partir de esta marca, genera un concepto visual con palabras clave, estilo general, paleta emocional, referencias visuales y posibles direcciones para piezas de branding.',
      'chatgpt',
      'diseno-e-imagen',
      'branding',
      10
    ),
    (
      'Direccion de fotografia premium',
      'Create a luxury editorial photograph of this scene with soft directional light, cinematic shadows, tactile textures, realistic color grading, balanced composition and premium magazine aesthetic.',
      'dalle',
      'diseno-e-imagen',
      'fotografia',
      15
    ),
    (
      'Ilustracion estilo libro contemporaneo',
      'Create a contemporary editorial illustration with clean shapes, textured shadows, subtle grain, expressive color palette and a sophisticated modern book-cover feeling.',
      'midjourney',
      'diseno-e-imagen',
      'ilustracion',
      9
    ),
    (
      'Visual de producto para ecommerce',
      'Create a high-end product render on a clean pedestal with soft gradient background, controlled reflections, premium lighting, realistic materials and commercial advertising quality.',
      'dalle',
      'diseno-e-imagen',
      'producto',
      16
    ),
    (
      'Planeamiento de clase',
      'Actua como docente y ayudame a planificar una clase sobre este tema. Quiero objetivo de aprendizaje, apertura, desarrollo, actividad principal, cierre y una forma simple de evaluar comprension.',
      'chatgpt',
      'educacion-y-docencia',
      'planeamiento',
      10
    ),
    (
      'Rubrica de evaluacion clara',
      'Diseña una rubrica de evaluacion para esta actividad. Incluye criterios, niveles de desempeno, descripciones observables y una version resumida para compartir con estudiantes.',
      'claude',
      'educacion-y-docencia',
      'rubricas',
      7
    ),
    (
      'Actividad participativa para el aula',
      'Quiero una actividad dinamica para enseñar este contenido. Propon una consigna clara, materiales, tiempo estimado, dinamica paso a paso y una variante para grupos grandes.',
      'chatgpt',
      'educacion-y-docencia',
      'actividades',
      11
    ),
    (
      'Correccion constructiva de trabajos',
      'Actua como docente empatico. Corrige este trabajo dando feedback claro, especifico y accionable. Separa en fortalezas, puntos a mejorar, errores frecuentes y siguiente paso recomendado para el alumno.',
      'gemini',
      'educacion-y-docencia',
      'correcciones',
      8
    ),
    (
      'Email profesional claro',
      'Redacta un email profesional a partir de estas notas. Quiero asunto, apertura, mensaje principal y cierre. Debe sonar claro, amable, seguro y respetuoso, sin rodeos innecesarios.',
      'chatgpt',
      'escritura-y-comunicacion',
      'emails',
      14
    ),
    (
      'Presentacion ejecutiva',
      'Ayudame a transformar esta idea en una presentacion ejecutiva. Organiza la narrativa slide por slide, define el mensaje principal de cada una y sugeri como contarlo de forma breve y convincente.',
      'claude',
      'escritura-y-comunicacion',
      'presentaciones',
      9
    ),
    (
      'Storytelling para marca personal',
      'Construye una narrativa de storytelling para este proyecto o marca personal. Quiero conflicto inicial, proceso, aprendizaje, transformacion y una forma memorable de cerrar la historia.',
      'chatgpt',
      'escritura-y-comunicacion',
      'storytelling',
      12
    ),
    (
      'Copywriting para landing page',
      'Escribe el copy de una landing page para este producto. Incluye hero, propuesta de valor, beneficios, prueba social sugerida, objeciones y CTA principal. El tono debe ser claro y orientado a conversion.',
      'gemini',
      'escritura-y-comunicacion',
      'copywriting',
      13
    )
) as seed(title, prompt, tool, category, subcategory, likes_count)
where not exists (
  select 1
  from public.prompts existing
  where existing.title = seed.title
);
