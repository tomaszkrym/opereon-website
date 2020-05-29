require("gridsome-plugin-remark-prismjs-all/themes/night-owl.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

import './assets/css/main.css'
import Global from '~/layouts/Global.vue'
import Page from '~/layouts/Page.vue'

import Vuex from 'vuex'
import store from './store'
import VueFuse from 'vue-fuse'
import VueGtag from "vue-gtag";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faClock  } from "@fortawesome/free-regular-svg-icons";
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faSuperpowers } from "@fortawesome/free-brands-svg-icons";

library.add(faClock);
library.add(faLock);
library.add(faSuperpowers);

export default function (Vue, { router, head, appOptions, isClient }) {
  // Set default layout as a global component
  Vue.use(Vuex);
  appOptions.store = new Vuex.Store(store);

  Vue.component('Layout', Global);
  Vue.component('PageLayout', Page);
  Vue.component('font-awesome', FontAwesomeIcon);

  Vue.use(VueFuse)

  if (isClient && process.env.NODE_ENV === 'production') {
    window._analytics = false;
    Vue.use(VueGtag, {
      config: { id: "UA-149427251-1" },
      bootstrap: false
    }, router)
  }

  head.meta.push({
    name: 'keywords',
    content: 'opereon, kodegenix, infrastructure, development, rust'
  })

  head.meta.push({
    name: 'description',
    content: 'Opereon website'
  })

  head.titleTemplate = function (titleChunk) {
    return titleChunk ? `${titleChunk} | Opereon` : 'Opereon'
  }

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: 'og:url',
      name: 'og:url',
      content: process.env.GRIDSOME_BASE_PATH + to.path,
    })
    next()
  })
}
