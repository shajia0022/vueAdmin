<template>
  <div>
    <h2>dashboard</h2>
    <br />
    <h2>获取后端数据name：{{name}}</h2>
    <br />
    <h2>获取后端数据age：{{age}}</h2>
  </div>
</template>

<script>
import { dashboard_get, dashboard_post } from "@/api/dashboard";

export default {
  name: "Dashboard",
  data() {
    return {
      name: null,
      age: null
    };
  },
  created() {
    let data1 = {
      active: "dashboard_get"
    };

    let data2 = {
      active: "dashboard_post",
      age: 19
    };

    // dashboard_get(data1)
    //   .then(res => {
    //     console.log(res);
    //     this.name = res.name;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    dashboard_post(data2)
      .then(res => {
        this.age = res.age;
      })
      .catch(error => {});
  }
};
</script>

<style scoped>
</style>