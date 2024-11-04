import cheerio from 'cheerio';
import fsPromise from 'fs/promises';
import fs from 'fs';
import axios from 'axios';
import { Cache } from './Cache';
import { APPLICATION_SETTINGS } from './Config';
export class ContentFetcher {
  private readonly cache: Cache;
  private readonly cacheKey: string = '';

  constructor(cacheKey: string) {
    this.cacheKey = cacheKey;
    this.cache = new Cache(APPLICATION_SETTINGS.cacheDirectory);
  }

  private static isLinkValid(href: string, baseUrl: string): boolean {
    const unwantedPatterns =
      /(?:subscribe|twitter|linkedin|facebook|instagram|advertise|publications|upgrade|privacy|newsletters)/;
    return (
      !!href &&
      !href.startsWith('http') &&
      !unwantedPatterns.test(href) &&
      !href.includes(baseUrl)
    );
  }

  private async fetchAndProcessContent(
    url: string
  ): Promise<{ [key: string]: string }> {
    try {
      const response = await axios.get(url);

      let body = response.data;

      // Supprimer les balises <script> sauf les liens et les images
      body = body.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ''
      );

      // Supprimer les balises <style> sauf les liens et les images
      body = body.replace(
        /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
        ''
      );

      // Supprimer les balises autres que les liens et les images
      body = body.replace(/<(?!a|img)[^>]+>/gi, '');

      const $ = cheerio.load(body);
      const bodyHtml = $('body').html();

      const baseUrl = new URL(url).origin;

      let links = $('a')
        .map((_, element) => {
          const href: any = $(element).attr('href');
          if (ContentFetcher.isLinkValid(href, baseUrl)) {
            return new URL(href, baseUrl).toString();
          } else {
            return undefined;
          }
        })
        .get()
        .filter((link): link is string => {
          return (
            link !== baseUrl &&
            link !== baseUrl + '/' &&
            link !== `${baseUrl}/authors`
          );
        });

      if (links.length === 0) {
        return { [baseUrl]: '' };
      }
      const urlObject = new URL(links[0]);

      await this.urlToMarkdown(urlObject, bodyHtml);
      return { [baseUrl]: links[0] };
    } catch (error) {
      console.error(`Error fetching or processing content for ${url}:`, error);
      return { [new URL(url).origin]: '' };
    }
  }

  public async processAllLinks(links: string[]): Promise<void> {
    const results: { [key: string]: string } = {};

    for (const url of links) {
      console.log(`Processing ${url}`);
      const data = await this.fetchAndProcessContent(url);
      Object.assign(results, data);
    }

    try {
      await fsPromise.writeFile(
        'cache/aggregated_links.json',
        JSON.stringify(results, null, 2)
      );
      console.log('Aggregated links saved to aggregated_links.json');
    } catch (error) {
      console.error('Error writing JSON file:', error);
    }
  }

  private async urlToMarkdown(url: URL, html: any) {
    const fileHostName = `${url.hostname.replace(/\./g, '_')}.md`;

    const cachedResponse = this.cache.getFromCache(
      this.cacheKey + '/' + fileHostName
    );
    if (html && !cachedResponse) {
      const filename = `cache/articles/${url.hostname.replace(/\./g, '_')}.md`;
      if (!fs.existsSync('cache/articles')) {
        fs.mkdirSync('cache/articles', { recursive: true });
      }

      await fsPromise.writeFile(filename, html);
    }
  }
}
