"use client";

import { useCallback, useEffect, useState } from "react";
import type { Release, SocialLink } from "@/types";
import type { HeroContent } from "@/lib/site-content";

interface SiteData {
  hero: HeroContent;
  releases: Release[];
  social: SocialLink[];
}

const MOODS = ["dream", "rage", "love", "distortion", "void", "pulse"] as const;
const ICONS = ["spotify", "apple", "youtube", "tiktok", "instagram"] as const;

function authHeaders(password: string) {
  return { Authorization: `Bearer ${password}`, "Content-Type": "application/json" };
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<SiteData | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loginError, setLoginError] = useState("");

  const loadContent = useCallback(async (pw: string) => {
    const res = await fetch("/api/admin/content", {
      headers: authHeaders(pw),
    });
    if (!res.ok) throw new Error("Invalid password");
    return (await res.json()) as SiteData;
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) {
      loadContent(saved)
        .then((content) => {
          setToken(saved);
          setData(content);
        })
        .catch(() => sessionStorage.removeItem("admin_token"));
    }
  }, [loadContent]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    try {
      const content = await loadContent(password);
      sessionStorage.setItem("admin_token", password);
      setToken(password);
      setData(content);
      setPassword("");
    } catch {
      setLoginError("Wrong password. Check ADMIN_PASSWORD in Netlify env vars.");
    }
  }

  function logout() {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setData(null);
  }

  async function handleSave() {
    if (!token || !data) return;
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Save failed");
      setStatus("Saved! Site will redeploy in ~1–2 minutes.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(file: File, onPath: (path: string) => void) {
    if (!token) return;
    setStatus("Uploading image…");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    const result = await res.json();
    if (!res.ok) {
      setStatus(result.error || "Upload failed");
      return;
    }
    onPath(result.path);
    setStatus("Image uploaded.");
  }

  function updateHero(patch: Partial<HeroContent>) {
    setData((d) => d && { ...d, hero: { ...d.hero, ...patch } });
  }

  function updateRelease(index: number, patch: Partial<Release>) {
    setData((d) => {
      if (!d) return d;
      const releases = [...d.releases];
      releases[index] = { ...releases[index], ...patch };
      if (patch.featured) {
        releases.forEach((r, i) => {
          if (i !== index) releases[i] = { ...r, featured: false };
        });
      }
      if (patch.showInPromo) {
        releases.forEach((r, i) => {
          if (i !== index) releases[i] = { ...r, showInPromo: false };
        });
      }
      return { ...d, releases };
    });
  }

  function updateReleaseLinks(index: number, key: string, value: string) {
    setData((d) => {
      if (!d) return d;
      const releases = [...d.releases];
      releases[index] = {
        ...releases[index],
        links: { ...releases[index].links, [key]: value },
      };
      return { ...d, releases };
    });
  }

  function addRelease() {
    setData((d) =>
      d
        ? {
            ...d,
            releases: [
              ...d.releases,
              {
                id: `new-track-${Date.now()}`,
                title: "NEW TRACK",
                date: "2026.01.01",
                mood: "pulse",
                cover: "/art/light-speed.png",
                featured: false,
                showInPromo: false,
                description: "",
                links: { spotify: "", apple: "" },
              },
            ],
          }
        : d,
    );
  }

  function removeRelease(index: number) {
    setData((d) =>
      d ? { ...d, releases: d.releases.filter((_, i) => i !== index) } : d,
    );
  }

  function updateSocial(index: number, patch: Partial<SocialLink>) {
    setData((d) => {
      if (!d) return d;
      const social = [...d.social];
      social[index] = { ...social[index], ...patch };
      return { ...d, social };
    });
  }

  if (!token || !data) {
    return (
      <div className="min-h-screen bg-[#030308] text-[#c8d4e8] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-xl font-semibold tracking-wide text-[#00f0ff]">
            Mally Reality Admin
          </h1>
          <p className="text-sm text-white/50">
            Edit site content without Netlify Identity. Changes save to GitHub and auto-deploy.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#00f0ff]/50"
            autoFocus
          />
          {loginError && <p className="text-sm text-red-400">{loginError}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#00f0ff]/20 py-3 text-sm font-medium text-[#00f0ff] hover:bg-[#00f0ff]/30"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030308] text-[#c8d4e8]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#030308]/95 px-4 py-3 backdrop-blur">
        <h1 className="text-sm font-semibold tracking-wide text-[#00f0ff]">Site Admin</h1>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-[#00f0ff]/20 px-4 py-2 text-xs font-medium text-[#00f0ff] disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save & Deploy"}
          </button>
          <button onClick={logout} className="rounded-lg px-3 py-2 text-xs text-white/40">
            Log out
          </button>
        </div>
      </header>

      {status && (
        <p className="border-b border-white/5 px-4 py-2 text-xs text-[#a5f3fc]">{status}</p>
      )}

      <main className="mx-auto max-w-2xl space-y-8 p-4 pb-24">
        {/* Hero */}
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-white/40">Hero</h2>
          <Field label="Artist name" value={data.hero.artistName} onChange={(v) => updateHero({ artistName: v })} />
          <Field label="Tagline" value={data.hero.tagline} onChange={(v) => updateHero({ tagline: v })} />
          <Field label="CTA button" value={data.hero.ctaText} onChange={(v) => updateHero({ ctaText: v })} />
          <ImageField
            label="Logo"
            value={data.hero.logo}
            onChange={(v) => updateHero({ logo: v })}
            onUpload={(f) => uploadImage(f, (p) => updateHero({ logo: p }))}
          />
          <ImageField
            label="Background image"
            value={data.hero.backgroundImage || ""}
            onChange={(v) => updateHero({ backgroundImage: v })}
            onUpload={(f) => uploadImage(f, (p) => updateHero({ backgroundImage: p }))}
          />
        </section>

        {/* Releases */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-widest text-white/40">Releases</h2>
            <button onClick={addRelease} className="text-xs text-[#00f0ff]">
              + Add release
            </button>
          </div>
          {data.releases.map((release, i) => (
            <div key={release.id} className="space-y-3 rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{release.title || "Untitled"}</span>
                <button onClick={() => removeRelease(i)} className="text-xs text-red-400/70">
                  Remove
                </button>
              </div>
              <Field label="ID (slug)" value={release.id} onChange={(v) => updateRelease(i, { id: v })} />
              <Field label="Title" value={release.title} onChange={(v) => updateRelease(i, { title: v })} />
              <Field label="Date (YYYY.MM.DD)" value={release.date} onChange={(v) => updateRelease(i, { date: v })} />
              <label className="block text-xs text-white/40">
                Mood
                <select
                  value={release.mood}
                  onChange={(e) => updateRelease(i, { mood: e.target.value as Release["mood"] })}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                >
                  {MOODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
              <ImageField
                label="Cover art"
                value={release.cover}
                onChange={(v) => updateRelease(i, { cover: v })}
                onUpload={(f) => uploadImage(f, (p) => updateRelease(i, { cover: p }))}
              />
              <Field
                label="Description"
                value={release.description || ""}
                onChange={(v) => updateRelease(i, { description: v })}
                multiline
              />
              <Field
                label="Spotify URL"
                value={release.links.spotify || ""}
                onChange={(v) => updateReleaseLinks(i, "spotify", v)}
              />
              <Field
                label="Apple Music URL"
                value={release.links.apple || ""}
                onChange={(v) => updateReleaseLinks(i, "apple", v)}
              />
              <div className="flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!release.featured}
                    onChange={(e) => updateRelease(i, { featured: e.target.checked })}
                  />
                  Featured (latest)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!release.showInPromo}
                    onChange={(e) => updateRelease(i, { showInPromo: e.target.checked })}
                  />
                  Show promo card
                </label>
              </div>
              {release.showInPromo && (
                <>
                  <Field
                    label="Promo badge"
                    value={release.promoBadge || ""}
                    onChange={(v) => updateRelease(i, { promoBadge: v })}
                  />
                  <Field
                    label="Promo status"
                    value={release.promoStatus || ""}
                    onChange={(v) => updateRelease(i, { promoStatus: v })}
                  />
                </>
              )}
              <Field
                label="YouTube ID (optional)"
                value={release.youtubeId || ""}
                onChange={(v) => updateRelease(i, { youtubeId: v })}
              />
            </div>
          ))}
        </section>

        {/* Social */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-white/40">Social links</h2>
          {data.social.map((link, i) => (
            <div key={link.id} className="space-y-2 rounded-xl border border-white/10 p-4">
              <Field label="Label" value={link.label} onChange={(v) => updateSocial(i, { label: v })} />
              <Field label="URL" value={link.href} onChange={(v) => updateSocial(i, { href: v })} />
              <label className="block text-xs text-white/40">
                Icon
                <select
                  value={link.icon}
                  onChange={(e) =>
                    updateSocial(i, { icon: e.target.value as SocialLink["icon"] })
                  }
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                >
                  {ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const cls =
    "mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#00f0ff]/50";
  return (
    <label className="block text-xs text-white/40">
      {label}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onUpload,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onUpload: (file: File) => void;
}) {
  return (
    <div className="space-y-2">
      <Field label={label} value={value} onChange={onChange} />
      <div className="flex items-center gap-3">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-14 w-14 rounded-lg object-cover border border-white/10" />
        )}
        <label className="cursor-pointer rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-white/50 hover:border-[#00f0ff]/40">
          Upload image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
            }}
          />
        </label>
      </div>
    </div>
  );
}
