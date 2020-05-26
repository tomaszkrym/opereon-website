<template>
  <div class="pt-2 md:py-2 bg-ui-tertiary">
    <div class="container">
      <div class="flex flex-wrap items-center justify-between -mx-2">

        <div class="flex flex-col items-center px-2 mr-auto sm:flex-row">
          <g-link
            to="/"
            class="flex items-center text-ui-primary"
            title="Home"
          >
            <Logo class="text-ui-primary" />
            <span class="hidden ml-2 text-xl font-black tracking-tighter uppercase md:block">
              {{ meta.siteName }}
            </span>
          </g-link>
        </div>

        <nav v-if="settings.nav.links.length > 0" class="main-nav mt-2 md:mt-0 ml-2 md:ml-8">
          <g-link
            v-for="link in settings.nav.links"
            :key="link.path"
            :to="link.path"
            class="block md:p-1 font-medium nav-link text-ui-typo hover:text-ui-primary"
          >
            {{ link.title }}
          </g-link>
        </nav>

        <div class="flex flex-1">
          <div class="w-full px-2 sm:px-4 max-w-screen-xs">
            <ClientOnly>
              <SearchInput />
            </ClientOnly>
          </div>
          <div class="flex items-center justify-end px-2 sm:px-4">
            <a v-if="settings.web" :href="settings.web" class="ml-3" target="_blank" rel="noopener noreferrer" title="Website" name="Website">
              <GlobeIcon size="1.5x" />
            </a>
            <a v-if="settings.github" :href="settings.github" class="ml-3" target="_blank" rel="noopener noreferrer" title="Github" name="Github">
              <GithubIcon size="1.5x" />
            </a>
            <theme-switcher class="ml-3 sm:ml-8" :theme="theme" @themeChanged="updateTheme" />
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
import Logo from '@/components/Logo';
import { SunIcon, MoonIcon, GithubIcon, GlobeIcon } from "vue-feather-icons";
import SearchInput from "./SearchInput";

const Search = () => import(/* webpackChunkName: "search" */ "@/components/Search").catch(error => console.warn(error));

export default {
  components: {
    SearchInput,
    Search,
    ThemeSwitcher,
    SunIcon,
    MoonIcon,
    GithubIcon,
    GlobeIcon,
    Logo
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
