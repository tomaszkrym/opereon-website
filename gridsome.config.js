module.exports = {
  siteName: 'Opereon',
  siteDescription: 'Infrastructure management system',
  siteUrl: (process.env.SITE_URL ? process.env.SITE_URL : 'https://opereon.io'),
  icon: {
    favicon: {
      src: 'src/assets/opereon-logo-dark.svg',
      sizes: [16, 32, 96],
    },
    touchicon: {
      src: 'src/assets/opereon-touch-logo.png',
      sizes: [76, 152, 120, 167, 180],
      precomposed: false,
    }
  },
  settings: {
    web: 'https://kodegenix.pl/',
    github: 'https://github.com/opereon/opereon',
    nav: {
      links: [
        { path: '/docs/', title: 'Documentation' }
      ]
    },
    sidebar: [
      {
        name: 'docs',
        sections: [
          {
            title: 'Essentials',
            items: [
              '/docs/',
              '/docs/quickstart/',
              '/docs/overview/',
              '/docs/install/'
            ]
          },
          {
            title: 'Concepts',
            items: [
              '/docs/model/',
              '/docs/opath/',
              '/docs/template/',
              '/docs/procedures/'
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: 'src/content',
        path: 'docs/*.md',
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: [
            'gridsome-plugin-remark-prismjs-all'
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'FooterTech',
        path: 'src/data/footer/footer.yaml',
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Features',
        path: 'src/data/features.yaml',
      }
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Legal',
        baseDir: 'src/content/legal',
        path: '**/*.md',
        route: '/:slug',
        template: 'src/templates/Legal.vue',
      }
    },
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [
            /token$/
          ]
        }
      }
    },

    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      }
    }
  ]
}
