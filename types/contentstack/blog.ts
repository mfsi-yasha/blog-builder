import {
  CsEntry,
  CsAsset,
  CsLink,
  CsJsonRte,
  CsSeo,
  CsSocialShare,
} from "./common";
import { CsAuthor } from "./author";
import { CsHeroBanner } from "./hero-banner";

/**
 * Blog Landing Page content type (uid: "blog_landing_page")
 * Represents an individual blog post.
 * url_prefix: "/blog/"
 */
export interface CsBlogLandingPage extends CsEntry {
  author: CsAuthor[];
  date?: string;
  featured_image: CsAsset;
  body?: CsJsonRte;
  related_post?: CsBlogLandingPage[];
  is_archived?: boolean;
  comments?: {
    comment?: string;
    call_to_action?: CsLink;
  };
  social_share?: CsSocialShare;
  seo?: CsSeo;
}

/** From Blog block within blog_listing_page modular blocks */
export interface CsBlogListingFromBlog {
  title_h2?: string;
  featured_blogs?: CsBlogLandingPage[];
  view_articles?: CsLink;
}

/** Widget block within blog_listing_page modular blocks */
export interface CsBlogListingWidget {
  title_h2?: string;
  type?: "Blog Archive" | "Related Posts";
  related_blogs?: CsBlogLandingPage[];
}

/** Blog listing page modular block union */
export type CsBlogListingPageComponent =
  | { hero_banner: { hero_banner: CsHeroBanner[] } }
  | { from_blog: CsBlogListingFromBlog }
  | { widget: CsBlogListingWidget };

/**
 * Blog Listing Page content type (uid: "blog_listing_page")
 * The blog index/archive page.
 */
export interface CsBlogListingPage extends CsEntry {
  search?: {
    placeholder_text?: string;
    search_button?: CsLink;
  };
  page_components?: CsBlogListingPageComponent[];
  seo?: CsSeo;
}
