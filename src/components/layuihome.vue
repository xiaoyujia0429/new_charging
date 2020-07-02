<template>
  <div>
    <el-container>
      <el-aside
        style="width: auto"
        class="aside aside-flex"
        :class="{
          'aside-show': getCollapseState == false ? true : false,
          'aside-hide': getCollapseState == true ? true : false
        }"
      >
        <Aside></Aside>
      </el-aside>
      <el-container
        class="container-aside"
        :style="{ paddingLeft: getCollapseState == false ? '195px' : '60px' }"
      >
        <Header></Header>
        <el-main
          :style="{ paddingTop: '60px', paddingLeft: '0', paddingRight: '0' }"
        >
          <AsideTitle></AsideTitle>
          <!--页面的展示-->
          <transition name="compAnimate" appear>
            <keep-alive>
              <router-view
                :style="{ padding: '0 20px', marginTop: '55px' }"
              ></router-view>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from "@/views/layout/leftAside/Aside";
import Header from "@/views/layout/rightMain/Header";
import AsideTitle from "@/views/layout/rightMain/AsideTitle";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      getCollapseState: this.$store.getters.newCollapseState,
      getNavs: this.$store.getters.newNavs,
      getAsideTitle: this.$store.getters.newAsideTitle,
      getCount: this.$store.getters.newCount
    };
  },
  components: {
    Aside,
    Header,
    AsideTitle
  },
  mounted() {
    this.$store.dispatch("app/toggleloading", false);
  },
  computed: {
    ...mapGetters(["newNavs", "newCollapseState", "newAsideTitle", "newCount"])
  },
  watch: {
    $route: function(to) {
      console.log(to);
      this.createTabs(to.path);
    },
    newNavs(val) {
      this.getNavs = val;
    },
    newCollapseState(val) {
      this.getCollapseState = val;
    },
    newAsideTitle(val) {
      this.getAsideTitle = val;
    },
    newCount(val) {
      this.getCount = val;
    }
  },
  methods: {
    /**
       * 动态添加标题标签函数
       * path：当前点击左侧导航的path
       * 1.首先会处理welcome（首页）页，welcome页已在vuex中初始化了，所以，当用户再次点击时，直接定位到首页即可
       * 2.如果不是首页，则会通过当前导航的path去和左侧导航数据比对，如果path相等存入vuex asideTitle
       * 3.如果vuex的asideTitle已有数据，再次点击时，只定位，不新增
       * 注意：vuex中的count（标题标签的增值变量，可以保证每次添加的标题标签不重复，作用于后面的标题标签定位），count每次进来都需要自增，保证唯一，默认为0
       * vuex中的asideTitle格式：
       * {
            title: '主控制台', // title name
            path: '/welcome',  //title the path
            activeIndex: 0 //default value
          }
       *
       * */
    createTabs(path) {
      if (path !== "/layui") {
        let asideItem = new Object();
        //得到当前点击的左侧导航的名字，存入vuex的header/asideTitle中
        let nav = this.getNavs.nav;
        for (let i = 0; i < nav.length; i++) {
          const parentTitle = nav[i].title;
          //判断是否存在子导航，如果存在则取子导航的名字，如果没有，则取当前的导航名字
          if (nav[i].child) {
            for (let j = 0; j < nav[i].child.length; j++) {
              if (nav[i].child[j].path === path) {
                const childTitle = nav[i].child[j].title;
                //判断vuex中是否已经存在当前标题，如果存在则不处理，否则添加入vuex中
                let result = this.getAsideTitle.filter(item => {
                  return item.title === nav[i].child[j].title;
                });
                if (result.length == 0) {
                  //添加标题标签
                  let count = this.getCount;
                  count++;
                  this.$store.commit("newherder/setCount", count);
                  asideItem.title = nav[i].child[j].title;
                  asideItem.path = nav[i].child[j].path;
                  asideItem.activeIndex = count;
                  this.$store.commit("newherder/setAside", asideItem);
                  this.$store.commit("newherder/setActiveIndex", count);
                  this.setCrumbs(parentTitle, childTitle);
                  return;
                } else {
                  //定位到当前标题标签
                  if (nav[i].child[j].path === path) {
                    let result = this.getAsideTitle.filter(item => {
                      return item.title === nav[i].child[j].title;
                    });
                    this.$store.commit(
                      "newherder/setActiveIndex",
                      result[0].activeIndex
                    );
                    this.setCrumbs(parentTitle, childTitle);
                  }
                }
              }
            }
          } else {
            if (nav[i].path === path) {
              //判断vuex中是否已经存在当前标题，如果存在则不处理，否则添加入vuex中
              let result = this.getAsideTitle.filter(item => {
                return item.title === nav[i].title;
              });
              const childTitle = nav[i].title;
              //添加标题标签
              if (result.length == 0) {
                let count = this.getCount;
                count++;
                this.$store.commit("newherder/setCount", count);
                asideItem.title = nav[i].title;
                asideItem.path = nav[i].path;
                asideItem.activeIndex = count;
                this.$store.commit("newherder/setAside", asideItem);
                this.$store.commit("newherder/setActiveIndex", count);
                this.setCrumbs(childTitle, "");
                return;
              } else {
                //定位到当前标题标签
                if (nav[i].path === path) {
                  let result = this.getAsideTitle.filter(item => {
                    return item.title === nav[i].title;
                  });
                  this.$store.commit(
                    "newherder/setActiveIndex",
                    result[0].activeIndex
                  );
                  this.setCrumbs(childTitle, "");
                }
              }
            }
          }
        }
      } else {
        this.$store.commit("newherder/setActiveIndex", 0);
        this.setCrumbs("控制台", "主控制台");
      }
    },
    setCrumbs(pt, ct) {
      let crumbs = new Array();
      crumbs.push(pt, ct);
      this.$store.commit("newherder/setCrumbs", crumbs);
    }
  }
};
</script>
<style lang="less" scoped>
@import "assets/css/public.less";
.el-main {
  background: #fff !important;
  min-height: calc(100vh - 60px);
}
.el-aside {
  color: #333;
}

.el-tabs--card > .el-tabs__header {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 1000;
  opacity: 1;
  background-color: #ffffff;
  margin: 0;
  padding-right: 20px;
}

.el-row {
  margin-bottom: 15px;
}

/*组件过渡动画*/
.compAnimate-enter {
  opacity: 0;
  transform: translateY(-60px);
}

.compAnimate-leave-to {
  opacity: 0;
}

.compAnimate-enter-active {
  transition: all 0.8s ease-in-out;
}
.compAnimate-leave-active {
  transition: all 0.2s ease;
}
</style>
