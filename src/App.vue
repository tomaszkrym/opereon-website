<template>
  <router-view />
</template>

<static-query>
  query {
    metadata {
      siteName
      siteUrl
      siteDescription
      repoInfo {
        sha
        shaShort
        branch
        describe
        committer
        committerEmail
        committerDate
        author
        authorEmail
        authorDate
        commitMessage
      }
    }
  }
</static-query>

<script>
  import { bootstrap } from "vue-gtag";

  export default {
    metaInfo () {
      return {
        bodyAttrs: {
          'class': this.theme.css
        },
        htmlAttrs: {
          lang: 'en'
        },
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', key: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'description', key: 'description', content: this.metadata.siteDescription },
          { name: 'keywords', key: 'keywords', content: 'infrastructure, development, programming, rust, orchestration' },
          { name: 'twitter:card', key: 'twitter:card', content: 'summary' },
          { name: 'twitter:site', key: 'twitter:site', content: '@kodegenix' },
          { property: 'og:type', key: 'og:type', content: 'website' },
          { property: 'og:url', key: 'og:url', content: this.metaPageUrl() },
          { property: 'og:title', key: 'og:title', content: this.titleTemplate(null) },
          { property: 'og:description', key: 'og:description', content: this.metadata.siteDescription },
          { property: 'og:image', key: 'og:image', content: this.metaImageUrl() },
          { property: 'twitter:image', key: 'twitter:image', content: this.metaTwitterImageUrl() },

        ],
        link: [
          { rel: 'mask-icon', href: '/kodegenix-icon-safari.svg', color: '#0088CC' },
        ],
        titleTemplate: (title) => this.titleTemplate(title),
      }
    },
    computed: {
      theme () {
        return this.$store.getters.theme
      },
      metadata () {
        return this.$static.metadata
      },
    },
    methods: {
      metaPageUrl () {
        return new URL(this.$route.path, this.metadata.siteUrl).toString()
      },
      metaImageUrl (image) {
        return new URL(image ? (image.src ? image.src : image) : 'conductor-logo-fb.png', this.metadata.siteUrl).toString()
      },
      metaTwitterImageUrl (image) {
        return new URL(image ? (image.src ? image.src : image) : 'conductor-logo-twitter.png', this.metadata.siteUrl).toString()
      },
      titleTemplate (title) {
        const siteName = this.metadata.siteName;
        const t = typeof(title) === 'string' ? title.trim() : ''
        return t && t !== siteName ? `${t} | ${siteName}` : `${siteName}`
      },
      updateTheme (theme) {
        this.$store.commit('theme', theme)
      },
      async enableAnalytics () {
        if (window._analytics === false) {
          const siteUrl = new URL(this.$static.metadata.siteUrl)
          if (window.location.hostname.endsWith(siteUrl.hostname)) {
            await bootstrap();
          }
          window._analytics = true;
        }
      }
    },
    beforeCreate () {
      if (process.isClient) {
        this.$store.commit('init')
        this.$meta().refresh()
      }
    },
    mounted() {
      if (localStorage.getItem('cookie:accepted')) {
        this.enableAnalytics();
      }
    },
  }
</script>
