const SITE = "https://plesnicarsolutions.at";

export type BreadcrumbItem = { name: string; path: string };

export function pageJsonLdGraph(opts: {
  path: string;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}) {
  const { path, name, description, breadcrumbs } = opts;
  const url = `${SITE}${path}`;
  const items = breadcrumbs.map((b, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    name: b.name,
    item: `${SITE}${b.path}`,
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { "@id": `${SITE}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: items,
      },
    ],
  };
}
