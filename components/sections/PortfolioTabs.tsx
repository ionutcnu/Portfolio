"use client";

import { FolderOpen, LayoutGrid, Quote, UserRound } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import TestimonialsWidget from "@/components/bento/TestimonialsWidget";
import ContactDialog from "@/components/contact/ContactDialog";
import ProjectCard from "@/components/shared/ProjectCard";
import ProjectCardSkeleton from "@/components/shared/ProjectCardSkeleton";
import { skills } from "@/lib/data/skills";
import { selectPortfolioSection, usePortfolioSection } from "@/lib/hooks/usePortfolioSection";
import type { Repository } from "@/types/github";
import Experience from "./Experience";

const Extras = dynamic(() => import("./PortfolioExtras"), {
  loading: () => <p>Loading extras…</p>,
});
const tabs = ["Details", "Projects", "What People Say", "Extras"] as const;
const ids = ["about", "projects", "testimonials", "extras"] as const;
const tabIcons = [UserRound, FolderOpen, Quote, LayoutGrid];
type Tab = (typeof ids)[number];

export default function PortfolioTabs() {
  const active = usePortfolioSection();
  const [extrasVisited, setExtrasVisited] = useState(false);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const eyeId = useId();
  const avatar = useRef<HTMLSpanElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Accept old section bookmarks once, then keep the address at the homepage.
    const hash = window.location.hash.slice(1).split("-")[0];
    if (hash === "work") selectPortfolioSection("projects");
    else if (ids.includes(hash as Tab)) selectPortfolioSection(hash as Tab);
    if (window.location.hash)
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search,
      );
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetch("/api/github/repositories", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Repositories unavailable");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid repositories");
        setRepos(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pointer = { x: 0, y: 0 };
    const paint = () => {
      frame = 0;
      if (!avatar.current) return;
      const rect = avatar.current.getBoundingClientRect();
      const dx = pointer.x - (rect.left + rect.width * 0.53);
      const dy = pointer.y - (rect.top + rect.height * 0.4);
      const distance = Math.max(60, Math.hypot(dx, dy));
      avatar.current.style.setProperty(
        "--pupil-x",
        `${reduced.matches ? 0 : (dx / distance) * 26}px`,
      );
      avatar.current.style.setProperty(
        "--pupil-y",
        `${reduced.matches ? 0 : (dy / distance) * 18}px`,
      );
    };
    const track = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      avatar.current?.style.setProperty("--pupil-x", "0px");
      avatar.current?.style.setProperty("--pupil-y", "0px");
    };
    window.addEventListener("pointermove", track, { passive: true });
    window.addEventListener("blur", reset);
    reduced.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", track);
      window.removeEventListener("blur", reset);
      reduced.removeEventListener("change", reset);
    };
  }, []);

  const select = selectPortfolioSection;

  useEffect(() => {
    if (active === "extras") setExtrasVisited(true);
  }, [active]);

  const catchy = repos.find((repo) => repo.name.toLowerCase() === "catchy");
  const featuredProjects = catchy ? [catchy] : [];
  const remainingProjects = repos.filter((repo) => repo !== catchy);
  function projects(items: Repository[], compact = true) {
    if (loading)
      return (
        <div className="portfolio-projects">
          {[0, 1].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      );
    if (error)
      return (
        <div role="status" className="portfolio-empty">
          <p>Projects couldn’t load right now.</p>
          <button onClick={() => setAttempt((value) => value + 1)}>Try again</button>
          <a href="https://github.com/ionutcnu?tab=repositories">Browse on GitHub</a>
        </div>
      );
    if (!items.length)
      return (
        <p>
          No public projects are available right now.{" "}
          <a href="https://github.com/ionutcnu">Visit GitHub</a>
        </p>
      );
    return (
      <div className="portfolio-projects">
        {items.map((repo) => (
          <ProjectCard key={`${repo.owner}/${repo.name}`} {...repo} compact={compact} />
        ))}
      </div>
    );
  }

  return (
    <main className="portfolio-main">
      <header className="portfolio-intro">
        <div>
          <h1>
            Hey, I’m Ionut <span className="uv-loose-letter">C</span>ioncu.
          </h1>
          <p>
            <strong>QA Engineer at Endava.</strong> I <strong>test with context</strong> —
            understanding why we’re building something, not just checking if it works.
          </p>
          <div className="portfolio-actions">
            <ContactDialog className="portfolio-primary">Let’s connect</ContactDialog>
            <a href="/Ionut_Cioncu_QA_Engineer.pdf" target="_blank" rel="noopener noreferrer">
              View my CV
            </a>
            <a href="https://www.linkedin.com/in/cioncu/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <span
          ref={avatar}
          className="portfolio-avatar-wrap"
          tabIndex={0}
          aria-describedby="avatar-eagle-eyes"
        >
          <span className="portfolio-avatar-art">
            <Image
              src="/avatar.png"
              alt="Ionut Cioncu"
              width={140}
              height={140}
              priority
              className="portfolio-avatar"
            />
            <svg className="portfolio-avatar-pupils" viewBox="0 0 1024 1024" aria-hidden="true">
              {[
                { x: 439, y: 416 },
                { x: 639, y: 419 },
              ].map(({ x, y }, index) => (
                <g key={x}>
                  <defs>
                    <clipPath id={`${eyeId}-${index}`}>
                      <ellipse cx={x} cy={y} rx="49" ry="37" />
                    </clipPath>
                  </defs>
                  <ellipse cx={x} cy={y} rx="49" ry="37" fill="#efddc5" />
                  <g clipPath={`url(#${eyeId}-${index})`}>
                    <g className="portfolio-pupil-motion">
                      <ellipse cx={x} cy={y} rx="32" ry="35" fill="#65432d" />
                      <ellipse cx={x} cy={y - 5} rx="23" ry="27" fill="#21170f" />
                      <ellipse cx={x - 9} cy={y - 14} rx="7" ry="9" fill="#fff7ed" />
                    </g>
                  </g>
                  <path
                    d={`M${x - 49} ${y - 5} Q${x} ${y - 55} ${x + 49} ${y - 5}`}
                    fill="none"
                    stroke="#342217"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </g>
              ))}
            </svg>
          </span>
          <span id="avatar-eagle-eyes" role="tooltip" className="portfolio-avatar-tooltip">
            Eagle eyes
          </span>
        </span>
      </header>

      <div className="portfolio-tabs" role="tablist" aria-label="Portfolio sections">
        {tabs.map((label, i) => (
          <button
            key={ids[i]}
            ref={(element) => {
              buttons.current[i] = element;
            }}
            id={`tab-${ids[i]}`}
            role="tab"
            aria-controls={`panel-${ids[i]}`}
            aria-selected={active === ids[i]}
            tabIndex={active === ids[i] ? 0 : -1}
            onClick={() => select(ids[i])}
            onKeyDown={(event) => {
              let next = i;
              if (event.key === "ArrowRight") next = (i + 1) % ids.length;
              else if (event.key === "ArrowLeft") next = (i + ids.length - 1) % ids.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = ids.length - 1;
              else return;
              event.preventDefault();
              select(ids[next]);
              buttons.current[next]?.focus();
            }}
          >
            {(() => {
              const Icon = tabIcons[i];
              return <Icon size={16} aria-hidden="true" />;
            })()}
            <span>{label}</span>
            {ids[i] === "projects" && !loading && !error && (
              <span className="portfolio-tab-count" aria-hidden="true">
                {repos.length}
              </span>
            )}
          </button>
        ))}
      </div>
      <section
        className="portfolio-panel"
        id="panel-projects"
        role="tabpanel"
        aria-labelledby="tab-projects"
        tabIndex={0}
        hidden={active !== "projects"}
      >
        <h2>Projects</h2>
        <p className="portfolio-description">
          Personal projects, experiments and tools. Explore the code or try a live demo.
        </p>
        {!loading && !error && featuredProjects.length > 0 && (
          <>
            <h3 className="portfolio-more-projects">Featured project</h3>
            <div className="portfolio-featured-project">
              <div className="portfolio-featured-preview">
                <Image
                  src="/catchy-preview.png"
                  alt="Catchy extension settings and error toast preview"
                  width={1280}
                  height={800}
                  sizes="(max-width: 640px) 90vw, 240px"
                  className="portfolio-featured-image"
                />
              </div>
              <ProjectCard {...featuredProjects[0]} compact />
            </div>
            {remainingProjects.length > 0 && (
              <h3 className="portfolio-more-projects">More projects</h3>
            )}
          </>
        )}
        {(loading || error || remainingProjects.length > 0 || !featuredProjects.length) &&
          projects(remainingProjects)}
      </section>
      <section
        className="portfolio-panel"
        id="panel-about"
        role="tabpanel"
        aria-labelledby="tab-about"
        tabIndex={0}
        hidden={active !== "about"}
      >
        <h2>A bit of my story!</h2>
        <div className="portfolio-prose">
          <p>
            I’m a <strong>QA Engineer with 4+ years of experience</strong> across{" "}
            <strong>Maritime Logistics and Payments</strong>. I <strong>test with context</strong>:
            understanding the business flow, how systems interact, and why we’re building something,
            not just checking if it works.
          </p>
          <p>
            At Endava, I’ve worked with REST APIs, PostgreSQL, microservices and third-party
            integrations, becoming a{" "}
            <strong>QA Subject Matter Expert on the Maritime Logistics project</strong>. In
            Payments, I use Kafka, Cosmos DB, Azure tools, Kubernetes and PowerShell to validate
            transaction data and investigate issues across distributed services.
          </p>
          <p>
            I bridge <strong>testing and business analysis</strong>, exploring edge cases and
            questioning whether we’re building the right thing. My personal projects develop my{" "}
            <strong>automation skills</strong>, alongside experiments in{" "}
            <strong>AI-assisted engineering, LLM testing and MCP</strong>.
          </p>
        </div>
        <h3>My tech stack</h3>
        <dl className="portfolio-skills">
          {skills.map((skill) => (
            <div key={skill.category}>
              <dt>{skill.category}</dt>
              <dd>{skill.skills}</dd>
            </div>
          ))}
        </dl>
        <div className="portfolio-site-information">
          <h3>Experience</h3>
          <div className="portfolio-experience">
            <Experience />
          </div>
        </div>
      </section>
      <section
        className="portfolio-panel"
        id="panel-testimonials"
        role="tabpanel"
        aria-labelledby="tab-testimonials"
        tabIndex={0}
        hidden={active !== "testimonials"}
      >
        <TestimonialsWidget />
      </section>
      <section
        className="portfolio-panel"
        id="panel-extras"
        role="tabpanel"
        aria-labelledby="tab-extras"
        tabIndex={0}
        hidden={active !== "extras"}
      >
        {(active === "extras" || extrasVisited) && <Extras active={active === "extras"} />}
      </section>
    </main>
  );
}
