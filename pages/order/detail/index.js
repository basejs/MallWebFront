const App = getApp()

Page({
    data: {
        order: {
            item: {},
        },
    },
    onLoad(option) {
        this.order = App.HttpResource('/order/:id', {id: '@id'})
        this.setData({
            id: option.id
        })
        this.getOrderDetail(this.data.id)
    },
    onShow() {
        
    },
    call() {
      wx.makePhoneCall({
        phoneNumber: '12345678901'
      });
    },
    toSh() {
      const that = this;
      const id = this.data.id;
      App.WxService.showModal({
        title: '提示',
        content: '确认收货？'
      }).then((res) => {
        if(res.confirm) {
          console.log('收货');
          App.HttpService.putOrder(id, {status: 'finished'})
            .then(({ data }) => {
              console.log(data);
              if (data.meta.code == 0) {
                console.log('update');
                that.getOrderDetail(id)
              }
            });
        }
      });
    },
    toPay() {
      const that = this;
      const id = this.data.id;
      // App.WxService.requestPayment({
      //   'timeStamp': '',
      //   'nonceStr': '',
      //   'package': '',
      //   'signType': 'MD5',
      //   'paySign': '',
      // }).then(({ errMsg }) => {
      //   if (errMsg == 'requestPayment:ok')
      //     console.log('支付成功');
      //   }).catch(({ errMsg }) => {
      //     console.log('支付失败', errMsg);
      // })
      App.WxService.showModal({
        title: '提示',
        content: '确认支付？'
      }).then((res) => {
        if (res.confirm) {
          console.log('支付');
          App.HttpService.putOrder(id, { status: 'paid' })
            .then(({ data }) => {
              console.log(data);
              if (data.meta.code == 0) {
                console.log('update');
                that.getOrderDetail(id)
              }
            });
        }
      });
    },
    getOrderDetail(id) {
        // App.HttpService.getOrderDetail(id)
        this.order.getAsync({id: id})
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                this.setData({
                    'order.item': data.data
                })
            }
        })
    },
})