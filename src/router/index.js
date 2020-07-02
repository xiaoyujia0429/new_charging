import Vue from "vue";
import Router from "vue-router";
import { getToken } from "@/utils/auth";

Vue.use(Router);
// 连续点击路由报错处理方法(vue-router3.1 以上版本會出現)
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const routes = [
  {
    path: "/",
    redirect: "/layuihome"
  },

  {
    path: "/login",
    meta: {
      title: "登录页"
    },
    component: function(resolve) {
      require(["@/views/login.vue"], resolve);
    }
  },

  {
    path: "/layuihome",
    name: "layuihome",
    redirect: "/layui",
    component: function(resolve) {
      require(["@/components/layuihome.vue"], resolve);
    },
    children: [
      {
        //首页
        path: "/helly",
        meta: {
          title: "hellyhelly"
        },
        component: function(resolve) {
          require(["@/views/helly.vue"], resolve);
        }
      },
      {
        //首页
        path: "/helll",
        meta: {
          title: "helllhelll"
        },
        component: function(resolve) {
          require(["@/views/helll.vue"], resolve);
        }
      },
      {
        //首页
        path: "/hello",
        meta: {
          title: "hellohello"
        },
        component: function(resolve) {
          require(["@/views/hello.vue"], resolve);
        }
      },
      {
        //首页
        path: "/layui",
        meta: {
          title: "主控制台"
        },
        component: function(resolve) {
          require(["@/views/layui.vue"], resolve);
        }
      },
      {
        //首页
        path: "/layui2",
        meta: {
          title: "个人档案"
        },
        component: function(resolve) {
          require(["@/views/layui2.vue"], resolve);
        }
      },
      {
        //首页
        path: "/layui3",
        meta: {
          title: "设置导航"
        },
        component: function(resolve) {
          require(["@/views/layui3.vue"], resolve);
        }
      },
      {
        //首页
        path: "/layui4",
        meta: {
          title: "设置个人信息"
        },
        component: function(resolve) {
          require(["@/views/layui4.vue"], resolve);
        }
      },
      {
        //首页
        path: "/layui5",
        meta: {
          title: "修改密码"
        },
        component: function(resolve) {
          require(["@/views/layui5.vue"], resolve);
        }
      },
      {
        //首页
        path: "/layui6",
        meta: {
          title: "layui6layui6"
        },
        component: function(resolve) {
          require(["@/views/layui6.vue"], resolve);
        }
      },
      {
        //首页
        path: "/layui7",
        meta: {
          title: "layui7layui7"
        },
        component: function(resolve) {
          require(["@/views/layui7.vue"], resolve);
        }
      }
    ]
  },
  {
    path: "/404",
    meta: {
      title: "错误页面-404"
    },
    component: function(resolve) {
      require(["@/views/error/NotPath_404.vue"], resolve);
    }
  }
];
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
/*
 * 全局前置路由
 * */
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  console.log(to);
  if (to.matched.length === 0) {
    // console.log(111);
    next("/404");
  }
  //校验是否登录，防止不登录，直接进入其他页面
  if (
    (to.path == "/login" && from.path === "/") ||
    (to.path == "/countcata" && from.path === "/login")
  ) {
    // console.log(222);

    next();
  } else {
    if (getToken() === null || getToken() === undefined) {
      // console.log(getToken());
      next("/login");
    } else {
      // console.log(getToken(), "---------");
      next();
    }
  }
});
export default router;
