/** Structured block types for rendering a blog post body without a Markdown/MDX pipeline. */
export type BlogContentBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; text: string };

/** A post body is either the simple hand-built block list above, or raw Markdown (tables, callouts, nested headings, etc). */
export type BlogContent =
  | { format: "blocks"; blocks: BlogContentBlock[] }
  | { format: "markdown"; markdown: string };
