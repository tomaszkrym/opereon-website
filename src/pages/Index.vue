<template>
  <Layout>
    <div class="pt-8 md:pt-16">
      <div class="flex flex-col md:flex-row-reverse items-center">
        <div class="flex flex-col items-center mb-2 text-ui-primary">
          <g-image v-if="theme.css ==='theme-dark'" src="../../static/conductor_dark.svg" alt="Opereon" title="Opereon" immediate="true" width="512" height="100" class="conductor" />
          <g-image v-else src="../../static/conductor_light.svg" alt="Opereon" title="Opereon" immediate="true" width="512" height="100" class="conductor" />
        </div>
        <div class="flex flex-col items-center md:items-start md:mr-8">
          <h2 class="text-3xl text-6xl font-black tracking-tighter border-none">
            Opereon
          </h2>
          <div class="content">
            <p class="text-xl font-medium text-justify">
              Opereon is an easy to use and powerful tool for IT automation, designed with <span>power users</span> in mind. It performs most of the difficult heavy lifting, while giving the user absolute control of what exactly happens in the managed infrastructure.
            </p>
            <ul class="text-xl font-medium text-justify">
              <li>No external plugins.</li>
              <li><span>Monolithic</span> and fast executable code with <span>no external dependencies</span>, coded in <a href="https://rust-lang.org" target="_blank" class="text-ui-primary">Rust</a> with love.</li>
              <li><span>One-size-fits-all</span> solution that enables <span>security</span> and <span>performance</span> conscious users to achieve IT automation.</li>
              <li>Community edition available as <span>open source</span> and <span>free</span> of charge, without <span>any limits</span> in functionality.</li>
            </ul>
          </div>
          <div class="flex mt-8">
            <g-link
              to="/docs/"
              class="flex items-center px-6 py-4 text-2xl font-bold leading-none text-white border rounded-lg shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
            >
              Get started
              <ArrowRightCircleIcon class="ml-4" size="1x" />
            </g-link>
          </div>
        </div>
      </div>

      <div class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>

      <div class="flex flex-wrap justify-center -mx-4 mb-8">
        <feature-tile v-for="(f, index) in features" :icon="f.icon" :title="f.title" :desc="f.desc" :icon_style="f.icon_style" :key="index"></feature-tile>
      </div>

      <div class="pt-8 mx-auto mt-8 border-t border-top border-ui-border max-w-screen-sm"></div>
      <div class="w-full">
        <g-image v-if="theme.css ==='theme-dark'" src="../../static/eu-logo-dark.png" alt="eu" title="eu" immediate="true"></g-image>
        <g-image v-else src="../../static/eu-logo-light.png" alt="eu" title="eu" immediate="true"></g-image>
      </div>

    </div>
  </Layout>
</template>

<static-query>
  query {
    features: allFeatures {
      edges {
        node {
          features {
            title
            desc
            icon
            icon_style
          }
        }
      }
    }
  }
</static-query>

<script>
import Logo from '@/components/Logo';
import FeatureTile from '@/components/FeatureTile';
import { ArrowRightCircleIcon } from 'vue-feather-icons';

export default {
  components: {
    Logo,
    FeatureTile,
    ArrowRightCircleIcon
  },
  computed: {
    features () {
      return this.$static.features.edges[0].node.features
    },
    theme () {
      return this.$store.getters.theme
    }
  }
}
</script>

<style lang="scss">
.home-links a {
  margin-right: 1rem;
}
@media (max-width: 767px) {
  .conductor {
    width: 248px;
  }
}
</style>
