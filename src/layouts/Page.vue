<template>
  <Layout>
    <div class="flex flex-wrap items-start justify-start">
      <div v-if="hasPage" class="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky" style="top: 4rem">
        <OnThisPage />
      </div>

      <div class="order-1 w-full" :class="{ 'md:w-2/3': hasPage }">
        <div class="container-inner mx-auto my-16">
          <div v-if="hasTitleSection" class="text-center mb-8">
            <h1 v-if="title" v-html="title" />
            <p v-if="subtitle" v-html="subtitle" class="text-4xl secondary" />
          </div>

          <slot />
        </div>
        <slot name="lower" slot="lower" />
      </div>

    </div>
  </Layout>
</template>

<script>
  import OnThisPage from '@/components/OnThisPage.vue';
  export default {
    components: {
      OnThisPage
    },
    props: {
      title: {
        type: String,
        required: false,
      },
      subtitle: {
        type: String,
        required: false,
      }
    },
    computed: {
      hasTitleSection () {
        return this.title || this.subtitle
      },
      hasPage() {
        return !!this.$page;
      },
    }
  }
</script>

