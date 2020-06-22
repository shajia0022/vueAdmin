<template>
  <div class="container">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="sidebar" width="auto">
        <!-- logo -->
        <!-- <div class="side-logo">
          <img src="@/assets/svg/vue.svg" alt />
        </div>-->
        <SideBar :collapse="isCollapse" :routes="$router.options.routes[1].children"></SideBar>
      </el-aside>

      <!-- 主内容 -->
      <el-main>
        <div>
          <div class="navbar">
            <div class="fold-container">
              <i
                class="fold"
                :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                @click="toggleSideBar"
              ></i>

              <!-- 面包屑 -->
              <el-breadcrumb id="breadcrumb-container" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item
                  v-for="item in breadcrumbList"
                  :key="item.path"
                  :to="{path: item.path}"
                >{{item.name}}</el-breadcrumb-item>
              </el-breadcrumb>

              <!-- <div id="breadcrumb-container">
                <span>aaaa/</span>
                <span>bbbb/</span>
              </div>-->
            </div>
          </div>

          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import SideBar from "@/components/sidebar/Sidebar";

export default {
  name: "Container",
  data() {
    return {
      isCollapse: false,
      breadcrumbList: []
    };
  },
  components: {
    SideBar: SideBar
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name != '首页').filter(item => item.name);
      this.breadcrumbList = matched;
      console.log(matched);
    }
  }
};
</script>

<style scoped lang="scss">
.container /deep/ {
  $solidBorder: 1px solid #eee;
  $color1: #304156;

  height: 100%;

  .el-container {
    height: 100%;
  }

  .sidebar {
    background-color: $color1;
    overflow: hidden;

    .side-logo {
      display: flex;
      align-items: center;
      padding-top: 10px;
      padding-bottom: 10px;

      img {
        width: 45px;
        margin-left: 20px;
        -webkit-transition: all 0.3s ease-out;
        transition: all 0.3s ease-out;
      }
    }
    &.collapsed .side-logo img {
      width: 24px;
      margin-right: 5px;
    }
  }

  .el-main {
    padding: 0;

    .navbar {
      position: relative;
      height: 50px;
      background: #fff;
      overflow: hidden;
      -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

      .fold-container {
        display: inline-block;
        height: 100%;
        line-height: 46px;
        padding: 0px 15px 0 0;
        -webkit-transition: background 0.3s;
        transition: background 0.3s;
      }
      .fold {
        padding: 0 15px;
        line-height: 50px;
        color: #555;
        font-size: 22px;
        float: left;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.025);
        }
      }
      .fold.active {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }
      #breadcrumb-container {
        height: 100%;
        line-height: 50px;
        margin-left: 15px;
        float: left;
      }
    }
  }
}
</style>