/**
 * Instagram @plesnicarsolutions – Profil-Embed (öffentliches Konto erforderlich).
 * Einzelbeiträge: optional zusätzlich blockquote + embed.js (siehe Meta-Doku).
 */
export const INSTAGRAM_USERNAME = "plesnicarsolutions" as const;

export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/` as const;

/** Offizielle Embed-URL für das Profil (iframe). */
export const INSTAGRAM_EMBED_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/embed` as const;
