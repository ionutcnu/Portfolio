export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote: "He is one of the best QA resources I have worked with. His attention to detail in preparing test scenarios and executing them with full focus is truly commendable. He not only validates the expected outcomes but also checks various permutations and combinations to ensure that the feature or enhancement works as intended. One important strength I noticed is that he takes time to understand the underlying business requirements and use cases, rather than just following pre-defined test cases.",
    author: "Harish",
    role: "Product Owner",
    company: "Maritime Logistics Project"
  },
  {
    quote: "Ionut is without a doubt, the most effective tester I've worked with from the Endava side. While many carry the title of QA, Ionut truly embodies the Engineer in QA Engineer. His attention to detail is outstanding - he consistently goes a step further, digging into database entries, API calls, and Kibana logs to pinpoint the exact root cause. This level of depth significantly cuts down investigation time for developers. At this point, Ionut has become the go-to person for anything LPA-related.",
    author: "Madalin",
    role: "Principal Software Engineer",
    company: "Maritime Logistics Project"
  }
]
