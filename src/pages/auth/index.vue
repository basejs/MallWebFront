<template>
  <div class="container">
    <button @click="openAuth">开通权限</button>
    <button @click="goAuth">detail</button>
  </div>
</template>
<script>
  import api from '@/utils/api';
  
  export default {
    methods: {
      openAuth() {
        api.openAuth();
      },
      goAuth() {
        this.$router.push({ path: '/pages/detail/index', query: { 'from auth page': 41242 } });
      },
    },
    onShow() {
    },
  };
</script>
<style lang="scss" scoped>
</style>