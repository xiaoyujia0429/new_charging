<template>
  <div id="login">
    <el-container>
      <el-header height="" class="login-header">
        <img class="logo" src="../assets/image/chinasouthern.png" alt="" />
      </el-header>
      <el-main>
        <div class="main clearfix">
          <div class="main-title">中国南方航空用户统一认证入口</div>
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            class="demo-ruleForm"
          >
            <el-form-item label="" prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                clearable
              >
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="请输入密码"
                type="password"
                clearable
                @keyup.enter.native="handleLogin"
              >
                <i slot="prefix" class="el-input__icon el-icon-s-goods"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="login-btn"
                @click.stop.prevent="handleLogin"
                >登录</el-button
              >
              <el-button type="text">忘记密码？</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="main-foot">
          <ul>
            <li>集团门户：www.csair.cn</li>
            <li>南航官网：www.csair.com</li>
            <li>南航全国服务热线：95539</li>
            <li>南航微信：CS95539</li>
            <li>粤ICP备05053330号</li>
          </ul>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { setToken } from "@/utils/auth";
export default {
  data() {
    return {
      loginForm: {
        username: "test",
        password: "test"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$store.dispatch("app/toggleloading", false);
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("app/toggleloading", true);
          if (
            this.loginForm.username === "test" &&
            this.loginForm.password === "test"
          ) {
            /*把登录成功的个人信息存入session域中*/
            let profile = new Object();
            profile.username = this.loginForm.username;
            profile.password = this.loginForm.password;

            setToken(JSON.stringify("154954264jun"));
            this.$message({
              type: "success",
              message: "登录成功",
              duration: 2000
            });
            //登录成功 跳转到首页
            this.$router.push({
              path: "/layuihome"
            });
          } else {
            //登录失败继续登录
            this.$message.error("登录失败，用户名或密码错误，请重新登录");
            this.$router.push({
              path: "/login"
            });
          }
          // this.$store
          //   .dispatch("Login", this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: "/index/home" });
          //   })
          //   .catch(() => {
          //     this.$store.dispatch("toggleloading", false);
          //   });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "assets/css/login.less";
</style>
