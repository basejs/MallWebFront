<template>
  <div class="container">
    <img :src="img"/>
  </div>
</template>
<script>
  export default {
    onShow() {
      console.log('mounted', this.$store);
    },
  };
</script>
<style lang="scss" scoped>
</style>