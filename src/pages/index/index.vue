<template>
  <div class="container">
    <button @click="goAuth">auth</button>
  </div>
</template>
<script>
  import { tabMixin } from '@/components/mixin';
  
  export default {
    mixins: [tabMixin],
    methods: {
      goAuth() {
        this.$router.push({ path: '/pages/auth/index', query: { hasasdfa: 41242 } });
      },
    },
  };
</script>
<style lang="scss" scoped>
</style>