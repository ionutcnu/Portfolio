import { Code2 } from "lucide-react";
import Image from "next/image";

const icons: Record<string, [string, string]> = {
  typescript: ["TypeScript", "typescript"],
  javascript: ["JavaScript", "javascript"],
  css: ["CSS", "css3"],
  html: ["HTML", "html5"],
  react: ["React", "react"],
  nextjs: ["Next.js", "nextjs"],
  playwright: ["Playwright", "playwright"],
  "c#": ["C#", "csharp"],
  php: ["PHP", "php"],
  vue: ["Vue", "vuejs"],
  dockerfile: ["Docker", "docker"],
  tailwindcss: ["Tailwind CSS", "tailwindcss"],
  vite: ["Vite", "vitejs"],
};

export default function ProjectTechnologies({
  languages,
  topics,
}: {
  languages: string[];
  topics: string[];
}) {
  const values = [...languages, ...topics];
  const unique = [...new Set(values.map((value) => value.toLowerCase()))];
  const technologies = unique
    .filter(
      (value) =>
        Object.hasOwn(icons, value) ||
        languages.some((language) => language.toLowerCase() === value),
    )
    .slice(0, 7);
  return (
    <div className="flex min-h-8 flex-wrap items-center gap-2">
      {technologies.map((value) => {
        if (!Object.hasOwn(icons, value))
          return (
            <span
              key={value}
              className="inline-flex items-center gap-1.5 text-[10px] text-foreground/50"
            >
              <Code2 size={16} aria-hidden="true" />
              {languages.find((language) => language.toLowerCase() === value)}
            </span>
          );
        const [label, icon] = icons[value];
        return (
          <span
            key={value}
            className="inline-flex h-8 w-7 items-center justify-center"
            title={label}
          >
            <Image
              src={`/logos/${icon}.svg`}
              width={22}
              height={22}
              alt={label}
              className={`object-contain${icon === "nextjs" ? " rounded-full bg-white" : ""}`}
            />
          </span>
        );
      })}
      {!technologies.length && (
        <span className="inline-flex items-center gap-1.5 text-[10px] text-foreground/50">
          <Code2 size={20} aria-hidden="true" />
          Repository
        </span>
      )}
    </div>
  );
}
