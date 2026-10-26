import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getPageMetadata,
  metadataTags,
  markdownPath,
  publicPaths,
  SITE_URL,
  structuredData,
} from 'src/seo';

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = getPageMetadata(pathname);
    document.title = page.title;
    document.head.querySelectorAll('title').forEach((title, index) => {
      if (index) title.remove();
    });
    for (const attributes of metadataTags(page)) {
      const identity = attributes.name ? 'name' : 'property';
      const matches = document.head.querySelectorAll<HTMLMetaElement>(
        `meta[${identity}="${attributes[identity]}"]`
      );
      const meta =
        matches[0] || document.head.appendChild(document.createElement('meta'));
      Object.entries(attributes).forEach(([key, value]) =>
        meta.setAttribute(key, value)
      );
      matches.forEach((duplicate, index) => {
        if (index) duplicate.remove();
      });
    }
    const links = document.head.querySelectorAll<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    const canonical =
      links[0] || document.head.appendChild(document.createElement('link'));
    canonical.rel = 'canonical';
    canonical.href = SITE_URL + page.path;
    links.forEach((duplicate, index) => {
      if (index) duplicate.remove();
    });
    const alternate = document.head.querySelector<HTMLLinkElement>(
      'link[rel="alternate"][type="text/markdown"]'
    );
    if (publicPaths.includes(page.path)) {
      const markdown =
        alternate || document.head.appendChild(document.createElement('link'));
      markdown.rel = 'alternate';
      markdown.type = 'text/markdown';
      markdown.href = SITE_URL + markdownPath(page.path);
    } else alternate?.remove();
    const describedby =
      document.head.querySelector<HTMLLinkElement>('link[rel="describedby"]') ||
      document.head.appendChild(document.createElement('link'));
    describedby.rel = 'describedby';
    describedby.type = 'text/plain';
    describedby.href = SITE_URL + '/llms.txt';
    const schema =
      document.getElementById('site-structured-data') ||
      document.head.appendChild(document.createElement('script'));
    schema.id = 'site-structured-data';
    schema.setAttribute('type', 'application/ld+json');
    schema.textContent = JSON.stringify(structuredData(page));
  }, [pathname]);
  return null;
}
