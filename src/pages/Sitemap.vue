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
      title: 'Sitemap'
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
    @apply text-xl;

    & ul {
      list-style: disc;
      padding-left: 1.5em;

      & ul {
        list-style: circle;
      }
    }
  }
</style>
