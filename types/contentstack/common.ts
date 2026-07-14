/** Shared Contentstack types derived from the exported stack schema */

/** Base entry fields present on every Contentstack entry */
export interface CsEntry {
  uid: string;
  title: string;
  url?: string;
  locale: string;
  created_at: string;
  updated_at: string;
  _version: number;
  $?: { [key: string]: any };
}

/** Contentstack file/asset shape */
export interface CsAsset {
  uid: string;
  title: string;
  url: string;
  filename: string;
  content_type: string;
  file_size: string;
  dimension?: {
    width: number;
    height: number;
  };
}

/** Contentstack link field shape */
export interface CsLink {
  title: string;
  href: string;
}

/** SEO global field (uid: "seo") */
export interface CsSeo {
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  enable_search_indexing?: boolean;
}

/** Social Media Share item within social_share global field */
export interface CsSocialMediaShareItem {
  title?: string;
  icon?: CsAsset;
  url?: CsLink;
}

/** Social Share global field (uid: "social_share") */
export interface CsSocialShare {
  social_media_share?: CsSocialMediaShareItem[];
}

/**
 * Contentstack JSON RTE node.
 * The delivery SDK returns JSON RTE as a nested tree of nodes.
 */
export interface CsJsonRteNode {
  type: string;
  uid?: string;
  attrs?: Record<string, unknown>;
  children?: CsJsonRteNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  break?: boolean;
}

/** JSON RTE field shape (top-level wrapper) */
export interface CsJsonRte {
  type: "doc";
  uid: string;
  attrs: Record<string, unknown>;
  children: CsJsonRteNode[];
}

/** Color picker extension field shape */
export interface CsColorPicker {
  [key: string]: unknown;
}
