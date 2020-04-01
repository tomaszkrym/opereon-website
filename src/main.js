require("gridsome-plugin-remark-prismjs-all/themes/night-owl.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

import './assets/css/main.css'
import Global from '~/layouts/Global.vue'

import Vuex from 'vuex'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faClock  } from "@fortawesome/free-regular-svg-icons";
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faSuperpowers } from "@fortawesome/free-brands-svg-icons";

library.add(faClock)
library.add(faLock);
library.add(faSuperpowers);

export default function (Vue, { router, head, appOptions, isClient }) {
  // Set default layout as a global component
  Vue.use(Vuex)
  appOptions.store = new Vuex.Store(store)

  Vue.component('Layout', Global)
  Vue.component('font-awesome', FontAwesomeIcon)

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: 'og:url',
      name: 'og:url',
      content: process.env.GRIDSOME_BASE_PATH + to.path,
    })
    next()
  })
}
