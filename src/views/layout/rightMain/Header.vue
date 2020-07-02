<template>
  <el-header
    class="header-flex"
    :style="{
      width:
        getCollapseState == false ? 'calc(100% - 200px)' : 'calc(100% - 64px)',
      left: getCollapseState == true ? '64px' : '',
      backgroundColor: '#446B76',
      color: '#fff'
    }"
  >
    <!--左侧导航收缩按钮-->
    <div float="left" @click="isOpen">
      <p multiBtn>
        <i
          :class="{
            'el-icon-s-fold': getCollapseState == false ? true : false,
            'el-icon-s-unfold': getCollapseState == true ? true : false
          }"
        >
        </i>
      </p>
    </div>
    <Crumbs :crumbs="getCrumbs"></Crumbs>
    <!--右侧按钮组-->
    <div float="right">
      <!--个人信息-->
      <el-dropdown trigger="hover" placement="bottom" @command="handleCommand">
        <p class="el-dropdown-link" multiBtn>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </p>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="profile">个人信息</el-dropdown-item>
          <el-dropdown-item command="updatePass">修改密码</el-dropdown-item> -->
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import Crumbs from "./Crumbs";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      getCollapseState: this.$store.getters.newCollapseState,
      getCrumbs: this.$store.getters.newCrumbs
    };
  },
  created() {},
  computed: { ...mapGetters(["newCollapseState", "newCrumbs"]) },
  watch: {
    newCollapseState(val) {
      this.getCollapseState = val;
    },
    newCrumbs(val) {
      // console.log(val, "getCrumbs");
      this.getCrumbs = val;
    }
  },
  methods: {
    isOpen() {
      //判断左侧栏是否展开或收缩
      if (this.getCollapseState == false) {
        this.$store.commit("newherder/setCollapse", true);
        this.$notify({
          title: "成功",
          message: "关闭左侧导航栏",
          type: "success",
          duration: 1000
        });
      } else {
        this.$store.commit("newherder/setCollapse", false);
        this.$notify({
          title: "成功",
          message: "打开左侧导航栏",
          type: "success",
          duration: 1000
        });
      }
    },

    //个人信息按钮
    handleCommand(command) {
      if (command === "profile") {
        this.$router.push({
          path: "/profile"
        });
      } else if (command === "updatePass") {
        this.$router.push({
          path: "/updatePass"
        });
      } else if (command == "logout") {
        this.$router.push({
          path: "/login"
        });
      }
    }
  },
  components: {
    // GlbSetting,
    Crumbs
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

p[multiBtn] {
  width: 38px;
  max-width: 38px;
  height: 38px;
  max-height: 38px;
  font-size: 18px;
  border-radius: 38px;
  margin: 2px;
  cursor: pointer;
  display: inline-flex;
  vertical-align: middle;
}

[multiBtn] i {
  line-height: 38px;
  margin: 0 auto;
}

[multiBtn]:hover {
  box-shadow: 0 0 6px #b3b3b3 inset;
  transition: all 0.5s ease;
}

[rotate] i {
  transform: rotate(90deg);
}

[sColor] {
  color: #67c23a;
  margin-right: 2px;
}

[wColor] {
  color: #e6a23c;
  margin-right: 2px;
}

[float="left"] {
  position: absolute;
  left: 0;
  cursor: pointer;
}

[float="right"] {
  position: absolute;
  right: 20px;
  cursor: pointer;
}

.badge:after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  /*margin-top: 0px;*/
  background-color: #e60000;
  border-radius: 10px;
}
</style>
