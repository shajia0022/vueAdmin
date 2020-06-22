<template>
  <div>
    <el-dialog :title="dialogData.title" :visible.sync="dialogData.dialog" class="dialogBar">
      <!--Form表单组件-->
      <el-form ref="form" label-width="80px">
        <div v-for="item in dialogData.formHeader" :key="item.id">
          <!-- 输入框 -->
          <el-form-item v-if="item.type=='input'" :label="item.label">
            <el-input
              v-model="value_input"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
            ></el-input>
          </el-form-item>

          <!-- 文本域 -->
          <el-form-item v-if="item.type=='textarea'" :label="item.label">
            <el-input
              type="textarea"
              v-model="value_textarea"
              :disabled="item.disabled"
              :autosize="{minRows: 3, maxRows: 5}"
              :placeholder="item.placeholder"
            ></el-input>
          </el-form-item>

          <!-- 日期 (2020-05-11) -->
          <el-form-item v-if="item.type=='date'" :label="item.label">
            <el-date-picker
              type="date"
              v-model="value_date"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
            ></el-date-picker>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogData.dialog = false">取 消</el-button>
        <el-button type="primary" @click="confirm(dialogData.type)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "FormBar",
  props: {
    dialogData: {
      type: Object
    }
  },
  data() {
    return {
      value_input: "",
      value_textarea: "",
      value_date: ""
    };
  },
  created() {
    console.log(this.dialogData);
  }
};
</script>

<style scoped>
</style>