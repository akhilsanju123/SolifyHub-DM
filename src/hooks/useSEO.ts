import { useEffect } from "react";

type SEOOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  schema?: object | object[];
};

const SITE_URL = "https://solifyhub.com";
const DEFAULT_IMAGE = `${SITE_URL}/logo_png.png`;

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setSchema(schema: object | object[]) {
  const existing = document.getElementById("page-schema");
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "page-schema";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function useSEO({ title, description, path, keywords, image, schema }: SEOOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const img = image || DEFAULT_IMAGE;

    document.title = title;

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);

    setLink("canonical", url);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", img);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "SOLIFYHUB");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);

    // Schema markup
    if (schema) {
      setSchema(schema);
    } else {
      const existing = document.getElementById("page-schema");
      if (existing) existing.remove();
    }

    return () => {
      const existing = document.getElementById("page-schema");
      if (existing) existing.remove();
    };
  }, [title, description, path, keywords, image, schema]);
}

export { SITE_URL };
