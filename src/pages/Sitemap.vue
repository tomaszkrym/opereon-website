<template>
  <PageLayout title="Sitemap">
    <div v-if="sitemap" class="sitemap">
      <sitemap-link :page="sitemap"/>
    </div>
  </PageLayout>
</template>

<script>
  import SitemapLink from '../components/SitemapLink'

  export default {
    metaInfo: {
      title: 'Sitemap',
      meta: [
        { property: 'og:title', key: 'og:title', content: 'Sitemap' },
        { property: 'og:description', key: 'og:description', content: 'Opereon website sitemap' },
      ]
    },
    components: {
      SitemapLink,
    },
    data () {
      return {
        sitemap: null,
        error: false,
      }
    },
    async created () {
      if (!process.isClient) {
        return
      }
      try {
        const res = await fetch('/sitemap.json')
        const sitemap = await res.json()
        this.sitemap = sitemap
      }
      catch (err) {
        this.error = true
      }
    }
  }
</script>

<style lang="scss">
  .sitemap {
    * {
      @apply text-xl;
    }

    a:not(.active):not(.text-ui-primary):not(.text-white) {
      @apply text-ui-primary;
    }
    a:not(.active):not(.text-ui-primary):not(.text-white):hover {
      @apply underline;
    }

    & ul {
      list-style: disc;
      padding-left: 1.5em;

      & ul {
        list-style: circle;
      }
    }
  }
</style>
