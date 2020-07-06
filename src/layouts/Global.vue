<template>
  <div class="font-sans antialiased text-ui-typo bg-ui-background min-h-screen flex flex-col" :class="theme.css">
    <header
      ref="header"
      class="sticky top-0 z-10 w-full bg-ui-background border-ui-border"
      @resize="setHeaderHeight"
    >
      <LayoutHeader />
    </header>
    <div class="flex flex-grow flex-col justify-start">

      <div class="container flex justify-center">
        <h2 class="mt-4 text-center">*** This website is still under active development. ***</h2>
      </div>
      <main class="container relative flex-grow flex flex-wrap justify-start flex-1 w-full bg-ui-background">
        <aside
          v-if="hasSidebar"
          class="sidebar"
          :class="{ 'open': sidebarOpen }"
          :style="sidebarStyle"
        >
          <div class="w-full pb-16 bg-ui-background">
            <Sidebar @navigate="sidebarOpen = false" />
          </div>
        </aside>

        <div
          class="w-full pb-16"
          :class="{'pl-0 lg:pl-12 lg:w-3/4': hasSidebar}"
        >
          <slot />
        </div>

      </main>

    </div>

    <div v-if="hasSidebar" class="fixed bottom-0 right-0 z-50 p-8 lg:hidden">
      <button class="p-3 text-white rounded-full shadow-lg bg-ui-primary hover:text-white" @click="sidebarOpen = ! sidebarOpen">
        <XIcon v-if="sidebarOpen" />
        <MenuIcon v-else />
      </button>
    </div>
    <footer class="border-t bg-ui-tertiary border-ui-border">
      <client-only>
        <cookies @accept="app.enableAnalytics()"/>
      </client-only>
      <section class="footer-copyright">
        <div class="footer-copyright container mx-auto flex flex-col lg:flex-row items-center justify-between py-4">
          <div class="flex">
            <span>&copy 2020 Opereon</span>
            <span class="footer-ver px-4" :title="versionInfoExt">({{versionInfo}})</span>
          </div>
          <div class="">
            <g-link to="/privacy-policy/">Privacy Policy</g-link>
            <span class="select-none px-2">|</span><g-link to="/terms/">Terms</g-link>
            <span class="select-none px-2">|</span><g-link to="/sitemap/">Sitemap</g-link>
          </div>
          <g-image src="../assets/kodegenix_logo.svg" alt="eu" title="eu" immediate="true" height="200" width="250" class="mt-1 mb-3 sm:my-0"></g-image>
          <div class="flex px-2 sm:px-0">
            <div class="mr-4 text-xs sm:text-base">site powered by:</div>
            <ul class="flex flex-1 items-center mb-0">
              <li v-for="p in footerProjects" class="mr-4">
                <a :href="p.url" target="_blank"><g-image :src="(theme.css === 'theme-dark' && p.logo_dark) ? p.logo_dark : p.logo" :title="p.name" /></a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  </div>
</template>

<static-query>
query {
  footerTech: allFooterTech {
    edges {
      node {
        projects {
          name
          logo (width: 150, height: 24, fit: inside)
          logo_dark (width: 150, height: 24, fit: inside)
          url
        }
      }
    }
  }
}
</static-query>

<script>
import Sidebar from "@/components/Sidebar";
import LayoutHeader from "@/components/LayoutHeader";
import Cookies from '@/components/Cookies';
import { MenuIcon, XIcon } from 'vue-feather-icons';
import { bootstrap } from 'vue-gtag';
import moment from 'moment';

export default {
  components: {
    Sidebar,
    LayoutHeader,
    MenuIcon,
    XIcon,
    Cookies
  },
  data() {
    return {
      headerHeight: 0,
      sidebarOpen: false,
    }
  },
  watch: {
    sidebarOpen: function(isOpen) {
      document.body.classList.toggle('overflow-hidden', isOpen);
    }
  },
  methods: {
    setHeaderHeight() {
      this.$nextTick(() => {
        this.headerHeight = this.$refs.header.offsetHeight;
      });
    }
  },
  computed: {
    sidebarStyle() {
      return {
        top: this.headerHeight + 'px',
        height: `calc(100vh - ${this.headerHeight}px)`
      }
    },
    hasSidebar() {
      return this.$page && this.$page.allMarkdownPage && this.headerHeight > 0;
    },
    footerProjects () {
      return this.$static.footerTech.edges[0].node.projects
    },
    theme () {
      return this.$store.getters.theme
    },
    versionInfo () {
      return this.app.metadata.repoInfo.describe
    },
    versionInfoExt () {
      if (!this._versionInfoExt) {
        const repoInfo = this.app.metadata.repoInfo
        let ver = ''
        if (repoInfo.branch) {
          ver = repoInfo.branch + ': '
        }
        if (repoInfo.committerDate) {
          ver += 'last update on ' + moment(repoInfo.committerDate).format('dddd, YYYY-MM-DD HH:mm') + ' '
        }
        if (repoInfo.committer) {
          ver += 'by ' + repoInfo.committer + ' '
        }
        this._versionInfoExt = ver.trim()
      }
      return this._versionInfoExt
    }
  },
  mounted() {
    this.setHeaderHeight();
  }
};
</script>

<style lang="scss">
@media (min-width: 1600px) {
  .container {
    max-width: 1600px;
  }
}
header {
  opacity: 0.96;
  @apply border-t-4;
  border-image: linear-gradient(90deg, #5a67d8, #4299E1 60%, #fec503) 5;
}
header, footer {
  img {
    min-width: 40px;
  }
  * {
    transition-property: color, background-color, border-color;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }
  input::-webkit-input-placeholder{
    @apply text-ui-typo opacity-50;
    }
  input:-moz-placeholder {
    @apply text-ui-typo opacity-50;
    }
  .main-nav {
    flex-wrap: nowrap;
  }
  @media (max-width: 767px) {
    .main-nav {
      order: 10;
      min-width: 90%;
      a {
        padding-top: 5px;
        padding-bottom: 10px;
      }
    }
  }
}
button:focus {
  outline: none;
}
input:focus {
  outline: 0;
}
h1,
h2,
h3,
h4 {
  @apply leading-snug font-black mb-4 text-ui-typo;
  &:hover {
    a::before {
      @apply opacity-100;
    }
  }
  a {
    &::before {
      content: "#";
      margin-left: -1em;
      padding-right: 1em;
      @apply text-ui-primary absolute opacity-0 float-left;
    }
  }
}

h1 {
  @apply text-4xl;
}
h2 {
  @apply text-2xl;
}
h3 {
  @apply text-xl;
}
h4 {
  @apply text-lg;
}

a:not(.active):not(.text-ui-primary):not(.text-white) {
  @apply text-ui-typo;
}

p,
ol,
ul,
pre,
strong,
blockquote {
  @apply mb-4 text-base text-ui-typo;
}
.content {
  span {
    @apply text-ui-accent;
  }
  a {
    @apply text-ui-primary;
  }
  a:hover {
    @apply underline;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply -mt-12 pt-20;
  }
  h2 + h3,
  h2 + h2,
  h3 + h3 {
    @apply border-none -mt-20;
  }
  h2,
  h3 {
    @apply border-b border-ui-border pb-1 mb-3;
  }
  ul {
    @apply list-disc;
    ul {
      list-style: circle;
    }
  }
  ol {
    @apply list-decimal;
  }
  ol,
  ul {
    @apply pl-5 py-1;
    li {
      @apply mb-2;
      p {
        @apply mb-0;
      }
      &:last-child {
        @apply mb-0;
      }
    }
  }
}
.content.markdown {
  p {
    text-align: justify;
  }
  a:not(.active):not(.text-ui-primary):not(.text-white) {
    @apply text-ui-primary;
  }
  a:not(.active):not(.text-ui-primary):not(.text-white):hover {
    @apply underline;
  }
  em {
    font-style: normal;
    @apply text-ui-accent;
  }
/*  .gridsome-highlight {
    @apply bg-ui-highlight;
  }*/
  .gridsome-code-title {
    @apply bg-ui-code;
  }
}

blockquote {
  @apply border-l-4 border-ui-border py-2 pl-4;
  p:last-child {
    @apply mb-0;
  }
}

:not(pre) > code[class*="language-"], code {
  @apply text-ui-typo bg-ui-code font-mono border-b border-r border-ui-border text-sm rounded;
}

pre[class*="language-"] {
  @apply max-w-full overflow-x-auto rounded;
  position: relative;

  & + p {
    @apply mt-4;
  }

  & > code[class*="language-"] {
    @apply border-none leading-relaxed;
    background: none;
    .table {
      display: initial;
    }
  }
}

header {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
}

.sidebar {
  @apply fixed bg-ui-background px-4 inset-x-0 bottom-0 w-full border-r border-ui-border overflow-y-auto transition-all z-40;
  transform: translateX(-100%);
  &.open {
    transform: translateX(0);
  }
  @screen lg {
    @apply w-1/4 px-0 bg-transparent top-0 bottom-auto inset-x-auto sticky z-0;
    transform: translateX(0);
  }
}
</style>
