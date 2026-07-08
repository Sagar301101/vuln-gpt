/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** SheetDB endpoint the demo-call form POSTs to. See README. */
  readonly VITE_DEMO_SHEET_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
