<template>
  <div class="login-container">
    <el-form class="login-form" autocomplete="off">
      <h3 class="login-title">系统登录</h3>
      <el-form-item>
        <span class="icon">
          <i class="iconfont icon-yonghu"></i>
        </span>
        <el-input type="text" v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item>
        <span class="icon">
          <i class="iconfont icon-suoding"></i>
        </span>
        <el-input
          :type="showPassword ? 'text' : 'password' "
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
        <span class="eye" @click="passwordType">
          <i class="iconfont" :class="showPassword ? 'icon-yanjing' : 'icon-biyan'"></i>
        </span>
      </el-form-item>

      <el-button class="loginBtn" type="primary" @click="login" :loading="loading">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/user";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      showPassword: false,
      form: {
        username: "",
        password: ""
      }
      // checked: false, //记住密码
    };
  },
  created() {},
  methods: {
    passwordType() {
      this.showPassword = !this.showPassword;
    },
    login() {
      if (this.form.username == "" || this.form.password == "") {
        this.$message.error("请输入用户名和密码");
      } else {
        this.loading = true;

        this.$store
          .dispatch("user/login", this.form)
          .then(res => {
            setTimeout(() => {
              this.loading = false;
              this.$message({
                type: "success",
                message: res.msg
              });
              this.$router.push({ path: "/" });
            }, 500);
          })
          .catch(error => {
            this.loading = false;
            this.$message({
              type: "error",
              message: error.msg
            });
          });
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
}
.login-container .login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
}
.login-container .login-title {
  text-align: center;
  line-height: 30px;
  margin-bottom: 40px;
  color: #eee;
  font-size: 26px;
}
.login-container .el-form-item {
  border-radius: 5px;
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  background: rgba(0, 0, 0, 0.1);
}
.login-container .icon {
  float: left;
  height: 50px;
  color: #889aa4;
}
.login-container .icon i {
  margin-left: 15px;
  font-size: 18px;
  vertical-align: -webkit-baseline-middle;
}
.login-container .eye {
  height: 50px;
  color: #889aa4;
  margin-right: 15px;
  cursor: pointer;
  float: right;
}
.login-container .eye i {
  font-size: 18px;
  vertical-align: -webkit-baseline-middle;
}
.login-container .el-input {
  float: left;
  width: 350px;
  height: 50px;
  margin-left: 16px;
  background: transparent;
}
>>> .el-input__inner {
  display: block;
  height: 100%;
  padding: 0;
  border: none;
  color: #fff !important;
  background: transparent;
  letter-spacing: 0.5px;
}
.loginBtn {
  width: 100%;
  margin-bottom: 30px;
  color: #fff;
  background: #1890ff;
}
.loginBtn:hover {
  background-color: #46a6ff;
}
</style>