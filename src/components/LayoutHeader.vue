<template>
  <div class="py-2 border-t-2 bg-ui-tertiary">
    <div class="container">

      <div class="flex flex-col items-center px-2 mr-auto md:px-4 md:flex-row flex-1 -mx-2 md:-mx-4">
        <div class="flex items-center justify-between flex-row w-full md:w-auto">
          <g-link
            to="/"
            class="flex items-center text-ui-primary"
            title="Home"
          >
            <g-image v-if="theme.css ==='theme-dark'" src="../assets/opereon-logo-dark.svg" alt="Opereon" title="Opereon" immediate="true" width="260" height="40" fit="inside"/>
            <g-image v-else src="../assets/opereon-logo-light.svg" alt="Opereon" title="Opereon" immediate="true" width="260" height="40" fit="inside"/>
            <span class="ml-2 text-xl font-black tracking-tighter uppercase block">
              {{ meta.siteName }}
            </span>
          </g-link>
          <div class="block md:hidden">
            <button @click="toggle" class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600">
              <svg class="current-color h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" fill="gray" /></svg>
            </button>
          </div>
        </div>
        <div class="tracking-wide font-bold w-full block flex-grow md:flex md:w-auto items-center mt-8 md:mt-0" :class="opened ? 'block': 'hidden'">
          <div v-if="settings.nav.links.length > 0" class="uppercase md:capitalize mb-4 md:mb-0 mx-4 block md:ml-8">
            <g-link
              v-for="link in settings.nav.links"
              :key="link.path"
              :to="link.path"
              class="block md:p-1 font-medium nav-link text-ui-typo hover:text-ui-primary"
            >
              {{ link.title }}
            </g-link>
          </div>
          <div class="mb-4 md:mb-0 px-2 sm:px-4 max-w-screen-xs flex-1">
            <ClientOnly>
              <Search />
            </ClientOnly>
          </div>
          <div class="flex flex-col md:items-center md:flex-row md:justify-end px-2 sm:px-4">
            <a v-if="settings.web" :href="settings.web" class="mb-4 md:mb-0 md:ml-3" target="_blank" rel="noopener noreferrer" title="Kodegenix" name="Kodegenix">
              <GlobeIcon size="1.5x" />
            </a>
            <a v-if="settings.github" :href="settings.github" class="mb-4 md:mb-0 md:ml-3" target="_blank" rel="noopener noreferrer" title="Github" name="Github">
              <GithubIcon size="1.5x" />
            </a>
            <theme-switcher class="mb-4 md:mb-0 md:ml-8" :theme="theme" @themeChanged="updateTheme" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    settings {
      web
      github
      nav {
        links {
          path
          title
        }
      }
    }
  }
}
</static-query>

<script>
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { SunIcon, MoonIcon, GithubIcon, GlobeIcon } from "vue-feather-icons";

const Search = () => import(/* webpackChunkName: "search" */ "@/components/Search").catch(error => console.warn(error));

export default {
  components: {
    Search,
    ThemeSwitcher,
    SunIcon,
    MoonIcon,
    GithubIcon,
    GlobeIcon
  },
  data() {
    return {
      opened: false,
    }
  },
  computed: {
    meta() {
      return this.$static.metadata;
    },
    settings() {
      return this.meta.settings;
    },
    theme () {
      return this.$store.getters.theme
    }
  },
  methods: {
    updateTheme (theme) {
      this.$store.commit('theme', theme)
    },
    toggle () {
      this.opened = !this.opened
    }
  }
};
</script>

<style lang="scss">
header {
  svg:not(.feather-search) {
    &:hover {
      @apply text-ui-primary;
    }
  }
}

.nav-link {
  &.active {
    @apply text-ui-primary font-bold border-ui-primary;
  }
}
</style>
