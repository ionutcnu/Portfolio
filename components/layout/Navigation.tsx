"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Menu, X, ExternalLink } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { navItems } from "@/lib/constants/navigation"

const Navigation = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [displayedPath, setDisplayedPath] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const breadcrumbs = pathname.split('/').filter(Boolean).slice(0, 4)

  // Mount detection for portal
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Typing animation effect
  useEffect(() => {
    // Compute breadcrumbs inside effect to avoid dependency issues
    const currentBreadcrumbs = pathname.split('/').filter(Boolean).slice(0, 4);

    // Build the path text for typing animation (without ~/)
    const pathAfterHome = currentBreadcrumbs.length > 0
      ? `${currentBreadcrumbs.join(' / ')}/`
      : ''

    setIsTyping(true)
    setDisplayedPath("")

    let currentIndex = 0
    let timeoutId: NodeJS.Timeout | null = null
    const typingSpeed = 50 // ms per character

    const typeNextChar = () => {
      if (currentIndex < pathAfterHome.length) {
        setDisplayedPath(pathAfterHome.slice(0, currentIndex + 1))
        currentIndex++
        timeoutId = setTimeout(typeNextChar, typingSpeed)
      } else {
        setIsTyping(false)
      }
    }

    typeNextChar()

    // Cleanup timeout on unmount or pathname change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [pathname])

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEsc)
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Handle path click - enable editing
  const handlePathClick = () => {
    setIsEditing(true)
    setEditValue(breadcrumbs.join('/'))
  }

  // Handle Enter key - navigate to typed path
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const path = editValue.startsWith('/') ? editValue : `/${editValue}`
      router.push(path)
      setIsEditing(false)
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValue('')
    }
  }

  return (
    <div className="header sticky top-0 z-10 flex h-24 items-center justify-between p-5 pb-10 select-none">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs">
        <div className="text-md flex items-center">
          <Link href="/" className="text-[#e5a54b] hover:text-[#e5a54b]/60 transition-colors">
            ~/
          </Link>
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => setIsEditing(false)}
              className="bg-transparent border-none outline-none text-[#e5a54b] font-mono text-md"
              style={{ width: `${Math.max(editValue.length * 10 + 20, 100)}px` }}
            />
          ) : (
            <button
              className="text-[#e5a54b] cursor-text bg-transparent border-none p-0 font-mono text-md"
              onClick={handlePathClick}
              type="button"
              title="Click to edit path"
            >
              {displayedPath}
            </button>
          )}
          {!isEditing && (
            <span className={`bg-[#e5a54b] h-4 w-2 ml-1 ${isTyping ? 'cursor-typing' : 'cursor-blink'}`} aria-hidden="true"></span>
          )}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden items-center space-x-4 md:flex">
        {navItems.map((item) => (
          item.external ? (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-[#e5a54b] rounded px-3 py-2 text-sm font-medium transition-colors duration-150"
            >
              {item.title}
            </a>
          ) : (
            <Link
              key={item.title}
              href={item.href}
              className="text-foreground hover:text-[#e5a54b] rounded px-3 py-2 text-sm font-medium transition-colors duration-150"
            >
              {item.title}
            </Link>
          )
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden text-foreground hover:text-[#e5a54b] transition-colors p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Panel - Rendered via Portal */}
      {isMounted && isMobileMenuOpen && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md md:hidden mobile-backdrop"
            style={{ zIndex: 9998 }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            className="fixed top-0 right-0 h-screen w-72 bg-gradient-to-b from-background via-background to-background/95 border-l border-[#e5a54b]/30 shadow-2xl md:hidden mobile-menu-slide"
            style={{ zIndex: 9999 }}
          >
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[#e5a54b]/10 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X size={24} className="text-[#e5a54b]" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col px-6 space-y-2 mt-8">
              {navItems.map((item, index) => (
                <div key={item.title}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between px-5 py-4 text-lg font-medium text-foreground/80 hover:text-[#e5a54b] rounded-xl hover:bg-[#e5a54b]/10 transition-all duration-200 border border-transparent hover:border-[#e5a54b]/20"
                    >
                      <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                        {item.title}
                      </span>
                      <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`group flex items-center justify-between px-5 py-4 text-lg font-medium rounded-xl transition-all duration-200 border ${
                        pathname === item.href
                          ? 'text-[#e5a54b] bg-[#e5a54b]/10 border-[#e5a54b]/30'
                          : 'text-foreground/80 hover:text-[#e5a54b] hover:bg-[#e5a54b]/10 border-transparent hover:border-[#e5a54b]/20'
                      }`}
                    >
                      <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                        {item.title}
                      </span>
                      {pathname === item.href && (
                        <span className="w-2 h-2 bg-[#e5a54b] rounded-full animate-pulse" />
                      )}
                    </Link>
                  )}
                  {index < navItems.length - 1 && (
                    <div className="my-2 mx-5 border-t border-[#e5a54b]/10" />
                  )}
                </div>
              ))}
            </nav>

            {/* Footer Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e5a54b]/50 to-transparent" />
          </div>
        </>,
        document.body
      )}

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

        @keyframes typing-blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .cursor-blink {
          animation: blink 3s cubic-bezier(0.2, 1, 0.8, 1) infinite;
        }

        .cursor-typing {
          animation: typing-blink 0.5s ease-in-out infinite;
        }

        .mobile-menu-slide {
          animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-backdrop {
          animation: fade-in 0.25s ease-out;
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
