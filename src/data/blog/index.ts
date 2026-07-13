import type { BlogContent, BlogContentBlock } from "./types";
import { content as shiftingSecurityLeftCicd } from "./shifting-security-left-cicd";
import owaspTop10Markdown from "./owasp-top-10-2026.md?raw";

/** Full article bodies keyed by BLOG_POSTS slug. Posts without an entry fall back to a generic placeholder body. */
export const BLOG_CONTENT: Record<string, BlogContent> = {
  "shifting-security-left-cicd": { format: "blocks", blocks: shiftingSecurityLeftCicd },
  "owasp-top-10-2026": { format: "markdown", markdown: owaspTop10Markdown },
};

export type { BlogContent, BlogContentBlock };
