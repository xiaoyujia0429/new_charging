
import Vue from "vue";
import $ from "jquery";
const StringUtil = {
  //时间前后的转换
  //参数text为计算当前时间的前后几天的数值
  // 参数type为返回的时间类型，1是Y-M-D h:m:s;2是Y-M-D 00:00:00;3是Y-M-D
  fun_date: function(text, type) {
    var olddata = new Date().getTime();
    var newdata = olddata + text * 24 * 60 * 60 * 1000;
    const date = new Date(newdata);
    const dateNumFun = num => (num < 10 ? `0${num}` : num);
    const [Y, M, D, h, m, s] = [
      // es6 解构赋值
      date.getFullYear(),
      dateNumFun(date.getMonth() + 1),
      dateNumFun(date.getDate()),
      dateNumFun(date.getHours()),
      dateNumFun(date.getMinutes()),
      dateNumFun(date.getSeconds())
    ];
    if (type === 1) {
      return `${Y}-${M}-${D} ${h}:${m}:${s}`; // 一定要注意是反引号，否则无效。
    } else if (type === 2) {
      return `${Y}-${M}-${D} 00:00:00`; // 一定要注意是反引号，否则无效。
    } else {
      return `${Y}-${M}-${D}`;
    }
  },
  //侧边栏跟头部的缩进
  getDecorator: function() {
    $(".el-aside").animate(
      {
        width: "0px"
      },
      500
    );
    $(".navtab").animate(
      {
        left: "0px"
      },
      500
    );
    $(".el-header").animate(
      {
        height: "0px"
      },
      500
    );
  }
};
Vue.prototype.StringUtil = StringUtil;

export default {};
