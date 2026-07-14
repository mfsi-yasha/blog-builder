import { CsEntry, CsAsset, CsLink, CsSeo } from "./common";
import { CsHeroBanner } from "./hero-banner";
import { CsBlogLandingPage } from "./blog";

/** Bucket item within section_with_buckets block */
export interface CsBucketItem {
  title_h3?: string;
  image?: CsAsset;
  image_alignment?: "Left" | "Right";
  description?: string;
  icon?: CsAsset;
  call_to_action?: CsLink;
}

/** Card item within section_with_cards block */
export interface CsCardItem {
  card_title_h3?: string;
  description?: string;
  call_to_action?: CsLink;
  image?: CsAsset;
}

/** From Blog block in homepage modular blocks */
export interface CsFromBlog {
  title_h2?: string;
  featured_blogs?: CsBlogLandingPage[];
  view_articles?: CsLink;
}

/** Homepage modular block union — each item has exactly one key */
export type CsHomepagePageComponent =
  | { hero_banner: { hero_banner: CsHeroBanner[] } }
  | {
      section_with_buckets: {
        title_h2?: string;
        description?: string;
        tabular_buckets?: boolean;
        buckets?: CsBucketItem[];
      };
    }
  | {
      section: {
        title_h2?: string;
        description?: string;
        call_to_action?: CsLink;
        image?: CsAsset;
        is_image_right_aligned?: boolean;
      };
    }
  | {
      section_with_cards: {
        section_title?: string;
        section_description?: string;
        cards?: CsCardItem[];
      };
    }
  | {
      section_with_html_code: {
        title?: string;
        description?: string;
        html_code?: string;
        is_html_code_left_aligned_?: boolean;
      };
    }
  | { our_team: { our_team: unknown } }
  | { from_blog: CsFromBlog }
  | { widget: { title_h2?: string; type?: "Blog Archive" | "Related Posts" } }
  | { contact_us: { reference: unknown } };

/**
 * Homepage content type (uid: "homepage")
 * url_prefix: "/"
 */
export interface CsHomepage extends CsEntry {
  page_components?: CsHomepagePageComponent[];
  seo?: CsSeo;
}
