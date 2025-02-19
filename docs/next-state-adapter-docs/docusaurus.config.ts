import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Next State Adapter',
  tagline: 'State Management Adapter for Next.js App Router',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://next-state-adapter.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'elyor-sh', // Usually your GitHub org/user name.
  projectName: 'next-state-adapter', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/elyor-sh/next-state-adapter/docs/next-state-adapter-docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Next State Adapter',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/elyor-sh/next-state-adapter',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/elyor_dev',
            },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/elyor-sh/next-state-adapter',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} next-state-adapter.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    sitemap: {
      changefreq: 'weekly', // Как часто обновляется сайт
      priority: 0.5, // Приоритет ссылок
      filename: 'sitemap.xml', // Название файла
    },
    metadata: [
      { name: 'description', content: 'Powerful state management adapter for Next.js App Router with support for Zustand, MobX, Jotai, and more.' },
      { name: 'keywords', content: 'next.js, app router, state management, zustand, mobx, jotai, react, nextjs state' },
      { name: 'og:title', content: 'Next.js App Router State Management Adapter' },
      { name: 'og:description', content: 'State management adapter for Next.js App Router with support for Zustand, MobX, Jotai, and more.' },
      { name: 'og:image', content: 'https://next-state-adapter.vercel.app/img/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Next.js App Router State Management' },
      { name: 'twitter:description', content: 'State management adapter for Next.js App Router with support for Zustand, MobX, Jotai, and more.' },
      { name: 'twitter:image', content: 'https://next-state-adapter.vercel.app/img/og-image.png' },
      { name: 'application/ld+json', content: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Next State Management Adapter",
          "url": "https://next-state-adapter.vercel.app",
          "description": "Powerful state management adapter for Next.js App Router with support for Zustand, MobX, Jotai, and more.",
          "keywords": "next.js, app router, state management, zustand, mobx, jotai"
        })}
    ]
  } satisfies Preset.ThemeConfig,
};

export default config;
