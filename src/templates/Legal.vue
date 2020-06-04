<template>
  <PageLayout :title="title" :subtitle="subtitle">
    <div class="content markdown">
      <VueRemarkContent />
    </div>
  </PageLayout>
</template>

<page-query>
  query Legal ($path: String!) {
    markdownPage: legal (path: $path) {
      title
      path
      date
      date_label
      content
      headings {
        depth
        value
        anchor
      }
    }
  }
</page-query>

<script>
  import moment from "moment"

  export default {
    metaInfo() {
      return {
        title: this.title,
        meta: [
          { property: 'og:title', key: 'og:title', content: this.title },
          { property: 'og:description', key: 'og:description', content: this.subtitle },
        ]
      }
    },
    computed: {
      title () {
        return this.$page.markdownPage.title
      },
      subtitle () {
        return this.dateLabel + ': <b>' + this.date + '</b>'
      },
      dateLabel () {
        return this.$page.markdownPage.date_label
      },
      date () {
        return moment(this.$page.markdownPage.date).format('YYYY-MM-DD')
      }
    }
  }
</script>

