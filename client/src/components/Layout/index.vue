<template>
  <div class="container">
    <header-custom v-if="title" :title="title" />
    <slot />
    <footer-custom />
  </div>
</template>

<script>
import HeaderCustom from "@components/Layout/Header.vue";
import FooterCustom from "@components/Layout/Footer.vue";
export default {
  props: ["title"],
  components: {
    HeaderCustom,
    FooterCustom,
  },
};
</script>
