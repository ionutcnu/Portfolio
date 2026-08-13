export interface SkillCategory {
  category: string
  skills: string
}

export const skills: SkillCategory[] = [
  { category: "Test Automation", skills: "Playwright, Selenium, Cypress, POM, Data-Driven Testing" },
  { category: "Programming", skills: "C#, TypeScript, OOP" },
  { category: "API Testing", skills: "REST APIs, Postman, Insomnia" },
  { category: "Data & Messaging", skills: "SQL, PostgreSQL, Cosmos DB, Apache Kafka" },
  { category: "CI/CD", skills: "GitHub Actions, TeamCity" },
  { category: "Version Control", skills: "Git, Bitbucket Cloud" },
  { category: "Cloud & Tooling", skills: "AWS, Azure, Kubernetes, Cloudflare, Kibana" },
  { category: "Methodologies & Concepts", skills: "Agile/Scrum, Waterfall, BDD, Shift-Left, E2E Testing, Integration Testing" },
  { category: "AI Engineering", skills: "Prompt/Context Engineering, Prompt Injection, LLM Testing, Agent Evaluation, MCP" }
]
