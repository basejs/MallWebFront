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
        this.$router.push({ path: '/pages/auth/index', query: { 'from index page': 'easdsa' } });
      },
    },
  };
</script>
<style lang="scss" scoped>
</style>