import AuthForm from './AuthForm'

export default function LoginPage() {
    return (
        <section className="relative isolate overflow-hidden">
            <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/12 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-24 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="mx-auto grid min-h-[72vh] max-w-6xl items-center gap-10 py-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-12">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                            Acceso a tu biblioteca
                        </p>
                        <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                            Guarda, publica y reutiliza prompts con una experiencia mas clara.
                        </h1>
                        <p className="max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
                            Promptbook te ayuda a reunir tus mejores prompts en un espacio
                            simple, visual y listo para seguir creciendo.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-3xl border border-white/10 bg-white/3 p-5">
                            <p className="text-2xl font-semibold text-white">01</p>
                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                Organiza prompts por uso real, no por caos.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/3 p-5">
                            <p className="text-2xl font-semibold text-white">02</p>
                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                Encuentra inspiración en prompts publicados por otros.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/3 p-5">
                            <p className="text-2xl font-semibold text-white">03</p>
                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                Construye una base lista para futuras colecciones y perfiles.
                            </p>
                        </div>
                    </div>
                </div>

                <AuthForm />
            </div>
        </section>
    )
}
