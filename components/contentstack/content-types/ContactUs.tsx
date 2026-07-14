import { CsHomepagePageComponent } from "@/types/contentstack";
import Link from "next/link";

export function ContactUs({
  data,
}: {
  data: Extract<CsHomepagePageComponent, { contact_us: any }>["contact_us"];
}) {
  const contactRef = (data?.reference as any[])?.[0];
  if (!contactRef) return null;

  return (
    <section className="bg-zinc-50 py-24" {...(contactRef.$?.title as any)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {contactRef.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactRef.address && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Address</h3>
              <p className="text-zinc-600 whitespace-pre-wrap" {...(contactRef.$?.address as any)}>
                {contactRef.address}
              </p>
            </div>
          )}

          {contactRef.email_address && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Email</h3>
              <Link href={`mailto:${contactRef.email_address}`} className="text-indigo-600 hover:underline font-medium" {...(contactRef.$?.email_address as any)}>
                {contactRef.email_address}
              </Link>
            </div>
          )}

          {contactRef.contact_number && contactRef.contact_number.length > 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center text-center md:col-span-2 lg:col-span-1">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Phone</h3>
              <div className="flex flex-col gap-2">
                {contactRef.contact_number.map((num: any, idx: number) => (
                  <Link key={idx} href={`tel:${num}`} className="text-zinc-600 hover:text-indigo-600 font-medium">
                    {num}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
