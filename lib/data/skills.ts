export interface SkillCategory {
  category: string
  skills: string
}

export const skills: SkillCategory[] = [
  { category: "API Testing", skills: "Postman, REST APIs" },
  { category: "Databases", skills: "PostgreSQL, SQL scripting" },
  { category: "Cloud & DevOps", skills: "AWS S3, Azure, Kubernetes, Kibana" },
  { category: "Messaging", skills: "Apache Kafka" },
  { category: "Automation", skills: "Cypress, Selenium" },
  { category: "Other", skills: "JSON, Microservices, Git" }
]
