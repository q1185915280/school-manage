/**
 * 基础菜单 教案管理
 */
<template>
  <div>
    <div class="info-box">
      <div class="title">全部实验</div>
      <div class="info-a-list">
        <span>水工安全(2)</span>
        <span>水工安全(2)</span>
        <span>水工安全(2)</span>
        <span>水工安全(2)</span>
        <span>水工安全(2)</span>
        <span>水工安全(2)</span>
        <span>水工安全(2)</span>
      </div>
    </div>
    <div class="margin-b20">
      <el-button size="medium" type="primary">上传教案</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="Date" width="180"> </el-table-column>
      <el-table-column prop="name" label="Name" width="180"> </el-table-column>
      <el-table-column prop="address" label="Address"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deptList, deptSave, deptDelete } from "../../api/userMG";
import Pagination from "../../components/Pagination";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
  // 注册组件
  components: {
    Pagination,
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {},

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {},
};
</script>

<style scoped>
.info-box {
  border-bottom: 1px solid #999;
  margin-bottom: 20px;
  padding-bottom: 10px;
}
.margin-b20 {
  margin-bottom: 20px;
}
.info-box .title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.info-a-list span {
  font-size: 16px;
  color: #333;
  text-decoration: underline;
  cursor: pointer;
  margin-right: 20px;
}
</style>

 
 