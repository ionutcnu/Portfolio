"use client"

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Calendar, ExternalLink, X } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  url: string;
  logoUrl: string;
  logoAlt: string;
  startDate: string;
  endDate?: string;
  details?: string;
}

const experienceData: ExperienceItem[] = [
  {
    company: "Current Company",
    role: "QA Engineer",
    url: "#",
    logoUrl: "https://via.placeholder.com/100x40/6c7086/ffffff?text=QA",
    logoAlt: "Company Logo",
    startDate: "2022-01-01",
    details:
      "Quality Assurance Engineer focused on testing, but naturally gravitating toward product thinking. Known for asking 'why' before 'how' and considering the broader business context.",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function isPast(item: ExperienceItem): boolean {
  return !!item.endDate;
}

export default function Experience() {
  return (
    <section className="px-4 md:px-0">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:justify-start">
        {experienceData.map((item, i) => {
          const past = isPast(item);

          return (
            <div key={item.company} className="flex items-center gap-6">
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button
                    className={`group flex cursor-pointer items-center gap-2 rounded text-sm transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dynamic focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      past
                        ? "opacity-60 hover:opacity-80 focus-visible:opacity-100"
                        : "hover:opacity-80 focus-visible:opacity-100"
                    }`}
                    aria-label={`View details for ${item.role} at ${item.company}`}
                  >
                    <img
                      src={item.logoUrl}
                      alt={item.logoAlt}
                      className="max-h-8 min-h-7 w-auto min-w-6 object-contain"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground">
                      <span className="whitespace-nowrap">
                        <span className={past ? "" : "font-medium text-foreground"}>
                          {item.company}
                        </span>
                        {past && (
                          <span className="text-muted-foreground/50 text-xs"> (Past)</span>
                        )}
                      </span>
                    </span>
                  </button>
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content
                    className="z-30 max-w-xs animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                    sideOffset={8}
                    side="top"
                    align="center"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.logoUrl}
                          alt={item.logoAlt}
                          className="h-10 w-auto max-w-[4rem] flex-shrink-0 rounded-md object-contain p-1"
                        />
                        <div>
                          <h4 className="font-semibold text-foreground transition-colors group-hover:text-accent-dynamic">
                            {item.company}
                          </h4>
                          <p className="text-sm text-muted-foreground">{item.role}</p>
                        </div>
                      </div>
                      <Popover.Close
                        className="-m-1 cursor-pointer rounded p-1 text-muted-foreground transition-colors hover:text-accent-dynamic"
                        aria-label="Close details"
                      >
                        <X size={18} />
                      </Popover.Close>
                    </div>

                    {item.details && (
                      <p className="mb-3 text-sm text-muted-foreground">{item.details}</p>
                    )}

                    <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground/70">
                      <Calendar size={14} className="flex-shrink-0" />
                      <span>{formatDate(item.startDate)}</span>
                      <span>-</span>
                      {item.endDate ? (
                        <span>{formatDate(item.endDate)}</span>
                      ) : (
                        <span>Present</span>
                      )}
                    </div>

                    {item.url !== "#" && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-accent-dynamic transition-colors hover:text-accent-dynamic/80"
                      >
                        <span>Visit Website</span>
                        <ExternalLink size={16} />
                      </a>
                    )}

                    <Popover.Arrow className="fill-border" width={12} height={6} />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>

              {i < experienceData.length - 1 && (
                <span className="hidden text-accent-dynamic md:inline">/</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
