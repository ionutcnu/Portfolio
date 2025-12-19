"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { title: "About", href: "/about" },
    { title: "Posts", href: "/blog" },
    { title: "Projects", href: "/projects" },
    { title: "Resume", href: "/contact" },
  ]

  const breadcrumbs = pathname.split('/').filter(Boolean).slice(0, 4)

  return (
    <div className="header sticky top-0 z-10 flex h-24 items-center justify-between p-5 pb-10 select-none">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs">
        <ul className="text-md flex items-center">
          <li className="inline-flex items-center">
            <Link href="/" className="animation-wiggle text-[#e5a54b] hover:text-[#e5a54b]/40">
              ~/
            </Link>
          </li>
          {breadcrumbs.map((text, i) => (
            <li key={`bread-${i}`} className="inline-flex items-center">
              <span className="mx-0.5">/</span>
              {i === breadcrumbs.length - 1 ? (
                <span aria-current="page">{text}</span>
              ) : (
                <Link
                  href={'/' + breadcrumbs.slice(0, i + 1).join('/')}
                  className="animation-wiggle hover:text-[#e5a54b]"
                >
                  {text}
                </Link>
              )}
            </li>
          ))}
          <li className="mx-0.5 inline-flex items-center" aria-hidden="true">/</li>
          <li className="ml-1 inline-flex items-center">
            <span className="cursor-blink bg-[#e5a54b] h-4 w-2" aria-hidden="true"></span>
          </li>
        </ul>
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground hover:text-[#e5a54b] rounded p-2 md:hidden"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <Menu size={24} />
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden items-center space-x-4 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="text-foreground hover:text-[#e5a54b] rounded px-3 py-2 text-sm font-medium transition-colors duration-150"
          >
            {item.title}
          </Link>
        ))}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground hover:text-[#e5a54b] cursor-pointer rounded px-3 py-2 text-sm font-medium"
          aria-label="Open more navigation items"
        >
          More...
        </button>
      </nav>

      <style jsx>{`
        .header {
          mask: linear-gradient(black, black, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          20% {
            opacity: 0;
          }
        }

        .cursor-blink {
          animation: blink 3s cubic-bezier(0.2, 1, 0.8, 1) infinite;
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        .animation-wiggle:hover {
          animation: wiggle 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Navigation
