<template>
  <div style="height: 100%">
    <!--logo栏位-->
    <div
      class="avatar avatar-flex"
      :style="{ width: getCollapseState == false ? '200px' : '64px' }"
    >
      <div>
        <a href="javascript:;">
          <img
            :src="require('@/assets' + nav.LOGO.img)"
            alt=""
            :style="{ width: '50px', height: '50px' }"
          />
          <span>{{ nav.LOGO.title }}</span>
        </a>
      </div>
    </div>
    <el-menu
      :default-active="String(activeNav)"
      class="el-menu-vertical"
      :collapse="getCollapseState"
      background-color="#446B76"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
      :default-openeds="defaultOpen"
      ref="menu"
      router
    >
      <!--动态生成sideItem-->
      <template v-for="(item, parentIndex) in nav.nav">
        <SideNav
          :item="item"
          :key="parentIndex"
          :index="parentIndex"
          :state="getCollapseState"
        ></SideNav>
      </template>
    </el-menu>
  </div>
</template>

<script>
import SideNav from "./SideNav";
import { mapGetters } from "vuex";
// import style from "@/assets/css/public.css";

export default {
  name: "Aside",
  data() {
    return {
      getCollapseState: this.$store.getters.newCollapseState,
      nav: {
        LOGO: {
          id: "1",
          img: "/image/user_icon.jpg",
          title: "货运内部门户管理"
        },
        nav: [
          {
            icon: "el-icon-s-platform",
            title: "控制台",
            child: [
              { path: "/layui", title: "主控制台" },
              { path: "/layui2", title: "个人档案" }
            ]
          },
          {
            icon: "el-icon-setting",
            title: "基础设置",
            child: [
              { path: "/layui3", title: "设置导航" },
              { path: "/layui4", title: "设置个人信息" },
              { path: "/layui5", title: "修改密码" }
            ]
          },

          {
            icon: "el-icon-setting",
            title: "进港1",
            child: [
              { path: "/layui6", title: "layui6layui6" },
              { path: "/layui7", title: "layui7layui7" }
              // { title: "helly", path: "/helly" },
              // { title: "helll", path: "/helll" },
              // {
              //   title: "hello",
              //   path: "/hello"
              // }
            ]
          },
          {
            icon: "el-icon-setting",
            title: "hellyhelly",
            path: "/helly"
          },
          {
            icon: "el-icon-setting",
            title: "helllhelll",
            path: "/helll"
          },
          {
            icon: "el-icon-setting",
            title: "hellohello",
            path: "/hello"
          }
        ]
      }, //左侧导航数据数组
      defaultOpen: ["0"]
    };
  },
  computed: {
    activeNav() {
      //当前激活的导航
      return this.$route.path;
    },
    /*
     * 在VUEX中获得asideColor颜色值
     * */
    ...mapGetters(["newCollapseState"])
  },
  watch: {
    newCollapseState(val) {
      this.getCollapseState = val;
      // console.log(val);
    }
  },
  created() {
    this.$store.dispatch("newherder/setNavs", {
      nav: [
        {
          icon: "el-icon-s-platform",
          title: "控制台",
          child: [
            { path: "/layui", title: "主控制台" },
            { path: "/layui2", title: "个人档案" }
          ]
        },
        {
          icon: "el-icon-setting",
          title: "基础设置",
          child: [
            { path: "/layui3", title: "设置导航" },
            { path: "/layui4", title: "设置个人信息" },
            { path: "/layui5", title: "修改密码" }
          ]
        },

        {
          icon: "el-icon-setting",
          title: "进港1",
          child: [
            { path: "/layui6", title: "layui6layui6" },
            { path: "/layui7", title: "layui7layui7" }
            // { title: "helly", path: "/helly" },
            // { title: "helll", path: "/helll" },
            // {
            //   title: "hello",
            //   path: "/hello"
            // }
          ]
        },
        {
          icon: "el-icon-setting",
          title: "hellyhelly",
          path: "/helly"
        },
        {
          icon: "el-icon-setting",
          title: "helllhelll",
          path: "/helll"
        },
        {
          icon: "el-icon-setting",
          title: "hellohello",
          path: "/hello"
        }
      ]
    });
  },
  components: {
    SideNav
  }
};
</script>

<style lang="less" scoped>
@import "assets/css/public.less";
.el-menu-vertical:not(.el-menu--collapse) {
  padding-top: 60px;
  width: 200px;
  min-height: 400px;
  height: calc(100% - 60px);
}
/deep/.el-menu-item,
.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
  position: relative;
  -webkit-box-sizing: border-box;
  white-space: nowrap;
  list-style: none;
}
.aside-show {
  width: 200px;
  max-width: 200px;
  min-height: 400px;
  height: 100%;
}

.aside-hide {
  width: 64px;
  max-width: 64px;
  min-height: 400px;
  height: 100%;
}

.el-menu--collapse {
  height: 100%;
  margin-top: 60px;
}

.el-submenu [class^="fa"] {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 16px;
}
</style>
