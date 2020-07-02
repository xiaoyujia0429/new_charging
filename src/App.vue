<template>
  <!-- <keep-alive> -->
  <div id="app" v-loading="loading" element-loading-text="拼命加载中">
    <router-view />
  </div>
  <!-- </keep-alive> -->
</template>
<script>
// import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: this.$store.getters.setloading
    };
  },
  created() {},

  computed: {
    ...mapGetters(["setloading"])
  },
  watch: {
    setloading(loading) {
      // 监听mapState中的变量，当数据变化（有值、值改变等），
      // 保证能拿到完整的数据，不至于存在初始化没有数据的问题，然后可以赋给本组件data中的变量
      this.loading = loading;
      console.log(this.loading);
    }
  }
};
</script>

<style lang="less">
// @import "assets/css/base.less";
#app {
  // background: #fff url("./assets/image/content_box_bg.jpg") no-repeat top center;
  min-width: 1190px;
}
</style>
