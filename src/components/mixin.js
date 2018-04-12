export const tabMixin = {
  onShow() {
    if (!this.$router.currentRoute.query.byRouter) {
      this.$router.push({
        path: this.$router.currentRoute.path,
        isTab: true,
        query: { hahah: 123 },
      });
    }
  },
};

export const otherMixin = {
};
