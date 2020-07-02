import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
//兼容ie
import "babel-polyfill";
import promise from "es6-promise";
import * as moment from "@/utils/filter";
import "@/utils/util.js";

Vue.use(ElementUI, {
  size: "small",
  zIndex: 3000
});
Vue.config.productionTip = false;
promise.polyfill();
Object.keys(moment).forEach(key => {
  Vue.filter(key, moment[key]);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
