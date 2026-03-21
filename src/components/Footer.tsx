import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-neutral-800">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <p className="text-white font-semibold">David Repetto</p>
                    <p>Promptbook · Product built with Next.js + Supabase</p>
                </div>

                <div className="flex flex-wrap items-center gap-5">
                    <Link
                        href="https://www.linkedin.com/in/davidrepetto1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-white"
                    >
                        LinkedIn
                    </Link>
                    <Link
                        href="https://github.com/Dvdrepetto"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-white"
                    >
                        GitHub
                    </Link>
                    <Link
                        href="https://david-repetto-portfolio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-white"
                    >
                        Portfolio
                    </Link>
                </div>
            </div>
        </footer>
    )
}