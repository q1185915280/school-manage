/**
 * 基础菜单 教师管理
 */
<template>
  <div>
    <el-row>
      <el-col :span="3">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="21">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名">
                <el-input size="small" v-model="formInline.user" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                <el-input size="small" v-model="formInline.user" placeholder="手机号"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="12"> <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">添加</el-button>
                </el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">导出</el-button>
              </el-col>
            </el-row>
          </el-form>

          <el-table
            size="small"
            :data="listData"
            highlight-current-row
            v-loading="loading"
            border
            element-loading-text="拼命加载中"
            style="width: 100%"
          >
            <el-table-column type="index" width="30"> </el-table-column>
            <el-table-column
              sortable
              prop="roleName"
              label="姓名"
              width="150"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="roleNo"
              label="手机号"
              width="140"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="roleNo1"
              label="学院"
              width="150"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="roleNo2"
              label="专业"
              width="150"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="class1"
              label="班级"
              width="120"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="experiment"
              label="实验"
              width="120"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="editTime"
              label="修改时间"
              width="150"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.editTime | timestampToTime }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="300">
              <template slot-scope="scope">
                 <el-button
                  size="mini"
                  type="success"
                  @click="menuAccess(scope.$index, scope.row)"
                  >查看</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteUser(scope.$index, scope.row)"
                  >删除</el-button
                >
               
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deptList, deptSave, deptDelete } from "../../api/userMG";
import Pagination from "../../components/Pagination";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      data: [
        {
          label: "Level one 1",
          children: [
            {
              label: "Level two 1-1",
              children: [
                {
                  label: "Level three 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 2",
          children: [
            {
              label: "Level two 2-1",
              children: [
                {
                  label: "Level three 2-1-1",
                },
              ],
            },
            {
              label: "Level two 2-2",
              children: [
                {
                  label: "Level three 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 3",
          children: [
            {
              label: "Level two 3-1",
              children: [
                {
                  label: "Level three 3-1-1",
                },
              ],
            },
            {
              label: "Level two 3-2",
              children: [
                {
                  label: "Level three 3-2-1",
                },
              ],
            },
          ],
        },
      ],
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
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  // 注册组件
  components: {
    Pagination,
  },

  /*创建完毕*/
  created() {
    this.getdata(this.formInline);
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    onSubmit() {
      console.log("submit!");
    },
    getdata(parameter) {
      // 模拟数据
      let res = {
        code: 0,
        msg: null,
        count: 6,
        data: [
          {
            addUser: "root",
            editUser: "root",
            addTime: 1519182004000,
            editTime: 1520288426000,
            roleId: 1,
            systemNo: "pmd",
            roleNo: "Administrator",
            roleNo1: "郑州学院",
            roleNo2: "计算机",
            class1: "五年级一班",
            experiment: "实验测试55",
            roleName: "超级管理员",
          },
          {
            addUser: "root",
            editUser: "root",
            addTime: 1519182004000,
            editTime: 1520288426000,
            roleId: 1,
            systemNo: "pmd",
            roleNo: "Administrator",
            roleNo1: "郑州学院",
            roleNo2: "计算机",
            class1: "五年级一班",
            experiment: "实验测试55",
            roleName: "超级管理员",
          },
          {
            addUser: "root",
            editUser: "root",
            addTime: 1519182004000,
            editTime: 1520288426000,
            roleId: 1,
            systemNo: "pmd",
            roleNo: "Administrator",
            roleNo1: "郑州学院",
            roleNo2: "计算机",
            class1: "五年级一班",
            experiment: "实验测试55",
            roleName: "超级管理员",
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1521111376000,
            editTime: 1520678191000,
            roleId: 2,
            systemNo: "order",
            roleNo: "admin",
            roleNo1: "北京学院",
            roleNo2: "舞蹈",
            roleName: "公司管理员",
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1521111376000,
            editTime: 1520678191000,
            roleId: 2,
            systemNo: "order",
            roleNo: "admin",
            roleNo1: "北京学院",
            roleNo2: "舞蹈",
            roleName: "公司管理员",
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1521111376000,
            editTime: 1520678191000,
            roleId: 2,
            systemNo: "order",
            roleNo: "admin",
            roleNo1: "北京学院",
            roleNo2: "舞蹈",
            roleName: "公司管理员",
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1520678221000,
            editTime: 1520678221000,
            roleId: 95,
            systemNo: "pm",
            roleNo: "common",
            roleNo1: "南京学院",
            roleNo2: "喜剧",
            roleName: "普通用户",
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1526349853000,
            editTime: 1526349853000,
            roleId: 96,
            systemNo: "1",
            roleNo: "1",
            roleNo1: "南京学院12",
            roleNo2: "喜剧3",
            roleName: "1",
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1526349942000,
            editTime: 1526437443000,
            roleId: 97,
            systemNo: "2",
            roleNo: "2",
            roleNo1: "南京学院18",
            roleNo2: "财经3",
            roleName: "2",
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1526652148000,
            editTime: 1526652148000,
            roleId: 101,
            systemNo: "test",
            roleNo: "demo",
             roleNo1: "深圳学院18",
            roleNo2: "财经334",
            roleName: "演示角色",
          },
        ],
      };
      this.loading = false;
      this.listData = res.data;

      // 模拟数据结束

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // roleList(parameter)
      //   .then(res => {
      //     this.loading = false
      //     if (res.success == false) {
      //       this.$message({
      //         type: 'info',
      //         message: res.msg
      //       })
      //     } else {
      //       this.listData = res.data
      //       // 分页赋值
      //       this.pageparm.currentPage = this.formInline.page
      //       this.pageparm.pageSize = this.formInline.limit
      //       this.pageparm.total = res.count
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.$message.error('获取角色列表失败，请稍后再试！')
      //   })
    },

    // 搜索事件
    search() {
      this.getdata(this.formInline);
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      if (row != undefined && row != "undefined") {
        this.title = "修改";
        this.editForm.roleId = row.roleId;
        this.editForm.systemNo = row.systemNo;
        this.editForm.roleNo = row.roleNo;
        this.editForm.roleName = row.roleName;
      } else {
        this.title = "添加";
        this.editForm.roleId = "";
        this.editForm.systemNo = "";
        this.editForm.roleNo = "";
        this.editForm.roleName = "";
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          roleSave(this.editForm)
            .then((res) => {
              this.editFormVisible = false;
              this.loading = false;
              if (res.success) {
                this.getdata(this.formInline);
                this.$message({
                  type: "success",
                  message: "角色保存成功！",
                });
              } else {
                this.$message({
                  type: "info",
                  message: res.msg,
                });
              }
            })
            .catch((err) => {
              this.editFormVisible = false;
              this.loading = false;
              this.$message.error("角色保存失败，请稍后再试！");
            });
        } else {
          return false;
        }
      });
    },
    // 删除角色
    deleteUser(index, row) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          roleDelete(row.roleId)
            .then((res) => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "角色已删除！",
                });
                this.getdata(this.formInline);
              } else {
                this.$message({
                  type: "info",
                  message: res.msg,
                });
              }
            })
            .catch((err) => {
              this.loading = false;
              this.$message.error("角色删除失败，请稍后再试！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 数据权限
    menuAccess: function (index, row) {
      this.menuAccessshow = true;
      this.saveroleId = row.roleId;
      RoleRightTree(row.roleId)
        .then((res) => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "获取权限成功",
            });
            this.changemenu(res.data.data);
            this.RoleRight = this.changeArr(res.data.data);
          } else {
            this.$message({
              type: "info",
              message: res.data.msg,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("获取权限失败，请稍后再试！");
        });
    },
    // 选中菜单
    changemenu(arr) {
      let change = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id);
        }
      }
      this.checkmenu = change;
    },
    // tree 递归
    changeArr(list) {
      var temptree = [],
        tree = [],
        items = [];
      for (var i in list) {
        if (!temptree[list[i].id]) {
          var trow = {
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: [],
          };
          temptree[list[i].id] = trow;
          items.push(trow);
        }
        if (list[i].uid > 0) {
          temptree[list[i].id]["children"].push({
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: [],
          });
        }
      }

      for (var j in items) {
        if (temptree[items[j].pId]) {
          temptree[items[j].pId]["children"].push(temptree[items[j].id]);
        } else {
          tree.push(temptree[items[j].id]);
        }
      }
      temptree = null;
      items = null;
      return tree;
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        roleId: this.saveroleId,
        moduleIds: "",
      };
      let node = this.$refs.tree.getCheckedNodes();
      let moduleIds = [];
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id);
        }
        parm.moduleIds = JSON.stringify(moduleIds);
      }
      RoleRightSave(parm)
        .then((res) => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "权限保存成功",
            });
            this.menuAccessshow = false;
            this.getdata(this.formInline);
          } else {
            this.$message({
              type: "info",
              message: res.msg,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("权限保存失败，请稍后再试！");
        });
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

 
 