"use client"

import { useState } from "react"
import { Quote } from "lucide-react"
import { BentoBox } from "./BentoGrid"

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    quote: "He is one of the best QA resources I have worked with. His attention to detail in preparing test scenarios and executing them with full focus is truly commendable. He not only validates the expected outcomes but also checks various permutations and combinations to ensure that the feature or enhancement works as intended. One important strength I noticed is that he takes time to understand the underlying business requirements and use cases, rather than just following pre-defined test cases.",
    author: "Harish",
    role: "Product Owner",
    company: "Naval Shipping Project"
  },
  {
    quote: "Ionut is without a doubt, the most effective tester I've worked with from the Endava side. While many carry the title of QA, Ionut truly embodies the Engineer in QA Engineer. His attention to detail is outstanding - he consistently goes a step further, digging into database entries, API calls, and Kibana logs to pinpoint the exact root cause. This level of depth significantly cuts down investigation time for developers. At this point, Ionut has become the go-to person for anything LPA-related.",
    author: "Madalin",
    role: "Principal Software Engineer",
    company: "Naval Shipping Project"
  }
]

export default function TestimonialsWidget() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
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
              onClick={() => toggleExpand(index)}
              className="cursor-pointer rounded-lg border border-gray-700/30 bg-gray-800/20 p-3 transition-all hover:border-accent-dynamic/50 hover:bg-gray-800/30"
            >
              {/* Quote */}
              <p className={`text-sm text-gray-200 italic leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                "{testimonial.quote}"
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
