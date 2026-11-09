"use client";

import { Bug, Code2, Flashlight, MousePointer2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Detail = {
  x: number;
  y: number;
  kind: string;
  text: string;
  id: string;
  size?: number;
  width?: number;
  height?: number;
  species?: number;
};
const ANCHORS = [
  { selector: ".portfolio-intro h1", kind: "note", text: "Checked twice." },
  { selector: ".portfolio-actions", kind: "bug", text: "Works on my machine." },
  { selector: ".portfolio-tabs", kind: "circuit", text: "Mind the edge cases." },
  { selector: ".portfolio-panel:not([hidden])", kind: "crack", text: "" },
  {
    selector: ".portfolio-panel:not([hidden]) .portfolio-prose p",
    kind: "note",
    text: "One more edge case...",
  },
  {
    selector: ".portfolio-panel:not([hidden]) .portfolio-skills > div",
    kind: "code",
    text: "expect(curiosity).toBe(true)",
  },
  {
    selector: ".portfolio-panel:not([hidden]) .portfolio-project-card",
    kind: "bug",
    text: "One more test...",
  },
  {
    selector: ".portfolio-panel:not([hidden]) .portfolio-extras-grid > div",
    kind: "circuit",
    text: "A little chaos underneath.",
  },
  {
    selector: ".portfolio-panel:not([hidden]) .portfolio-experience",
    kind: "note",
    text: "Test. Learn. Repeat.",
  },
  {
    selector: "#panel-testimonials:not([hidden]) button",
    kind: "spark",
    text: "Good people. Good work.",
  },
];
const SKILL_SECRETS = [
  "expect(curiosity).toBe(true)",
  "A semicolon walks into a bug.",
  "200 OK. But is it really?",
  "Every record has a story.",
  "Green builds. Happy mornings.",
  "Commit now. Thank yourself later.",
  "Even clouds need a checkup.",
  "Find the edge. Test beyond it.",
  "Trust the AI? Verify first.",
];
export default function HiddenDetails() {
  const [mounted, setMounted] = useState(false);
  const [details, setDetails] = useState<Detail[]>([]);
  const [gimmicks, setGimmicks] = useState<Detail[]>([]);
  const stage = useRef<HTMLDivElement>(null);
  const bugsLayer = useRef<HTMLDivElement>(null);
  const notesLayer = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 250, y: 160 });
  const move = useRef<(x: number, y: number) => void>(() => undefined);
  const offset = useRef({ x: 65, y: 65 });
  const dragOffset = useRef({ x: 65, y: 65 });

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    let frame = 0;
    let measureFrame = 0;
    let measuredScroll = { x: window.scrollX, y: window.scrollY };
    const paint = () => {
      frame = 0;
      if (!stage.current) return;
      const rebuilding = !!document.querySelector("swarm-rebuild");
      stage.current.style.visibility = rebuilding ? "hidden" : "visible";
      if (bugsLayer.current) bugsLayer.current.style.visibility = rebuilding ? "hidden" : "visible";
      if (notesLayer.current)
        notesLayer.current.style.transform = `translate3d(${measuredScroll.x - window.scrollX}px, ${measuredScroll.y - window.scrollY}px, 0)`;
      if (rebuilding) return;
      const { x, y } = position.current;
      bugsLayer.current?.querySelectorAll<HTMLElement>(".uv-shy-bug").forEach((bug) => {
        const dx = Number(bug.dataset.x) - window.scrollX - x,
          dy = Number(bug.dataset.y) - window.scrollY - y;
        const distance = Math.hypot(dx, dy);
        if (distance < 55 && !bug.classList.contains("is-shy")) {
          bug.style.setProperty("--flee-x", `${((dx || 1) / Math.max(1, distance)) * 48}px`);
          bug.style.setProperty("--flee-y", `${(dy / Math.max(1, distance)) * 36}px`);
          bug.style.setProperty("--flee-angle", `${(Math.atan2(dy, dx) * 180) / Math.PI + 90}deg`);
          bug.classList.add("is-shy");
        } else if (distance > 100) bug.classList.remove("is-shy");
      });
      stage.current.style.setProperty("--lens-x", `${x}px`);
      stage.current.style.setProperty("--lens-y", `${y}px`);
      offset.current = { x: x > innerWidth - 95 ? -65 : 65, y: y > innerHeight - 95 ? -65 : 65 };
      stage.current.style.setProperty("--handle-x", `${x + offset.current.x}px`);
      stage.current.style.setProperty("--handle-y", `${y + offset.current.y}px`);
    };
    move.current = (x, y) => {
      position.current = {
        x: Math.max(18, Math.min(innerWidth - 18, x)),
        y: Math.max(18, Math.min(innerHeight - 18, y)),
      };
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const measure = () => {
      measureFrame = 0;
      measuredScroll = { x: window.scrollX, y: window.scrollY };
      // Place UV annotations only in empty space, including wrapped text on mobile.
      const occupied: { left: number; right: number; top: number; bottom: number }[] = [];
      const content = document.querySelector(".portfolio-shell");
      if (content) {
        const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          if (!node.textContent?.trim() || node.parentElement?.closest("[hidden], script, style"))
            continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          occupied.push(...Array.from(range.getClientRects()));
        }
        content.querySelectorAll("button, a, img, input, svg").forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width && rect.height) occupied.push(rect);
        });
      }
      const probe = document.createElement("span");
      Object.assign(probe.style, {
        position: "absolute",
        visibility: "hidden",
        pointerEvents: "none",
        fontFamily: content ? getComputedStyle(content).fontFamily : "monospace",
        fontSize: "13px",
        fontWeight: "500",
        lineHeight: "20px",
        overflowWrap: "anywhere",
        whiteSpace: "normal",
      });
      document.body.appendChild(probe);
      setDetails(
        ANCHORS.flatMap((anchor) =>
          Array.from(document.querySelectorAll(anchor.selector))
            .slice(0, 9)
            .flatMap((element, i) => {
              const projectNote = anchor.selector.includes(".portfolio-project-card");
              // A few unique discoveries, rather than the same caption on every card.
              if (projectNote && (i % 3 !== 0 || i > 6)) return [];
              const text = anchor.selector.includes(".portfolio-skills")
                ? SKILL_SECRETS[i]
                : projectNote
                  ? ["One more test...", "Edge case spotted.", "Curiosity pays off."][i / 3]
                  : anchor.text;
              const rect = element.getBoundingClientRect();
              if (!rect.width || !rect.height) return [];
              const edge = anchor.kind === "crack";
              if (edge)
                return [
                  {
                    id: `${anchor.selector}-${i}`,
                    kind: anchor.kind,
                    text,
                    x: rect.left + 7,
                    y: rect.top + Math.min(rect.height / 2, 70),
                  },
                ];
              const bounds = (
                element.closest(".portfolio-panel") || content
              )?.getBoundingClientRect();
              if (!bounds) return [];
              const left = Math.max(16, bounds.left + 12);
              const right = Math.min(innerWidth - 16, bounds.right - 12);
              const width = Math.min(280, right - left);
              if (width < 100) return [];
              probe.style.width = `${width - (anchor.kind === "note" ? 0 : 21)}px`;
              probe.textContent = text;
              const height = Math.max(24, Math.ceil(probe.getBoundingClientRect().height));
              const fits = (x: number, y: number) =>
                y >= bounds.top + 8 &&
                y + height <= bounds.bottom - 8 &&
                !occupied.some(
                  (r) =>
                    x < r.right + 5 &&
                    x + width > r.left - 5 &&
                    y < r.bottom + 4 &&
                    y + height > r.top - 4,
                );
              const candidates = [rect.bottom + 6, rect.top - height - 6];
              for (let y = rect.top + 6; y + height <= rect.bottom - 6; y += 6) candidates.push(y);
              for (const y of candidates) {
                for (const proposed of [
                  rect.right - width - 6,
                  rect.left + 6,
                  rect.left + (rect.width - width) / 2,
                ]) {
                  const x = Math.max(left, Math.min(right - width, proposed));
                  if (!fits(x, y)) continue;
                  occupied.push({ left: x, right: x + width, top: y, bottom: y + height });
                  return [
                    { id: `${anchor.selector}-${i}`, kind: anchor.kind, text, x, y, width, height },
                  ];
                }
              }
              return [];
            }),
        ),
      );
      probe.remove();
      const extras: Detail[] = [];
      for (const [selector, kind] of [
        [".portfolio-panel:not([hidden])", "repair"],
        [".portfolio-footer", "pixel"],
      ]) {
        const el = document.querySelector(selector);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        extras.push({
          id: kind,
          kind,
          text: "",
          x: rect.right - 35,
          y: kind === "repair" ? rect.top - 12 : rect.top + 8,
        });
      }
      const panel = document.querySelector(".portfolio-panel:not([hidden])");
      if (panel) {
        const rect = panel.getBoundingClientRect();
        const count = panel.id === "panel-about" ? 8 : 2;
        const travel = Math.min(rect.height - 80, 1050);
        Array.from({ length: count }, (_, i) => {
          extras.push({
            id: `bug-${panel.id}-${i}`,
            kind: "shy-bug",
            text: "",
            species: i % 3,
            x: i % 2 ? rect.left - 10 : rect.right - 14,
            y: rect.top + 28 + (travel * i) / (count - 1),
          });
        });
      }
      setGimmicks(
        extras.map((item) => ({ ...item, x: item.x + window.scrollX, y: item.y + window.scrollY })),
      );
      paint();
    };
    const schedule = () => {
      if (!measureFrame) measureFrame = requestAnimationFrame(measure);
    };
    const invalidate = schedule;
    // Child-list churn can fire every frame; measure once the layout settles.
    let mutationTimer = 0;
    const invalidateFromMutation = () => {
      window.clearTimeout(mutationTimer);
      mutationTimer = window.setTimeout(schedule, 200);
    };
    // The bugs scroll with the document; UV notes only need a translation.
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const pointer = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest(".inspection-handle")) return;
      if (event.pointerType === "mouse" || event.pointerType === "pen")
        move.current(event.clientX, event.clientY);
    };
    position.current = { x: innerWidth - 105, y: 180 };
    measure();
    const observer = new ResizeObserver(invalidate);
    const shell = document.querySelector(".portfolio-shell");
    if (shell) observer.observe(shell);
    const mutation = new MutationObserver(invalidateFromMutation);
    if (shell)
      mutation.observe(shell, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["hidden", "open"],
      });
    const swarmObserver = new MutationObserver(schedule);
    swarmObserver.observe(document.documentElement, { childList: true });
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", invalidate);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(measureFrame);
      window.clearTimeout(mutationTimer);
      observer.disconnect();
      mutation.disconnect();
      swarmObserver.disconnect();
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", invalidate);
      move.current = () => undefined;
    };
  }, [mounted]);

  if (!mounted) return null;
  return createPortal(
    <>
      <div ref={stage} className="inspection-stage" data-swarm-ignore>
        <div className="inspection-lens" aria-hidden="true" />
        <div className="inspection-secrets" aria-hidden="true">
          <div ref={notesLayer}>
            {details.map((detail) => (
              <div
                key={detail.id}
                className={`inspection-detail inspection-${detail.kind}`}
                style={{
                  left: detail.x,
                  top: detail.y,
                  width: detail.width,
                  height: detail.height,
                }}
              >
                {detail.kind === "crack" && (
                  <svg preserveAspectRatio="none" viewBox="0 0 120 80">
                    <path d="M4 8 L35 24 L27 40 L59 47 L73 74 L90 62 L116 76 M59 47 L86 29 L82 11 M35 24 L49 5" />
                  </svg>
                )}
                {detail.kind === "circuit" && (
                  <svg viewBox="0 0 120 80">
                    <path d="M3 22 H35 L49 36 H80 V60 H115 M18 65 V47 H40 M80 36 H112" />
                    <circle cx="3" cy="22" r="3" />
                    <circle cx="115" cy="60" r="3" />
                    <circle cx="18" cy="65" r="3" />
                  </svg>
                )}
                {detail.kind === "bug" && <Bug size={17} />}
                {detail.kind === "code" && <Code2 size={15} />}
                {detail.kind === "spark" && <Sparkles size={18} />}
                {detail.text && <span>{detail.text}</span>}
              </div>
            ))}
          </div>
        </div>
        <button
          className="inspection-handle"
          aria-label="Move UV flashlight"
          title="Drag to reveal hidden details"
          onPointerDown={(event) => {
            dragOffset.current = { ...offset.current };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              move.current(
                event.clientX - dragOffset.current.x,
                event.clientY - dragOffset.current.y,
              );
          }}
          onKeyDown={(event) => {
            const delta = {
              ArrowLeft: [-20, 0],
              ArrowRight: [20, 0],
              ArrowUp: [0, -20],
              ArrowDown: [0, 20],
            }[event.key];
            if (delta) {
              event.preventDefault();
              move.current(position.current.x + delta[0], position.current.y + delta[1]);
            }
          }}
        >
          <Flashlight size={13} aria-hidden="true" />
        </button>
      </div>
      <div ref={bugsLayer} className="uv-gimmicks" aria-hidden="true" data-swarm-ignore>
        {gimmicks.map((item) => (
          <div
            key={item.id}
            className={`uv-gimmick uv-${item.kind}`}
            data-x={item.x}
            data-y={item.y}
            style={{ left: item.x, top: item.y, width: item.size, height: item.size }}
          >
            {item.kind === "shy-bug" && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`uv-species-${item.species}`}
              >
                {item.species === 0 && (
                  <>
                    <path d="M8 8 4 5 M16 8 20 5 M7 12H2 M17 12h5 M8 17l-4 3 M16 17l4 3 M10 5 8 2 M14 5l2-3" />
                    <ellipse cx="12" cy="13" rx="5" ry="7" fill="#44324f" />
                    <path d="M12 7v12" />
                    <circle cx="10" cy="11" r=".7" fill="currentColor" />
                    <circle cx="14" cy="15" r=".7" fill="currentColor" />
                  </>
                )}
                {item.species === 1 && (
                  <>
                    <path d="m9 9-5-5-2 2 M15 9l5-5 2 2 M8 12H3l-2 3 M16 12h5l2 3 M9 15l-5 4v3 M15 15l5 4v3" />
                    <ellipse cx="12" cy="15" rx="4" ry="5" fill="#293d48" />
                    <circle cx="12" cy="8" r="3" fill="#293d48" />
                    <path d="m10 5-2-3 M14 5l2-3" />
                  </>
                )}
                {item.species === 2 && (
                  <>
                    <path d="M9 11 4 8 2 10 M15 11l5-3 2 2 M9 14H3l-1 3 M15 14h6l1 3 M10 17l-4 4 M14 17l4 4 M10 5 8 2 M14 5l2-3" />
                    <ellipse cx="12" cy="15" rx="3" ry="5" fill="#4c3a2d" />
                    <circle cx="12" cy="9" r="2" fill="#4c3a2d" />
                    <circle cx="12" cy="5" r="2" fill="#4c3a2d" />
                  </>
                )}
              </svg>
            )}
            {item.kind === "repair" && (
              <svg width="48" height="24" viewBox="0 0 48 24">
                <path
                  className="uv-fracture"
                  pathLength="1"
                  d="M0 12 L11 8 L18 17 L25 5 L31 14 L48 12"
                />
                <path
                  className="uv-stitches"
                  d="M10 5 L13 14 M18 10 L22 18 M26 4 L30 12 M34 9 L36 17"
                />
              </svg>
            )}
            {item.kind === "pixel" && (
              <>
                <i className="uv-runaway" />
                <MousePointer2 className="uv-rescuer" size={13} />
              </>
            )}
          </div>
        ))}
      </div>
    </>,
    document.body,
  );
}
