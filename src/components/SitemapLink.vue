<template>
  <div>
    <a :href="page.path">{{ page.title }}</a>
    <ul v-if="page.pages && page.pages.length">
      <li v-for="(p, index) in page.pages" :key="index">
        <sitemap-link :page="p" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'sitemap-link',
    props: {
      page: {
        type: Object,
        required: true,
      },
    }
  }
</script>
