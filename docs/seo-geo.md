# SEO et documentation pour les IA

Configuration vérifiée le 21 octobre 2026. Le site public est `https://app-studio-6167b.web.app` ; sa source reste dans ce dépôt et son déploiement Firebase dans `../landing`.

## Ce que le build publie

- Le HTML complet des deux landing pages, des guides et des 77 références, avec titres, descriptions et URL canoniques propres à chaque page.
- Le code des exemples dans le HTML initial, accessible dans l'onglet Code. Les démonstrations restent interactives après hydratation.
- `/llms.txt` : index Markdown des packages, des guides et des références ; le framework est présenté en premier.
- `/llms-full.txt` : export complet. Il est volontairement plus volumineux ; les agents doivent privilégier les pages individuelles pour une tâche ciblée.
- Une alternative Markdown pour chaque page : `/index.md`, `/components.md`, `/docs.md`, `/docs/installation.md`, `/docs/Button.md`, etc. Les liens et exemples proviennent du même rendu que la documentation humaine.
- Des liens HTML `alternate` vers le Markdown et `describedby` vers l'index, ainsi qu'un en-tête HTTP de découverte.
- Des données structurées WebSite, WebPage/TechArticle/CollectionPage, SoftwareSourceCode et BreadcrumbList, correspondant aux produits et à la navigation visibles. Aucun avis, prix, auteur ou historique de mise à jour n'est inventé.
- Un sitemap contenant les URL HTML canoniques. Les exports Markdown et texte restent consultables par les agents, avec `X-Robots-Tag: noindex, follow` pour éviter des résultats dupliqués dans la recherche.

Les exports sont créés par `scripts/prerender.mjs` et `scripts/ai-docs.mjs`. Ne pas les modifier directement dans `build`. Modifier les guides, références ou pages, puis reconstruire.

`robots.txt` autorise tous les robots, ce qui inclut Googlebot, bingbot, OAI-SearchBot, Claude-SearchBot et PerplexityBot. Cette politique existante reste ouverte ; aucune préférence d'entraînement distincte n'a été ajoutée. Un user-agent simulé peut vérifier l'accès HTTP, mais ne prouve pas le passage ou l'indexation d'un vrai robot.

## Vérifier et publier

```sh
npm run test:ai-docs
npm run test:unwatch -- src/__tests__/seo.test.tsx src/__tests__/documentation.test.tsx src/__tests__/marketing.test.tsx
npm run typecheck
npm --prefix ../landing run deploy
npm run seo:indexnow
```

Exécuter IndexNow après un déploiement qui modifie les pages : le script vérifie que le fichier public de propriété est bien en ligne, puis soumet les URL du sitemap. `public/indexnow-key.txt` est une preuve publique de propriété pour ce protocole, pas un secret. Un reçu HTTP 200 ou 202 signifie que la notification a été reçue, sans garantir une indexation. IndexNow concerne les moteurs participants ; ce n'est pas une soumission à Google.

## Mesurer ce qui reste externe au site

Vérification du 21 octobre 2026 : 110 tests de l'application, 3 tests d'export et TypeScript réussis ; les 95 pages HTML, leurs 95 alternatives Markdown et les trois fichiers de découverte ont été comparés au build en production (193 ressources). L'accès HTTP a aussi été testé avec cinq user-agents de recherche simulés. Le guide IA a été contrôlé à 390 px, sans débordement horizontal ni erreur dans la console. IndexNow a reçu les 95 URL avec un statut HTTP 202 ; cela ne constate pas leur indexation.

Dans Google Search Console et Bing Webmaster Tools, vérifier la propriété du domaine, envoyer `/sitemap.xml`, inspecter les landing pages et quelques références, puis suivre l'indexation et les citations sur plusieurs semaines. Bing propose un rapport AI Performance ; utiliser les rapports officiels disponibles sur la propriété plutôt qu'un score GEO inventé. Aucune connexion à ces comptes ni donnée de visibilité n'a été établie dans ce travail.

Si des statistiques de trafic sont ajoutées, suivre les visites provenant de ChatGPT, Claude, Perplexity et Copilot, ainsi que les visites et conversions utiles. Une visite de robot et une citation dans une réponse ne sont pas la même mesure. Ne pas ajouter de tracking tiers uniquement pour prétendre mesurer le GEO.

Le contenu doit rester précis : imports vérifiables, API réelles, limites natives, dépendances et licences propres à chaque package. Les sources publiques et des exemples fonctionnels sont plus utiles qu'une multiplication de pages de mots-clés. Des mentions externes authentiques et une adoption réelle ne peuvent pas être fabriquées dans les métadonnées du site.

## Références officielles consultées

- [Google : optimisation pour les fonctionnalités de recherche générative](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) — fondamentaux SEO, contenu utile et limites des tactiques GEO. Google indique ne pas utiliser llms.txt comme signal spécial de classement.
- [Google : fonctionnalités IA et sites web](https://developers.google.com/search/docs/appearance/ai-features) — accès aux robots, indexation, extraits, liens internes et correspondance entre contenu visible et balisage.
- [Proposition llms.txt v2](https://llmstxt.org/) — index concis, alternatives Markdown et liens de découverte. Il s'agit d'une proposition, pas d'une obligation commune à tous les moteurs.
- [OpenAI : robots](https://developers.openai.com/api/docs/bots) — distinction entre OAI-SearchBot, récupération à la demande et entraînement.
- [Anthropic : robots](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) — Claude-SearchBot, Claude-User et ClaudeBot ont des usages distincts.
- [Perplexity : robots](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) — accès aux contenus et identification des robots.
- [IndexNow : protocole](https://www.indexnow.org/documentation) — notification des URL modifiées, vérification de propriété et signification des réponses HTTP.
- [Bing : AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) — suivi des citations dans les expériences IA prises en charge.

Ces améliorations rendent le contenu accessible et plus facile à exploiter ; elles ne garantissent ni classement, ni recommandation, ni citation par un assistant.
