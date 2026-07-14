import { CsHomepagePageComponent } from "@/types/contentstack";
import { HeroBanner } from "./content-types/HeroBanner";
import { Section } from "./global-fields/Section";
import { SectionWithBuckets } from "./global-fields/SectionWithBuckets";
import { SectionWithCards } from "./global-fields/SectionWithCards";
import { SectionWithHtmlCode } from "./global-fields/SectionWithHtmlCode";
import { OurTeam } from "./content-types/OurTeam";
import { ContactUs } from "./content-types/ContactUs";
import { FromBlog } from "./FromBlog";
import { Widget } from "./Widget";

export function Renderer({
  components,
  lang,
}: {
  components?: CsHomepagePageComponent[];
  lang: string;
}) {
  if (!components || components.length === 0) return null;

  return (
    <div className="flex flex-col">
      {components.map((component, index) => {
        if ("hero_banner" in component && component.hero_banner.hero_banner) {
          const banner = component.hero_banner.hero_banner[0];
          return banner ? <HeroBanner key={index} banner={banner} /> : null;
        }

        if ("section" in component && component.section) {
          return <Section key={index} data={component.section} />;
        }

        if ("section_with_buckets" in component && component.section_with_buckets) {
          return (
            <SectionWithBuckets key={index} data={component.section_with_buckets} />
          );
        }

        if ("section_with_cards" in component && component.section_with_cards) {
          return <SectionWithCards key={index} data={component.section_with_cards} />;
        }

        if ("from_blog" in component && component.from_blog) {
          return <FromBlog key={index} data={component.from_blog as any} lang={lang} />;
        }

        if ("section_with_html_code" in component && component.section_with_html_code) {
          return <SectionWithHtmlCode key={index} data={component.section_with_html_code} />;
        }

        if ("our_team" in component && component.our_team) {
          return <OurTeam key={index} data={component.our_team as any} />;
        }

        if ("contact_us" in component && component.contact_us) {
          return <ContactUs key={index} data={component.contact_us as any} />;
        }

        if ("widget" in component && component.widget) {
          return <Widget key={index} data={component.widget as any} />;
        }

        return null;
      })}
    </div>
  );
}
