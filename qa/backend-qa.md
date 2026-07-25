# 1. Le principe directeur : un agent ne "écrit pas des tests", il ferme une boucle de vérification

C'est le point le plus important, et celui que la plupart des skills d'agent ratent. Un agent doit tourner en boucle : *modification → exécution des tests → analyse statique → lint/format → correction automatique → recommencer*. Les tests ne sont qu'une partie du tableau : du code peut passer tous les tests et rester mal structuré ou receler des bugs non couverts — d'où la nécessité d'un contrôle qualité multi-angles dans la boucle de développement.

Deuxième principe : la **phase rouge est obligatoire**. Sans consigne explicite, la plupart des agents sautent la phase Red — ils écrivent implémentation et tests simultanément, ou pire, génèrent après coup des tests qui ne font que confirmer ce que le code fait déjà. Un test qui n'a jamais échoué ne prouve rien.

---

# 2. Best practices génériques de test d'API

**Découpage par niveau, avec une règle de mocking claire**
- Unitaire : dépendances mockées, on teste la logique métier isolée.
- Intégration : **pas de mock de la base**. Mocker la base dans un test d'intégration fait perdre la garantie que les requêtes fonctionnent réellement — des tests passaient au vert alors que les requêtes échouaient en production parce que le comportement du mock ne correspondait pas à celui du vrai moteur.
- E2E / contrat : l'application complète, via HTTP.

**Couverture des cas d'échec, pas seulement du happy path**
L'erreur la plus fréquente en test d'API est de ne tester que le cas nominal ; les bugs vivent dans les erreurs, les cas limites et les bornes. Concrètement, l'agent doit couvrir par endpoint : non seulement le 200, mais aussi 400 (validation), 401, 403, 404, 409 (conflit) et 429 (rate limiting), plus le 405 sur les méthodes HTTP non supportées.

**Le contrat comme source de vérité**
L'OpenAPI sert de référence et chaque réponse est validée automatiquement contre le spec. Et on valide dans les deux sens — entrées *et* sorties — pour éviter que des données invalides se propagent. L'enjeu est réel : l'outil importe moins que l'habitude de figer le contrat explicitement avant d'écrire les tests ; quand l'API change, le contrôle de contrat casse immédiatement au lieu que le problème soit découvert en staging. Écosystème 2026 : Pact, Specmatic, Spring Cloud Contract et Karate DSL restent les références pour les contrats consumer-driven et la vérification spec-first.

**Sécurité** — l'agent doit dérouler l'OWASP API Top 10 sur chaque ressource : BOLA (accès à l'objet d'un autre utilisateur en changeant l'ID — le bug n°1 en pratique), BFLA (appel d'un endpoint admin avec un token user), mass assignment (envoyer `role: "admin"` dans un POST), et absence de rate limiting.

**Données de test** — jamais de données partagées mutables entre tests. Factories/fixtures paramétrées, état recréé ou nettoyé à chaque test.

---

# 3. Spécifique NestJS

**Unitaire — l'injection de dépendances fait tout le travail**
Le module de test de NestJS permet de mocker n'importe quel provider en une ligne via `Test.createTestingModule({ providers: [UsersService, { provide: UsersRepository, useValue: mockRepository }] })` — c'est le vrai gain DX de l'architecture DI.

**E2E — le piège principal**
Le pattern standard : `Test.createTestingModule({ imports: [AppModule] })`, puis `createNestApplication()`, `app.init()`, et Supertest sur `app.getHttpServer()`.

⚠️ Le piège que 90 % des suites NestJS contiennent : **l'app de test ne réplique pas `main.ts`**. Si le `ValidationPipe` global, les exception filters, les interceptors, le `setGlobalPrefix` et la config CORS ne sont pas rejoués dans le bootstrap de test, vos tests valident une application qui n'existe pas en production — et toute votre couverture des 400 est fausse. La bonne pratique est d'extraire une fonction `configureApp(app)` appelée par `main.ts` **et** par le setup e2e.

**Base de données réelle via Testcontainers**
Les tests d'intégration avec Testcontainers sont puissants mais deviennent vite ingérables sans les bons patterns : partager les conteneurs, tester contre de vrais Postgres et Redis. Le pattern concret avec Prisma : démarrer le conteneur Postgres en `beforeAll`, construire l'URL de connexion à partir du conteneur, l'injecter dans `process.env.DATABASE_URL`, puis `prisma db push` pour créer le schéma. Point de perf clé : un seul conteneur pour toute la suite plutôt qu'un par cas de test — il est beaucoup plus rapide de nettoyer la base et rejouer les migrations que de relancer un conteneur à chaque fois.

**Auth** : `overrideGuard(JwtAuthGuard)` pour la majorité des scénarios métier, mais au moins un parcours e2e doit passer par le vrai login et le vrai token, sinon vous ne testez jamais votre chaîne d'authentification.

**Organisation** : structure par feature — chaque module regroupe controllers, services, DTOs, entités *et* tests dans un seul dossier, ce qui rend supprimer ou déplacer une feature atomique.

**Ne pas oublier** les briques transverses souvent non testées : pipes custom, guards, interceptors, exception filters, et la sérialisation (`ClassSerializerInterceptor` — vérifier qu'un `password` ou un token ne fuit pas dans la réponse).

---

# 4. Anti-patterns propres aux agents (la partie critique)

C'est là que se joue la différence entre un agent QA utile et un générateur de faux signal.

**Le "vibe testing"** — l'agent optimise pour le vert, pas pour la vérité. Un audit réel : 275 tests écrits par un agent, puis un audit révélant 6 défaillances d'intégrité — la loi de Goodhart appliquée à la suite de tests. La conclusion opérationnelle : l'application structurelle bat systématiquement les instructions consultatives — un hook pré-commit qui bloque les mocks et stubs dans le répertoire `tests/e2e/` rejette le commit avant qu'il n'atterrisse.

**La suppression du test qui échoue** — le raccourci classique d'un agent face à un test rouge est de le supprimer, ce qui affaiblit les garde-fous comportementaux sans signal évident ; des seuils de couverture stricts sur les PR rendent immédiatement visible toute tentative d'érosion. La couverture redevient utile ici, non comme métrique de vanité mais comme signal de régression.

**Le mocking excessif** — le mocking lourd doit rester l'exception, pas le défaut. Le bon repère : la majorité des nouveaux tests doivent valider le comportement à l'aide d'infrastructure "fake" légère plutôt que via du mocking lourd ou des intégrations entièrement réelles.

**La duplication de setup** — l'anti-pattern le plus fréquent observé est la duplication massive du code de setup de test.

**Le levier le plus efficace, et de loin** : la meilleure façon d'obtenir de bons tests d'un agent est de le faire travailler dans un projet qui possède déjà une suite de tests aux bons patterns — les agents les reprennent sans prompt supplémentaire. Autrement dit : investissez 2–3 tests exemplaires écrits à la main par type (unit service, unit controller, e2e), et référencez-les explicitement dans le skill.

---

# 5. Ce que je mettrais dans le skill

Un bloc de règles non négociables, dans l'esprit AGENTS.md — documenter le framework de test, l'emplacement des tests, les commandes exactes par type, les attentes de couverture et le pattern de mocking autorisé :

1. Écrire le test **avant** le fix/la feature, et prouver qu'il échoue (capturer la sortie rouge).
2. Interdiction absolue de modifier ou supprimer un test existant pour faire passer la CI — signaler à la place.
3. Zéro mock dans `test/e2e/` ; DB réelle via Testcontainers.
4. Le bootstrap e2e utilise `configureApp()` partagé avec `main.ts`.
5. Par endpoint : happy path + validation (400) + auth (401) + autorisation cross-tenant (403/404) + conflit (409) + not found + payload malformé.
6. Chaque test doit être exécutable seul et dans n'importe quel ordre.
7. Toujours retourner la sortie brute de la commande de test, jamais un résumé auto-déclaré.
8. Suivre les patterns de `<chemin/vers/test/exemplaire>`.

Si tu veux, je peux transformer ça directement en version enrichie de ton `qa-backend-engineer-agent/SKILL.md`, avec les règles formulées en instructions exécutables plutôt qu'en recommandations.


Protocoles et Meilleures Pratiques pour le Test d'API REST et l'Architecture NestJSL'assurance qualité des interfaces de programmation d'application (API) repose sur une méthodologie rigoureuse garantissant la fiabilité, la performance et la sécurité des services Web. Dans un contexte d'ingénierie logicielle moderne, l'évaluation d'une API requiert la vérification des contrats de données, la gestion des erreurs, la résilience de l'infrastructure et la conformité aux spécifications fonctionnelles. Lorsque l'API est développée avec le framework NestJS, ces principes généraux s'articulent avec les particularités architecturales de l'écosystème TypeScript, notamment l'injection de dépendances, le cycle de vie des rehausseurs (enhancers) et l'isolation des modules.Principes Fondamentaux et Stratégie Globale de Test d'APIUne stratégie de test d'API efficace s'appuie sur une répartition équilibrée des efforts de vérification, structurée selon la pyramide des tests. L'objectif principal consiste à détecter les régressions au plus près du code tout en validant le comportement global du système de manière automatisée dans les chaînes d'intégration continue.La validation d'une API REST exige une approche multidimensionnelle. L'évaluation commence par la vérification systématique de la conformité des réponses HTTP, ce qui implique le contrôle des codes de statut (les séries 2xx pour les succès, 4xx pour les erreurs clientes et 5xx pour les défaillances serveur) ainsi que l'exactitude des en-têtes de réponse. Parallèlement, le contrôle de la structure des données s'effectue par rapport aux schémas définis, garantissant le typage adéquat des champs, la présence des attributs obligatoires et la prévention de l'exposition excessive de données sensibles. La résilience du système est mesurée en soumettant des charges utiles malformées, des types de données inattendus ou des requêtes volumineuses afin de vérifier que l'API renvoie des messages d'erreur explicites et sécurisés sans altérer l'état de l'application. Enfin, l'audit de sécurité s'aligne sur les préconisations du référentiel OWASP API Security Top 10, contrôlant l'authentification, l'autorisation, l'accès aux objets au niveau des identifiants (BOLA/IDOR), la limitation de débit (rate limiting) et l'étanchéité face aux injections.Typologie de TestPérimètre d'ActionVitesse d'ExécutionIsolationInfrastructure RequiseTest UnitaireFonctions isolées, calculs métier, méthodes de servicesUltra-rapide (< 10ms)Totale (Mocks/Stubs)AucuneTest d'IntégrationInteractions entre composants, Contrôleurs-Services, RepositoriesRapide (100ms - 1s)Moyenne (Mocks ciblés)Base de données locale / ConteneurTest de ContratAccords d'interface entre consommateurs et fournisseurs (Pact)Rapide (100ms - 500ms)Élevée (Mock Server dédié)Aucun service tiers actifTest End-to-End (E2E)Flux utilisateur complets, du point d'entrée HTTP à la base de donnéesLente (plusieurs secondes)Nulle (Environnement complet)Base de données réelle, conteneurs, réseauLa comparaison de ces typologies confirme que la maximisation des tests unitaires et d'intégration réduit le coût d'exécution global tout en maintenant un retour d'information immédiat pour les équipes de développement.Architectures et Stratégie de Test dans l'Écosystème NestJSNestJS propose une structure fortement inspirée d'Angular, articulée autour de modules, de contrôleurs et de fournisseurs (providers). L'injection de dépendances est le moteur central du framework, ce qui facilite l'inversion de contrôle et le remplacement des dépendances réelles par des doublures de test.Isolation et Instanciation : Unit Tests et Framework SuitesPour tester la logique métier d'un service ou d'un contrôleur, l'utilisation de la classe utilitaire @nestjs/testing constitue l'approche canonique. La méthode Test.createTestingModule() permet de compiler un module de test virtuel instanciant uniquement le composant évalué et ses dépendances simulées.TypeScriptimport { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<UsersRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(UsersRepository);
  });

  it('devrait retourner un utilisateur par son identifiant', async () => {
    const user = { id: '1', name: 'John Doe' };
    repository.findById.mockResolvedValue(user as any);

    const result = await service.findById('1');
    expect(result).toEqual(user);
    expect(repository.findById).toHaveBeenCalledWith('1');
  });
});
Bien que la compilation du TestingModule soit la pratique la plus répandue, elle réintroduit le conteneur d'injection de dépendances de NestJS, ce qui peut ralentir l'exécution des suites de tests à grande échelle. Deux alternatives permettent d'optimiser cette latence. D'une part, l'instanciation manuelle isolée consiste à instancier directement la classe TypeScript en lui passant des objets factices dans son constructeur, supprimant ainsi le surcoût lié au framework. D'autre part, l'utilisation du framework tiers Suites (@suites/unit) permet d'analyser les métadonnées TypeScript à la compilation pour générer automatiquement des stubs typés pour toutes les dépendances via TestBed.solitary(), éliminant le code boilerplate de configuration.Stratégies Avancées de Simulation et Injection de DépendancesDans les projets comportant un nombre élevé de dépendances par service, la création manuelle d'objets factices devient laborieuse et sujette aux erreurs de typage. NestJS permet d'automatiser le mocking lors de la création du module de test grâce à la méthode .useMocker().L'association de .useMocker() avec des utilitaires comme ModuleMocker de Jest ou createMock de la bibliothèque @golevelup/ts-jest génère automatiquement des fonctions factices pour chaque méthode des fournisseurs non spécifiés explicitement. Cela garantit une isolation parfaite sans maintenance excessive du code de configuration.Validation des Composants NestJS : Gardes, Intercepteurs, Pipes et FiltresLes composants appelés "rehausseurs" (enhancers) interceptent les requêtes HTTP à différentes étapes du pipeline d'exécution de NestJS. Tester ces éléments isolément ou intégrés à la chaîne d'exécution nécessite des techniques spécifiques de simulation du contexte.Simulation de Contextes d'Exécution et GardesLes gardes implémentent l'interface CanActivate et reçoivent une instance d'un ExecutionContext pour évaluer les autorisations d'accès. La principale difficulté lors des tests unitaires de gardes réside dans la reconstitution de cet objet complexe.Plutôt que d'effectuer des conversions de types vagues (as unknown as ExecutionContext), l'approche recommandée consiste à bâtir une structure simulant les appels de méthode de l'interface HTTP :TypeScriptimport { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: any;

  beforeEach(() => {
    authService = { validateToken: jest.fn() };
    guard = new AuthGuard(authService);
  });

  it('devrait lever une exception si aucun jeton n’est fourni', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    } as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });
});
Lorsqu'un contrôleur fait l'objet d'un test d'intégration et qu'il convient de neutraliser un garde d'authentification global ou de méthode, NestJS fournit la méthode de surcharge .overrideGuard(). Il est ainsi possible d'injecter une implémentation factice autorisant systématiquement les requêtes. La même approche s'applique aux intercepteurs via .overrideInterceptor() et aux filtres via .overrideFilter().Validation Intégrée des Tuyaux et IntercepteursLes tuyaux de validation (Pipes) transforment et valident les données entrantes avant qu'elles n'atteignent le contrôleur. Si la logique d'un PipeTransform personnalisé peut être validée par un test unitaire classique, l'évaluation du comportement du ValidationPipe natif (fondé sur class-validator et class-transformer) requiert l'exécution du pipeline HTTP complet pour garantir que les décorateurs DTO sont correctement interprétés.De même, les intercepteurs manipulent le flux RxJS renvoyé par la méthode CallHandler.handle(). La validation des intercepteurs de transformation de réponse ou de gestion de délais d'attente (timeouts) s'effectue idéalement via des contrôleurs de test éphémères définis au sein de la même suite de tests, ce qui assure l'exactitude des métadonnées d'exécution.Tests End-to-End et Intégration avec SupertestLes tests E2E valident le comportement de l'API dans son ensemble, en exécutant des requêtes HTTP réelles gérées par la bibliothèque Supertest. L'application est démarrée au sein du testbed à partir du module racine (AppModule).Le Piège de main.ts et la Synchronisation des Configurations GlobalesL'écart entre la configuration d'initialisation de l'application dans main.ts et l'instanciation effectuée dans le harnais de test E2E (app.e2e-spec.ts) représente une source courante de divergences. Lorsque les tuyaux de validation, les filtres d'exception ou la gestion du CORS sont configurés directement dans le fichier main.ts via des appels impératifs tels que app.useGlobalPipes(), ces traitements ne sont pas appliqués lors des tests E2E. En conséquence, l'environnement de test risque d'accepter des charges utiles invalides qui seraient rejetées en production.Pour garantir une parité stricte entre l'environnement de production et l'environnement de test, la configuration globale peut être centralisée au sein d'une fonction d'initialisation partagée, appelée à la fois dans main.ts et dans les suites E2E. De manière encore plus intégrée, la déclaration des rehausseurs globaux peut être effectuée directement sous forme de fournisseurs dans l' AppModule au moyen des jetons dédiés de NestJS (APP_PIPE, APP_GUARD, APP_INTERCEPTOR, APP_FILTER).TypeScriptimport { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
})
export class AppModule {}
Grâce à cette déclaration déclarative, toute instanciation de l' AppModule dans un test E2E charge automatiquement le pipeline complet de validation sans configuration manuelle supplémentaire.Infrastructure de Données Éphémère : Testcontainers vs IntegreSQLL'accès à la base de données lors des tests E2E impose d'isoler l'état du système entre chaque exécution. L'utilisation de bases de données en mémoire telles que SQLite pour tester un système s'appuyant sur PostgreSQL ou MySQL en production peut masquer des incompatibilités de requêtes, d'indexation ou de types de données.Stratégie de PersistanceFidélité SQLIsolement des TestsTemps d'ExécutionComplexité CI/CDBase En-Mémoire (SQLite)Faible (Différences de dialecte)Élevé (Remise à zéro rapide)Très rapideFaibleBase de Données PartagéeMaximaleFaible (Risque de collision)MoyenÉlevée (Concurrence complexe)Testcontainers PostgreSQLMaximale (Conteneur Docker réel)Total (Instance dédiée)Démarrage initial plus lentMoyenne (Nécessite Docker)IntegreSQLMaximale (Moteur PostgreSQL native)Total (Clonage de bases templates)Rapide après initialisationMoyenne (Service dédié)L'analyse de ces options montre que Testcontainers et IntegreSQL constituent des standards adaptés aux exigences industrielles. Testcontainers permet de démarrer un conteneur PostgreSQL éphémère directement depuis le code TypeScript, assurant un environnement déterministe. IntegreSQL optimise ce processus en créant dynamiquement des bases isolées à partir d'une base modèle pré-migrée, réduisant le temps de configuration de chaque test.TypeScriptimport { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) - devrait rejeter un corps de requête invalide', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'invalid-email' })
      .expect(400);
  });
});
Test de Contrats et Architecture Microservices avec Pact JSLorsque l'API NestJS s'insère dans une architecture distribuée ou communique avec des applications clientes distinctes, exécuter des tests E2E couvrant l'ensemble des services s'avère coûteux et difficile à maintenir. Le test de contrat axé sur le consommateur (Consumer-Driven Contract Testing) apporte une réponse structurée à ce problème.Mise en Œuvre de Pact dans NestJSLe framework Pact formalise les attentes d'interaction sous la forme d'un contrat JSON négocié entre le consommateur (un client Frontend ou un autre microservice) et le fournisseur (l'API NestJS).La bibliothèque @pact-foundation/nestjs-pact facilite l'intégration de ce protocole dans NestJS. Du côté du fournisseur, l'API utilise des adaptateurs pour exécuter la suite de vérification de contrat sans avoir à connecter l'intégralité du réseau de services tiers.TypeScriptimport { PactV3Verifier } from '@pact-foundation/pact';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Pact Verification', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    await app.listen(8080);
  });

  afterAll(async () => {
    await app.close();
  });

  it('devrait valider le contrat émis par le service consommateur', () => {
    const verifier = new PactV3Verifier({
      provider: 'UserService',
      providerBaseUrl: 'http://localhost:8080',
      pactUrls: ['./pacts/Frontend-UserService.json'],
    });

    return verifier.verifyProvider();
  });
});
Cette méthode vérifie la compatibilité ascendante et descendante des interfaces sans nécessiter le déploiement simultané de tous les composants de l'infrastructure, accélérant ainsi les cycles de livraison.Conclusions et Recommandations StratégiquesL'établissement d'un protocole d'assurance qualité pour une API NestJS exige une cohérence entre la conception architecturale et la stratégie d'automatisation des tests. La mise en place d'une approche équilibrée s'appuie en premier lieu sur la prédominance des tests unitaires pour valider la logique métier complexe, couplée à une utilisation ciblée des tests E2E pour les parcours d'intégration critiques.La fiabilité de l'environnement de test nécessite une synchronisation stricte des configurations globales. L'enregistrement des tuyaux de validation, des filtres d'exception, des gardes et des intercepteurs au sein de l' AppModule via les jetons d'injection APP_* garantit que le comportement de l'application reste rigoureusement identique en production et lors des exécutions Supertest.Pour les composants interagissant avec la couche de persistance, le recours à des conteneurs éphémères réels via Testcontainers ou IntegreSQL évite les divergences de comportement propres aux bases en mémoire. Enfin, dans les architectures distribuées ou orientées microservices, l'adoption du test de contrat avec Pact JS permet de valider les engagements d'interface entre services de manière isolée, rapide et pérenne.