<template>
  <div class="py-2 border-t-2 border-ui-primary">
    <div class="container">

      <div class="flex items-center justify-between -mx-2 sm:-mx-4">
        <div class="flex flex-col items-center px-2 mr-auto sm:px-4 sm:flex-row">
          <g-link
            to="/"
            class="flex items-center text-ui-primary"
            title="Home"
          >
            <g-image src="../assets/opereon-logo.svg" alt="Opereon" title="Opereon" immediate="true" width="260" height="40" fit="inside"/>
            <span class="hidden ml-2 text-xl font-black tracking-tighter uppercase sm:block">
              {{ meta.siteName }}
            </span>
          </g-link>

          <div v-if="settings.nav.links.length > 0" class="hidden ml-2 mr-5 sm:block sm:ml-8">
            <g-link
              v-for="link in settings.nav.links"
              :key="link.path"
              :to="link.path"
              class="block p-1 font-medium nav-link text-ui-typo hover:text-ui-primary"
            >
              {{ link.title }}
            </g-link>
          </div>
        </div>

        <div class="px-2 sm:px-4 max-w-screen-xs flex-1">
          <ClientOnly>
            <Search />
          </ClientOnly>
        </div>

        <div class="flex items-center justify-end px-2 sm:px-4">

          <a v-if="settings.web" :href="settings.web" class="hidden ml-3 sm:block" target="_blank" rel="noopener noreferrer" title="Kodegenix" name="Kodegenix">
            <GlobeIcon size="1.5x" />
          </a>

          <a v-if="settings.github" :href="settings.github" class="sm:ml-3" target="_blank" rel="noopener noreferrer" title="Github" name="Github">
            <GithubIcon size="1.5x" />
          </a>

          <theme-switcher class="ml-2 sm:ml-8" :theme="theme" @themeChanged="updateTheme" />

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
