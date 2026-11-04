"use client";

import { Clock3, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { BentoBox } from "./BentoGrid";

type Stats = {
  status: "ready" | "unavailable" | "processing";
  profile?: string;
  range?: string;
  total?: number | null;
  average?: number | null;
  categories?: { name: string; percent: number }[];
  languages?: { name: string; percent: number }[];
  stale?: boolean;
};
const colors = ["#89b4fa", "#cba6f7", "#e5a54b", "#a6e3a1", "#94e2d5"];
function categoryColor(name: string, index: number) {
  return name === "AI Coding" ? "#cba6f7" : colors[index % colors.length];
}
function duration(seconds: number) {
  const minutes = Math.round(seconds / 60);
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export default function WakaTimeWidget() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setStats(null);
    fetch("/api/wakatime", { signal: controller.signal, cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unavailable");
        return response.json() as Promise<Stats>;
      })
      .then(setStats)
      .catch(() => {
        if (!controller.signal.aborted) setStats({ status: "unavailable" });
      });
    return () => controller.abort();
  }, [attempt]);
  return (
    <BentoBox className="waka-card">
      <div className="waka-heading">
        <h3>
          <Clock3 size={16} aria-hidden="true" />
          Coding activity
        </h3>
        <span className="waka-range">{stats?.range ?? "Public stats"}</span>
      </div>
      {!stats ? (
        <p className="waka-status" role="status">
          Loading coding activity...
        </p>
      ) : stats.status === "ready" ? (
        <>
          {stats.total != null && (
            <dl className="waka-totals">
              <div>
                <dt>Coding time</dt>
                <dd>{duration(stats.total ?? 0)}</dd>
              </div>
              <div>
                <dt>Daily average</dt>
                <dd>{stats.average == null ? "Unavailable" : duration(stats.average)}</dd>
              </div>
            </dl>
          )}
          <div className="waka-breakdowns">
            {!!stats.categories?.length && (
              <section className="waka-categories" aria-label="Activity breakdown">
                <h4>How I code</h4>
                <div className="waka-category-bar" aria-hidden="true">
                  {stats.categories.map((category, index) => (
                    <span
                      key={category.name}
                      style={{
                        width: `${category.percent}%`,
                        background: categoryColor(category.name, index),
                      }}
                    />
                  ))}
                </div>
                <ul>
                  {stats.categories.map((category, index) => (
                    <li key={category.name}>
                      <span>
                        <i
                          style={{ background: categoryColor(category.name, index) }}
                          aria-hidden="true"
                        />
                        {category.name === "Coding" ? "Manual coding" : category.name}
                      </span>
                      <strong>{category.percent.toFixed(1)}%</strong>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {stats.total === 0 ? (
              <p className="waka-status">No coding activity recorded in this period.</p>
            ) : (
              <div className="waka-languages">
                <h4>Top languages</h4>
                {stats.languages?.map((language, index) => (
                  <div key={language.name}>
                    <div className="waka-language-label">
                      <span>{language.name}</span>
                      <span>{language.percent.toFixed(1)}%</span>
                    </div>
                    <div className="waka-track" aria-hidden="true">
                      <span style={{ width: `${language.percent}%`, background: colors[index] }} />
                    </div>
                  </div>
                ))}
                {!stats.languages?.length && (
                  <p className="waka-status">Language breakdown is not publicly available.</p>
                )}
              </div>
            )}
          </div>
          {stats.stale && (
            <p className="waka-status">
              Showing the latest available stats while WakaTime refreshes.
            </p>
          )}
        </>
      ) : (
        <p className="waka-status" role="status">
          {stats.status === "processing"
            ? "WakaTime is preparing the latest stats."
            : "Coding activity is currently unavailable."}
        </p>
      )}
      <div className="waka-footer">
        {stats?.profile && (
          <a href={stats.profile} target="_blank" rel="noopener noreferrer">
            Tracked with WakaTime
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        )}
        {stats && ["unavailable", "processing"].includes(stats.status) && (
          <button type="button" onClick={() => setAttempt((value) => value + 1)}>
            Retry
          </button>
        )}
      </div>
    </BentoBox>
  );
}
