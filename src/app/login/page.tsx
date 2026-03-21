import AuthForm from './AuthForm'

export default function LoginPage() {
    return (
        <section className="mx-auto max-w-md space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Iniciar sesión</h1>
                <p className="mt-2 text-sm text-gray-400">
                    Accede a tu cuenta o crea una nueva.
                </p>
            </div>

            <AuthForm />
        </section>
    )
}