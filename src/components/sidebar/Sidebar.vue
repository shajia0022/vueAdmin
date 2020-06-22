<template>
  <div class="sidebar">
    <el-menu
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      :default-active="defaultActive"
      :collapse="collapse"
    >
      <SidebarItem
        v-for="(item, idx) in routes"
        :subroute="item"
        :fatherpath="fatherPath"
        :barIdx="idx"
        :key="idx"
      />
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
export default {
  naem: "Sidebar",
  components: {
    SidebarItem
  },
  props: {
    collapse: {
      type: Boolean
    },
    routes: {
      type: Array
    }
  },
  computed: {
    // 首次进入页面时展开当前页面所属的菜单
    defaultActive() {
      return this.$route.path;
    },
    fatherPath() {
      // 这里直接获取路由配置的 '/' 项
      return this.$router.options.routes[1].path;
    }
  }
};
</script>

<style scoped lang="scss">
$color2: #1f2d3d;
$color3: #17222e;

.el-menu {
  border-right: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 210px;
}
.el-submenu.is-opened .el-submenu__title,
.el-submenu .el-menu-item {
  background-color: $color2 !important;
}
.el-submenu.is-opened .el-submenu__title:hover,
.el-submenu .el-menu-item:hover {
  background-color: $color3 !important;
}
</style>