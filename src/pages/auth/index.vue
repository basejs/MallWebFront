<template>
  <div class="container">
    <button @click="openAuth">开通权限</button>
  </div>
</template>
<script>
  import api from '@/utils/api';
  
  export default {
    methods: {
      openAuth() {
        api.openAuth();
      },
    },
    onShow() {
    },
  };
</script>
<style lang="scss" scoped>
</style>