import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacidad | Promptbook',
  description: 'Como gestiona Promptbook la autenticacion y los datos basicos de usuario.',
}

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 py-10">
      <div className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/75">
          Privacidad
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Politica de privacidad breve y clara.
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-400">
          Promptbook utiliza Supabase para autenticacion y almacenamiento de
          datos basicos de cuenta. Si eliges iniciar sesion con GitHub, la
          autenticacion tambien pasa por ese proveedor.
        </p>
      </div>

      <div className="grid gap-4">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">
            Que no almacenamos
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            Promptbook no almacena contraseñas en texto plano. Las credenciales
            son gestionadas por Supabase Auth y, cuando corresponde, por Google
            o GitHub como proveedores de identidad.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">
            Que datos si usamos
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            Para que la app funcione, Promptbook puede almacenar y consultar tu
            identificador de usuario, email si el proveedor lo comparte,
            username, prompts publicados y likes asociados a tu cuenta.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">
            Para que se usan
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            Estos datos se usan unicamente para autenticar usuarios, permitir el
            acceso a la app y asociar acciones como publicar prompts o dar likes.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">
            Importante
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            Aunque la autenticacion se delega a Supabase y a proveedores OAuth,
            Promptbook sigue siendo responsable de la aplicacion y del uso de
            los datos minimos necesarios para su funcionamiento.
          </p>
        </article>
      </div>
    </section>
  )
}
