"use client"

import { useState, useEffect, useRef } from "react"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { navItems } from "@/lib/constants/navigation"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [displayedPath, setDisplayedPath] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const breadcrumbs = pathname.split('/').filter(Boolean).slice(0, 4)

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

        .cursor-blink {
          animation: blink 3s cubic-bezier(0.2, 1, 0.8, 1) infinite;
        }

        .cursor-typing {
          animation: typing-blink 0.5s ease-in-out infinite;
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
