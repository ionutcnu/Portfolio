"use client"

import { useState } from "react"
import { Quote } from "lucide-react"
import { BentoBox } from "./BentoGrid"
import { testimonials } from "@/lib/testimonials-data"

export default function TestimonialsWidget() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleExpand(index)
    }
  }

  return (
    <BentoBox span={2}>
      <div className="mb-3 flex items-center gap-2 text-sm">
        <h3 className="flex items-center gap-2 font-semibold">
          <Quote size={16} className="text-accent-dynamic" />
          <span>What People Say</span>
        </h3>
      </div>

      <div className="space-y-3">
        {testimonials.map((testimonial, index) => {
          const isExpanded = expandedIndex === index

          return (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => toggleExpand(index)}
              onKeyDown={(e) => handleKeyPress(e, index)}
              className="cursor-pointer rounded-lg border border-gray-700/30 bg-gray-800/20 p-3 transition-all hover:border-accent-dynamic/50 hover:bg-gray-800/30"
            >
              {/* Quote */}
              <p className={`text-sm text-gray-200 italic leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author - always visible */}
              <div className="mt-2 flex items-center gap-2 border-t border-gray-700/30 pt-2">
                {/* Avatar */}
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent-dynamic/50 bg-accent-dynamic/20">
                  <span className="text-accent-dynamic text-xs font-semibold">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>

                {/* Name & Role */}
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-semibold">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>

                {/* Expand indicator */}
                <div className="text-muted-foreground flex-shrink-0 text-xs">
                  {isExpanded ? '▲' : '▼'}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </BentoBox>
  )
}
