<template>
  <div class="container">
    <div class="header">
      <div class="header_content">
        <image class="avatarUrl" :src="avatarUrl"></image>
        <p class="nickName cfff">{{nickName}}</p>
      </div>
    </div>
    <button @tap="getUserInfo">点击登录</button>
    <button @tap="exit">点击退出</button>
    <button @click="goCart">购物车</button>
  </div>
</template>
<script>
/* eslint-disable */
  import api from '@/utils/api';
  import { showModal } from '@/utils/tools';
  import { tabMixin } from '@/components/mixin';

  export default {
    mixins: [tabMixin],
    
    data() {
      return {
        avatarUrl: '',
        nickName: '',
        bShowBind: false,
      };
    },
  
    methods: {
      async getUserInfo() {
        await api.login();
        console.log(this.$store.getters['user/getInfo']);
      },
      async exit() {
        await this.$store.dispatch('user/EXIT');
        console.log(this.$store.getters['user/getInfo']);
      },
      goCart() {
        this.$router.push({ path: '/pages/shopping_cart/index', isTab: true });
      },
    },
    onShow() {
    },
    onReady() {
    },
  };
</script>
<style scoped lang="scss">
  .header {
    background: #ff6a3c;
    height: 260rpx;
    width: 100%;
  }
  
  .header_content {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top: 48rpx;
  }
  
  .avatarUrl {
    width: 122rpx;
    height: 122rpx;
    border-radius: 1000px;
  }
  
  .nickName {
    font-size: 30rpx;
    padding-top: 15rpx;
  }
  
  .info_block {
    margin-top: 10rpx;
    .item {
      border-top: 1rpx solid #dbdbdb;
      background: #fff;
      padding: 34rpx 28rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .item:last-child {
      border-bottom: 1rpx solid #dbdbdb;
    }
    .item_content {
      display: flex;
      align-items: center;
      .text {
        margin-left: 20rpx;
        color: #1a1a1a;
      }
    }
    .item_img {
      width: 42rpx;
      height: 42rpx;
    }
    .arrow {
      color: #cccccc;
      font-size: 32rpx;
    }
    .tip {
      color: #999;
      font-size: 24rpx;
      margin-top: 20rpx;
      margin-left: 60rpx;
    }
  }
</style>
