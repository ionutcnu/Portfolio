"use client"

import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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

export default function Testimonials() {
  return (
    <section className="px-4 py-8 md:px-0">
      <div className="mb-8">
        <h2 className="flex items-center gap-3 text-2xl font-semibold md:text-3xl">
          <Quote size={28} className="text-[#e5a54b]" />
          <span>What People Say</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border-gray-700/50 bg-gray-900/30 hover:border-[#e5a54b]/50 transition-all duration-300"
          >
            <CardContent className="p-6 space-y-4">
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-[#e5a54b]/30" />

              {/* Quote Text */}
              <p className="text-gray-300 text-sm leading-relaxed italic">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex items-center gap-3">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-[#e5a54b]/20 border-2 border-[#e5a54b]/50 flex items-center justify-center">
                    <span className="text-[#e5a54b] font-semibold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
