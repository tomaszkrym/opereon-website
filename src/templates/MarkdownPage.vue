<template>
  <Layout>
      <div class="flex flex-wrap items-start justify-start">
        <div class="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky" style="top: 4rem">
          <client-only>
            <OnThisPage />
          </client-only>
        </div>

        <div class="order-1 w-full md:w-2/3">
          <div class="content markdown" v-html="$page.markdownPage.content" />
          <div class="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-ui-border">
            <NextPrevLinks />
          </div>
        </div>

      </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  markdownPage(id: $id) {
    id
    title
    description
    path
    content
    sidebar
    next
    prev
    headings {
      depth
      value
      anchor
    }
  }
  allMarkdownPage{
    edges {
      node {
        path
        title
      }
    }
  }
}
</page-query>

<script>
import OnThisPage from '@/components/OnThisPage.vue';
import NextPrevLinks from '@/components/NextPrevLinks.vue';
const Clipboard = require('clipboard/dist/clipboard.min.js');

export default {
  metaInfo() {
    return {
      title: this.$page.markdownPage.title,
      meta: [
      { property: 'og:title', key: 'og:title', content: this.$page.markdownPage.title },
      { property: 'og:description', key: 'og:description', content: this.$page.markdownPage.description },
    ],

  }
  },
  components: {
    OnThisPage,
    NextPrevLinks
  },
  mounted() {
    this.createBtn();
  },
  updated() {
    this.createBtn();
  },
  methods: {
    createBtn () {
      const pres = document.getElementsByTagName("pre");
      if (pres !== null ) {
        for (let i = 0; i < pres.length; i++) {
          // check if its a pre tag with a prism class
          if (this.isPrismClass(pres[i])) {
            // insert code and copy element
            pres[i].innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" class="svg-inline--fa fa-copy fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">
            <path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path>
            </svg>${pres[i].innerHTML}`
          }
        }
      }
      new Clipboard('.fa-copy', {
        target: (trigger) => {
          return trigger.nextElementSibling;
        }
      });
    },
    isPrismClass (preTag) {
      return preTag.className.substring(0, 8) === 'language'
    }
  }
}
</script>

<style lang="scss">
  pre {
    svg {
      cursor: pointer;
      position: absolute;
      right: 0;
      margin: 5px;
      fill: #33a0d6;
    }
    svg:hover{
      fill: #fec503;
    }
  }
</style>
