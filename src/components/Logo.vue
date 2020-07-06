<template>
  <div class="logo">
    <g-image v-if="theme.css ==='theme-dark'" src="../assets/opereon-logo-dark.svg" alt="Opereon" title="Opereon" :style="{ width: getWidth + 'px' }"/>
    <g-image v-else src="../assets/opereon-logo-light.svg" alt="Opereon" title="Opereon" :style="{ width: getWidth + 'px' }"/>
  </div>
</template>

<script>
  export default {
    props: {
      width: {
        type: Number,
        default: 40
      }
    },
    computed: {
      getWidth() {
        return this.width;
      },
      theme () {
        return this.$store.getters.theme
      }
    }
  };
</script>
