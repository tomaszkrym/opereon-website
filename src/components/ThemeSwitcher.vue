<template>
  <a href="#" class="text-copy-primary hover:text-gray-600" @click.prevent="toggleTheme" :title="theme.label" v-html="theme.icon" />
</template>

<script>
  export default {
    props: {
      theme: {
        type: Object,
        required: true,
      }
    },
    computed: {
      themes () {
        return this.$store.getters.themes
      }
    },
    methods: {
      toggleTheme() {
        const themes = this.themes
        const theme = this.theme
        const next = (themes.indexOf(theme) + 1) % themes.length
        const newTheme = themes[next]
        this.$emit('themeChanged', newTheme)
      }
    }
  }
</script>

