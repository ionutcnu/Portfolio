export const dynamic = "force-dynamic";

// Public stats only. WAKATIME_USERNAME optionally overrides the public profile.
export async function GET() {
  const username = process.env.WAKATIME_USERNAME?.trim() || "aeonftw";
  if (!/^[a-zA-Z0-9_-]+$/.test(username))
    return Response.json({ status: "unavailable" }, { status: 503 });
  const profile = `https://wakatime.com/@${encodeURIComponent(username)}`;
  try {
    const response = await fetch(
      `https://wakatime.com/api/v1/users/${encodeURIComponent(username)}/stats`,
      {
        next: { revalidate: 1800 },
        signal: AbortSignal.timeout(10000),
      },
    );
    if (response.status === 202) return Response.json({ status: "processing", profile });
    if (!response.ok) return Response.json({ status: "unavailable", profile });
    const { data } = (await response.json()) as { data?: Record<string, unknown> };
    if (!data) return Response.json({ status: "unavailable", profile });
    const total =
      data.is_coding_activity_visible === false
        ? null
        : (data.total_seconds_including_other_language ?? data.total_seconds);
    const average =
      data.is_coding_activity_visible === false
        ? null
        : (data.daily_average_including_other_language ?? data.daily_average);
    const languages =
      data.is_language_usage_visible !== false && Array.isArray(data.languages)
        ? data.languages
            .filter(
              (item: { name?: unknown; percent?: unknown }) =>
                item &&
                typeof item.name === "string" &&
                typeof item.percent === "number" &&
                Number.isFinite(item.percent),
            )
            .slice(0, 5)
            .map((item: { name: string; percent: number }) => ({
              name: item.name,
              percent: Math.max(0, Math.min(100, item.percent)),
            }))
        : [];
    const categories =
      data.is_category_usage_visible !== false && Array.isArray(data.categories)
        ? data.categories
            .filter(
              (item: { name?: unknown; percent?: unknown }) =>
                item &&
                typeof item.name === "string" &&
                typeof item.percent === "number" &&
                Number.isFinite(item.percent),
            )
            .map((item: { name: string; percent: number }) => ({
              name: item.name,
              percent: Math.max(0, Math.min(100, item.percent)),
            }))
        : [];
    return Response.json(
      {
        status: "ready",
        profile,
        range:
          data.range === "all_time"
            ? "All time"
            : typeof data.human_readable_range === "string"
              ? data.human_readable_range
              : "Public stats",
        total: typeof total === "number" && Number.isFinite(total) && total >= 0 ? total : null,
        average:
          typeof average === "number" && Number.isFinite(average) ? Math.max(0, average) : null,
        languages,
        categories,
        stale: data.is_up_to_date === false,
      },
      { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } },
    );
  } catch {
    return Response.json({ status: "unavailable", profile });
  }
}
