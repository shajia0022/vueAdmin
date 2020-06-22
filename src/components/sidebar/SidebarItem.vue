<template>
  <fragment>
    <!-- 如果当前 subroute 不隐藏、有子节点 -->
    <el-submenu
      v-if="!subroute.hidden && subroute.children && subroute.children.length > 0"
      :key="subroute.path"
      :index="genPath(fatherpath, subroute.path)"
    >
      <!-- 创建菜单分组 -->
      <template slot="title">
        <i :class="subroute.icon"></i>
        <span>{{subroute.name}}</span>
      </template>

      <!-- 递归调用自身，直到 subroute 没有子节点 -->
      <SidebarItem
        v-for="(submenu, subidx) in subroute.children"
        :subroute="submenu"
        :fatherpath="genPath(fatherpath, subroute.path)"
        :barIdx="subidx"
        :key="barIdx + '-' + subidx"
      />
    </el-submenu>

    <!-- 当前节点 不隐藏、无子节点 -->
    <el-menu-item
      v-else-if="!subroute.hidden"
      style="font-weight: 400"
      :key="subroute.path"
      :index="genPath(fatherpath, subroute.path)"
    >
      <i :class="subroute.icon"></i>
      <span slot="title">{{subroute.name}}</span>
    </el-menu-item>

    <!-- 无用 -->
    <!-- <el-menu-item
      v-else
      style="font-weight: 400"
      :index="genPath(fatherpath, subroute.path)"
    >{{ subroute.name }}</el-menu-item>-->
  </fragment>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    subroute: {
      type: Object
    },
    barIdx: {
      type: [String, Number]
    },
    fatherpath: {
      type: String
    }
  },
  computed: {
    // 默认激活的路由, 用来激活菜单选中状态
    defaultActive: function() {
      return this.$route.path;
    }
  },
  methods: {
    // 生成侧边栏路由，格式: /a/b/c
    genPath: function() {
      let arr = [...arguments];
      let path = arr
        .map(v => {
          while (v[0] === "/") {
            v = v.substring(1);
          }
          while (v[-1] === "/") {
            v = v.substring(0, v.length);
          }
          return v;
        })
        .join("/");
      path = path[0] === "/" ? path : "/" + path;
      return path;
    },
    handleOpen: function(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose: function(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted: function() {
    // console.log("sidebar routes: ", this.routes);
  }
};
</script>

<style scoped>
.el-menu-item i,
.el-submenu__title i {
  color: #bfcbd9;
}
.el-menu-item.is-active i {
  color: #409eff;
}
</style>