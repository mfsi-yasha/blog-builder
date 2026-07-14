import { CsEntry, CsAsset, CsLink, CsJsonRte, CsSocialShare } from "./common";

/** Navigation menu item within the header */
export interface CsNavigationMenuItem {
  label?: string;
  call_to_action?: CsLink;
  open_in_new_tab?: boolean;
}

/** Notification bar group within the header */
export interface CsNotificationBar {
  announcement_text?: CsJsonRte;
  show_announcement?: boolean;
}

/** Header content type (uid: "header") */
export interface CsHeader extends CsEntry {
  logo?: CsAsset;
  navigation_menu?: CsNavigationMenuItem[];
  notification_bar?: CsNotificationBar;
}

/** Navigation group within the footer */
export interface CsFooterNavigation {
  link?: CsLink[];
  open_in_new_tab?: boolean;
}

/** Footer content type (uid: "footer") */
export interface CsFooter extends CsEntry {
  logo?: CsAsset;
  navigation?: CsFooterNavigation;
  social_media?: CsSocialShare;
  copyright?: CsJsonRte;
}
