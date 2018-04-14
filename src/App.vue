<script>
  import api from '@/utils/api';
  
  export default {
    async onShow(options) {
      console.log('scene');
      console.log('scene: ', options.scene, await api.getAuth(true));
    },
  };
</script>
<style>
  page {
    background-color: #F0F2F5;
  }
</style>
