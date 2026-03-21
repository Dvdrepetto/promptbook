import Link from 'next/link'

export default function Navbar() {
    return (
        <header className="border-b border-neutral-800 bg-black/80 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-lg font-bold tracking-tight text-white">
                    Promptbook
                </Link>

                <div className="flex items-center gap-6 text-sm text-gray-300">
                    <Link href="/explore" className="transition hover:text-white">
                        Explore
                    </Link>
                    <Link href="/create" className="transition hover:text-white">
                        Create
                    </Link>
                </div>
            </nav>
        </header>
    )
}