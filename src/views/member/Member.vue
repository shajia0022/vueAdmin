<template>
  <div class="container">
    <el-table
      :data="dialogData.formData"
      border
      height="900"
      style="width: 100%"
      :row-style="{height:'40px'}"
      :cell-style="{padding:0}"
    >
      <!-- <el-table-column prop="id" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" width="400"></el-table-column>
      <el-table-column prop="date" label="日期" width="180" align="center"></el-table-column>-->

      <el-table-column
        v-for="item in dialogData.formHeader"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
      ></el-table-column>

      <!-- <el-table-column prop="used" label="是否启用" width="100" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.used"></el-switch>
        </template>
      </el-table-column>-->

      <el-table-column label="操作" width="170" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出层 -->
    <FormBar :dialogData="dialogData"></FormBar>
  </div>
</template>

<script>
import FormBar from "@/components/formbar/FormBar";

export default {
  name: "Member",
  data() {
    return {
      dialogData: {
        dialog: false,
        title: "编辑",
        //表头 - 前端定义
        formHeader: [
          {
            type: "input",
            disabled: true,
            label: "序号",
            prop: "id",
            placeholder: "",
            align: "center",
            width: 80
          },
          {
            type: "input",
            disabled: false,
            label: "姓名",
            prop: "name",
            placeholder: "请输入姓名",
            align: "center",
            width: 180
          },
          {
            type: "input",
            disabled: false,
            label: "地址",
            prop: "address",
            placeholder: "请输入地址",
            align: "left",
            width: 300
          },
          {
            type: "textarea",
            disabled: false,
            label: "文案",
            prop: "writing",
            placeholder: "请输入文案",
            align: "left",
            width: 400
          },
          {
            type: "date",
            disabled: false,
            label: "日期",
            prop: "date",
            placeholder: "请选择日期",
            align: "center",
            width: 180
          }
        ],
        //表单数据 - 后台返回
        formData: [
          {
            id: 1,
            name: "管理员1",
            address: "上海市普陀区金沙江路 1518 弄",
            writing: 'balabala~ 1',
            date: "2020-05-07"
          },
          {
            id: 2,
            name: "管理员2",
            address: "上海市普陀区金沙江路 1517 弄",
            writing: 'balabala~ 2',
            date: "2020-05-03"
          },
          {
            id: 3,
            name: "管理员3",
            address: "上海市普陀区金沙江路 1519 弄",
            writing: 'balabala~ 3',
            date: "2020-05-01"
          }
        ]
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogData.dialog = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  components: {
    FormBar
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>