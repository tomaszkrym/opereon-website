module.exports = {
  siteName: 'Opereon',
  siteDescription: 'Infrastructure management system',
  siteUrl: 'https://opereon.io',
  icon: {
    favicon: {
      src: 'src/assets/opereon-logo.svg',
      sizes: [16, 32, 96],
    },
    touchicon: {
      src: 'src/assets/opereon-touch-logo.png',
      sizes: [76, 152, 120, 167, 180],
      precomposed: false,
    }
  },
  settings: {
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
        baseDir: './content',
        path: '**/*.md',
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
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
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
      }
    },

    {
      use: '@gridsome/plugin-sitemap',
      options: {
      }
    }

  ]
}
