"use client"

import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { usePathname } from "next/navigation"

export default function NotFound() {
  const pathname = usePathname()

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {/* Terminal-style error */}
        <div className="rounded-xl border border-gray-700/50 bg-gray-900/80 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-6 font-mono">
            <div className="mb-2 text-sm text-gray-500">
              ionut@portfolio:~$ cd {pathname || '/page-not-found'}
            </div>
            <div className="text-sm text-red-400">
              bash: cd: {pathname || '/page-not-found'}: No such file or directory
            </div>
          </div>

          <h1 className="mb-4 text-6xl font-bold text-[#e5a54b] md:text-8xl">
            404
          </h1>

          <h2 className="mb-2 text-2xl font-semibold text-white md:text-3xl">
            Page Not Found
          </h2>

          <p className="mb-8 text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#e5a54b] px-6 py-3 font-medium text-gray-900 transition-all hover:bg-[#e5a54b]/80 hover:scale-105"
            >
              <Home size={20} />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/50 px-6 py-3 font-medium text-white transition-all hover:bg-gray-800 hover:scale-105"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div className="text-sm text-gray-500">
          <p className="mb-2">Try one of these instead:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/about" className="hover:text-[#e5a54b] transition-colors">
              About
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="/projects" className="hover:text-[#e5a54b] transition-colors">
              Projects
            </Link>
            <span className="text-gray-700">•</span>
            <a
              href="/CV-Cioncu-Ionut.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e5a54b] transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
