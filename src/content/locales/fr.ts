import { locations, technologies as tech } from '../facts.ts';
import type { PortfolioContent } from '../schema';

export const frenchContent = {
  locale: 'fr',
  metadata: {
    title: 'Guillaume Becker | Responsable d’ingénierie & architecte logiciel',
    description:
      'Responsable d’ingénierie logicielle basé à Séoul. Architecture frontend, management d’équipes, développement de plateformes et contribution technique directe.',
    ogLocale: 'fr_FR',
  },
  hero: {
    discipline: 'Ingénierie logicielle',
    heading: 'Responsable d’ingénierie & architecte logiciel',
    introduction:
      'Je suis ingénieur logiciel basé à Séoul, avec plus de 11 ans d’expérience dans le développement de produits web, la direction d’équipes frontend et l’amélioration des plateformes qui les soutiennent. J’aime particulièrement travailler sur l’architecture et les pratiques d’ingénierie tout en restant impliqué dans le développement.',
    action: 'Découvrir mes projets',
  },
  sections: {
    about: { title: 'À propos', navigationLabel: 'À propos' },
    work: { title: 'Projets sélectionnés', navigationLabel: 'Projets' },
    experience: { title: 'Expérience', navigationLabel: 'Expérience' },
    skills: { title: 'Compétences et expertise', navigationLabel: 'Compétences' },
    education: { title: 'Formation et certification', navigationLabel: 'Formation' },
    contact: { title: 'Me contacter', navigationLabel: 'Contact' },
  },
  about: [
    'Mon parcours couvre le SaaS industriel, l’IoT, l’apprentissage des langues et la fintech. J’ai travaillé sur le développement produit, l’architecture frontend, la direction d’équipes et l’expérience développeur, notamment en modernisant des applications existantes et en créant des fondations communes pour de nouveaux produits.',
    'Je porte une attention particulière à aider les équipes à prendre des décisions techniques pragmatiques, améliorer les méthodes de développement et de maintenance, et rester impliqué dans la réalisation. Plus récemment, j’ai aussi exploré Python, FastAPI et des usages concrets de l’IA.',
  ],
  contact:
    'Pour échanger sur la direction d’équipes d’ingénierie, l’architecture frontend ou des projets logiciels, vous pouvez me contacter sur LinkedIn.',
  links: { linkedin: 'LinkedIn', github: 'GitHub' },
  experienceDetails: { show: 'Voir les détails', hide: 'Masquer les détails', forCompany: 'pour' },
  ui: {
    skipLink: 'Aller au contenu',
    mainNavigation: 'Navigation principale',
    themeGroup: 'Choix du thème',
    themeLabels: {
      system: 'Utiliser le thème du système',
      light: 'Utiliser le thème clair',
      dark: 'Utiliser le thème sombre',
    },
    backToTop: 'Retour en haut',
    sourceCode: 'Code source',
    portraitAlt: 'Portrait de Guillaume Becker',
    languageNavigation: 'Langue',
    languageLabels: { en: 'Lire en anglais', fr: 'Lire en français' },
  },
  dateSeparator: 'à',
  earlierExperienceLabel: 'Premières expériences',
  locationLabels: {
    [locations.seoul]: 'Séoul, Corée du Sud',
    [locations.france]: 'France',
    [locations.toulouseParis]: 'Toulouse/Paris, France',
  },
  selectedWork: [
    {
      id: 'modernization',
      employerId: 'glassdome',
      title: 'Moderniser un frontend sans interrompre les livraisons',
      context: 'Architecture frontend',
      summary:
        'Piloté la migration d’une application React existante vers une plateforme frontend modulaire sous Next.js. La migration permettait la coexistence des anciennes et des nouvelles pages, afin d’améliorer l’architecture tout en poursuivant le développement produit.',
    },
    {
      id: 'foundations',
      employerId: 'glassdome',
      title: 'Créer des fondations frontend réutilisables',
      context: 'Logiciels industriels',
      summary:
        'Mis en place une plateforme frontend pour les processus de durabilité industrielle, avec des applications d’administration et des applications clientes distinctes partageant des fonctionnalités métier et une infrastructure commune.',
    },
    {
      id: 'practices',
      employerId: 'glassdome',
      title: 'Ancrer les pratiques d’ingénierie dans le travail quotidien',
      context: 'Expérience développeur & direction d’équipe',
      summary:
        'Piloté des travaux visant à faciliter l’adoption des pratiques d’ingénierie grâce à une documentation claire, aux revues de code, aux bases de test et aux contrôles automatisés. L’objectif était d’aider les équipes à prendre des décisions cohérentes sans ralentir les livraisons quotidiennes.',
    },
  ],
  roleTitles: {
    glassdomeHead: 'Responsable de l’ingénierie des applications clientes',
    glassdomeLead: 'Ingénieur logiciel senior / Responsable frontend',
    gofluentLead: 'Responsable du développement frontend',
    awairLead: 'Responsable du développement frontend',
    plutusdsLead: 'Responsable frontend / Chef de produit / Ingénieur logiciel',
    korbitEngineer: 'Ingénieur logiciel',
    earlierEngineer: 'Stages et emplois à temps partiel en développement logiciel',
  },
  experienceCopy: {
    glassdome: {
      summary:
        'Dirigé l’ingénierie frontend tout en contribuant directement à l’architecture, à la modernisation des plateformes et au développement produit. Intervenu sur les applications partagées Next.js/React, les pratiques d’ingénierie, le CI/CD, les tests, la localisation et la collaboration avec les équipes Produit, Design, QA et backend.',
      details: [
        'Dirigé une équipe frontend qui comptait jusqu’à sept ingénieurs à mon arrivée, avec des responsabilités de mentorat, d’orientation technique, de participation au recrutement et de coordination des livraisons.',
        'Évalué les applications frontend existantes et piloté une migration progressive vers un espace de travail modulaire React/Next.js, tout en poursuivant les livraisons produit.',
        'Contribué à la mise en place de fondations communes pour les applications industrielles clientes et d’administration, notamment des modules métier réutilisables et une infrastructure d’authentification et d’API.',
        'Amélioré la documentation d’architecture, les standards de développement, les pratiques de revue, les bases de test et l’automatisation CI/CD en collaboration avec les équipes Produit, Design, QA et backend.',
        'Mis en place une gouvernance frontend reposant sur des décisions d’architecture documentées (ADR), des standards de code, des parcours d’intégration, des processus de revue, des pratiques de livraison et des recommandations d’architecture adoptés dans l’ensemble de l’organisation d’ingénierie.',
        'Exploré des usages de l’IA appliquée par la recherche technique et des preuves de concept, notamment des méthodes de développement assisté par l’IA et l’automatisation d’applications de durabilité industrielle.',
        'Piloté et accompagné des initiatives de sécurité et de conformité dans les cadres SOC 2, ISO 27001 et TISAX.',
      ],
    },
    gofluent: {
      summary:
        'Travaillé sur des applications web et mobiles internes, formulé des recommandations d’architecture frontend et contribué à l’amélioration des processus de livraison et de déploiement.',
      details: [],
    },
    awair: {
      summary:
        'Dirigé l’équipe frontend, créé des fondations de plateforme partagées et accompagné la modernisation des applications, l’automatisation des versions et le développement produit avec les autres équipes.',
      details: [
        'Dirigé l’équipe frontend à travers l’accompagnement des ingénieurs, les pratiques d’ingénierie et la coordination entre équipes.',
        'Conçu des fondations frontend partagées, sous forme d’espaces de travail et de monorepos, pour plusieurs produits.',
        'Contribué à la modernisation des applications clientes vers Next.js et à l’amélioration des processus de livraison et de prévisualisation.',
      ],
    },
    plutusds: {
      summary:
        'Combiné la direction frontend et des responsabilités produit sur des plateformes d’échange de cryptomonnaies et des produits de finance décentralisée (DeFi), des interfaces clientes aux fondations frontend partagées et aux livraisons.',
      details: [
        'Combiné la gestion de produit et la direction frontend pour des plateformes d’échange de cryptomonnaies et des produits DeFi.',
        'Contribué à la réalisation d’interfaces clientes et de fondations frontend réutilisables, ainsi qu’aux processus de livraison et aux outils opérationnels.',
      ],
    },
    korbit: {
      summary:
        'Développé des applications fintech clientes et internes, en intervenant sur le frontend, le backend et l’infrastructure cloud pour une plateforme d’échange de cryptomonnaies et des services associés.',
      details: [
        'Contribué à des services clients et internes pour les échanges, le trading, les transferts de fonds et l’administration.',
        'Travaillé sur le frontend, le backend et l’infrastructure avec React, Ruby on Rails, GraphQL et AWS.',
      ],
    },
    earlier: {
      summary:
        'Travaillé sur des projets web et backend chez Webedia et Yoopies pendant mes études.',
      details: [],
    },
  },
  skillGroups: [
    {
      id: 'leadership',
      title: 'Leadership & architecture',
      items: [
        'Architecture frontend',
        'Management d’équipes d’ingénierie',
        'Direction d’équipe',
        'Stratégie technique',
        'Mentorat',
        'Revues de code',
        'Systèmes de design',
        'Monorepos',
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend & plateformes',
      items: [
        tech.typescript,
        tech.javascript,
        tech.react,
        tech.next,
        tech.redux,
        tech.rtk,
        tech.tailwind,
        tech.storybook,
        tech.chromatic,
      ],
    },
    {
      id: 'quality',
      title: 'Qualité logicielle & livraison',
      items: [
        tech.actions,
        tech.cicd,
        tech.playwright,
        tech.jest,
        tech.testingLibrary,
        'Processus de livraison',
        'Standards d’ingénierie',
        'Supervision',
      ],
    },
    {
      id: 'backend',
      title: 'Backend & IA appliquée',
      note: 'Python, FastAPI et l’intégration de modèles de langage relèvent de travaux pratiques et d’explorations récents.',
      items: [
        tech.node,
        tech.python,
        tech.fastapi,
        'API REST',
        tech.sql,
        'Intégration de modèles de langage',
        'Sorties structurées',
        'Développement assisté par l’IA',
      ],
    },
    {
      id: 'cloud',
      title: 'Cloud & infrastructure',
      items: [tech.aws, tech.cloudflare, tech.docker, tech.vercel, tech.sentry],
    },
  ],
  educationCopy: {
    lca: { title: 'Certification de praticien en analyse du cycle de vie (ACV)' },
    epitech: { title: 'Master en informatique' },
    chungAng: { title: 'Programme d’échange universitaire' },
  },
} as const satisfies PortfolioContent;
