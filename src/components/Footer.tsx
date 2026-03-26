import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2">
            <Image
              src="/promptbook-mark.svg"
              alt="Promptbook"
              width={36}
              height={36}
            />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-white">Promptbook</p>
            <p>Biblioteca abierta de prompts con Next.js + Supabase</p>
          </div>
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
          <Link href="/privacy" className="transition hover:text-white">
            Privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
