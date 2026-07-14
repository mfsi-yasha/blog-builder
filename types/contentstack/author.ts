import { CsEntry, CsAsset } from "./common";

/**
 * Author content type (uid: "author")
 * Note: the "Full Name" field uses uid "title" in the schema.
 */
export interface CsAuthor extends CsEntry {
  /** Full Name — uses uid "title" */
  title: string;
  picture: CsAsset;
  bio?: string;
}
