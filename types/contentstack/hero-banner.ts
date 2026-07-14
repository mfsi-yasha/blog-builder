import { CsEntry, CsAsset, CsLink, CsColorPicker } from "./common";

/**
 * Hero Banner content type (uid: "hero_banner")
 * Referenced by homepage and blog_listing_page modular blocks.
 */
export interface CsHeroBanner extends CsEntry {
  banner_image?: CsAsset;
  background_color?: CsColorPicker;
  text_color?: CsColorPicker;
  banner_description?: string;
  call_to_action?: CsLink;
  is_banner_image_full_width_?: boolean;
  banner_image_alignment?: "Left" | "Center" | "Right";
  content_title_alignment?: "Left" | "Center" | "Right";
}
