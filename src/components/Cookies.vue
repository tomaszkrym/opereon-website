<template>
  <cookie-law theme="custom" button-text="Accept" class="px-4" v-on:accept="$emit('accept')">
    <div slot="message" class="flex flex-wrap">
      <div class="mx-auto">
        <g-image v-if="theme.css ==='theme-dark'" src="../assets/opereon-logo-dark.svg" alt="Opereon" title="Opereon" width="64" height="64"/>
        <g-image v-else src="../assets/opereon-logo-light.svg" alt="Opereon" title="Opereon" width="64" height="64"/>
      </div>
      <div class="mx-auto flex-auto">
        We use <b>cookies</b> and <b>other tracking technologies</b> to improve your browsing experience on our website,
        to analyze our website traffic,<br/>
        and to understand where our visitors are coming from. For further details, please refer to
        our <g-link to="/privacy-policy/">Privacy policy</g-link> and <g-link to="/terms/">Terms</g-link>.<br/>
        By browsing our website, <b>you consent</b> to our use of cookies and other tracking technologies.
      </div>
    </div>
  </cookie-law>
</template>

<script>

  export default {
    name: "Cookies",
    components: {
      CookieLaw: () => import('vue-cookie-law')
    },
    computed: {
      theme () {
        return this.$store.getters.theme
      }
    }
  }
</script>

<style lang="scss">
  /*! purgecss start ignore */
  .Cookie--custom {
    @apply border-t border-ui-border bg-ui-background;

    .Cookie__content {
      width: 100%;
      margin: 16px;
      text-align: center;
    }

    .Cookie__button {
      position: relative;
      width: 60px;
      height: 34.64px;
      background-color: var(--color-ui-primary);
      margin: 17.32px 0;
      color: #fff;
      transition: all 200ms ease;

      &:before, &:after {
        content: "";
        position: absolute;
        width: 0;
        left: 0;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
      }

      &:before {
        bottom: 100%;
        border-bottom: 17.32px solid var(--color-ui-primary);
      }

      &:after {
        top: 100%;
        width: 0;
        border-top: 17.32px solid var(--color-ui-primary);
      }
    }
    .Cookie__button:hover {
      color: #fec503;
      transform: translateY(-0.25rem);
    }
    a:not(.active):not(.text-ui-primary):not(.text-white) {
      @apply text-ui-primary;
    }
    a:not(.active):not(.text-ui-primary):not(.text-white):hover {
      @apply underline;
    }
  }
  /*! purgecss end ignore */
</style>
