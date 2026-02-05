import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { servicesData } from "@/data/servicesData";
import { hireDeveloperData } from "@/data/hireDeveloper";

import ServiceDetails from "@/components/service/service-details";
import HireDeveloperDetails from "@/components/hire-developer/hire-developer-details";

/* ----------------------------------
   TYPES (MATCH NEXT.JS GENERATED TYPES)
----------------------------------- */
type PageProps = {
  params?: Promise<{
    slug: string;
  }>;
};

/* ----------------------------------
   REQUIRED FOR STATIC EXPORT
----------------------------------- */
export const dynamicParams = false;

export function generateStaticParams() {
  const serviceSlugs = Object.keys(servicesData).map((slug) => ({ slug }));
  const hireSlugs = Object.keys(hireDeveloperData).map((slug) => ({ slug }));

  return [...serviceSlugs, ...hireSlugs];
}

/* ----------------------------------
   STATIC METADATA
----------------------------------- */
export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params!;

  const serviceData = servicesData[slug as keyof typeof servicesData];
  if (serviceData) {
    return {
      title: `ReactMinds | ${serviceData.hero.title}`,
      description: serviceData.hero.description,
      alternates: {
        canonical: `https://www.reactminds.com/${slug}`,
      },
    };
  }

  const hireData = hireDeveloperData[slug as keyof typeof hireDeveloperData];
  if (hireData) {
    return {
      title: `ReactMinds | ${hireData.hero.title}`,
      description: hireData.hero.description,
      alternates: {
        canonical: `https://www.reactminds.com/${slug}`,
      },
    };
  }

  return {};
}

/* ----------------------------------
   STATIC PAGE
----------------------------------- */
export default async function Page({ params }: PageProps) {
  const { slug } = await params!;

  /* ---------- Service Pages ---------- */
  const serviceData = servicesData[slug as keyof typeof servicesData];
  if (serviceData) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceData.hero.title,
      description: serviceData.hero.description,
      url: `https://www.reactminds.com/${slug}`,
    };

    return (
      <>
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <ServiceDetails data={serviceData} />
      </>
    );
  }

  /* ---------- Hire Developer Pages ---------- */
  const hireData = hireDeveloperData[slug as keyof typeof hireDeveloperData];
  if (!hireData) notFound();

  return <HireDeveloperDetails data={hireData} />;
}
