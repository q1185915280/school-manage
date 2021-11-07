/**
 * 基础菜单 教学统计
 */
<template>
  <div>
    <el-row>
      <el-col :span="3">
        <div class="paybox">
          <div class="cavasbox" ref="payEchart"></div>
        </div>
        <div class="paybox">
          <div class="cavasbox" ref="payNumEchart"></div>
        </div>
      </el-col>
      <el-col :span="21">
        <el-container>
          <el-main>
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名">
                    <el-input
                      size="small"
                      v-model="formInline.user"
                      placeholder="姓名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <el-input
                      size="small"
                      v-model="formInline.user"
                      placeholder="手机号"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-button size="small" type="primary" @click="onSubmit"
                    >查询</el-button
                  >

                  <el-button size="small" type="primary" @click="onSubmit"
                    >添加</el-button
                  >

                  <el-button size="small" type="primary" @click="onSubmit"
                    >导出</el-button
                  >
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
              <el-table-column align="center" type="selection" width="60">
              </el-table-column>
              <el-table-column
                sortable
                prop="roleName"
                label="角色名称"
                width="220"
              >
              </el-table-column>
              <el-table-column
                sortable
                prop="roleNo"
                label="角色代码"
                width="200"
              >
              </el-table-column>
              <el-table-column
                sortable
                prop="editTime"
                label="修改时间"
                width="220"
              >
                <template slot-scope="scope">
                  <div>{{ scope.row.editTime | timestampToTime }}</div>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="editUser"
                label="修改人"
                width="220"
              >
              </el-table-column>
              <el-table-column align="center" label="操作" min-width="300">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteUser(scope.$index, scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    size="mini"
                    type="success"
                    @click="menuAccess(scope.$index, scope.row)"
                    >菜单权限</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from "echarts";
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
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: "添加",
      editForm: {
        deptId: "",
        deptName: "",
        deptNo: "",
        token: localStorage.getItem("logintoken"),
      },
      // rules表单验证
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        deptNo: [
          { required: true, message: "请输入部门代码", trigger: "blur" },
        ],
      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        token: localStorage.getItem("logintoken"),
      },
      // 删除部门
      seletedata: {
        ids: "",
        token: localStorage.getItem("logintoken"),
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      machineNo: "",
      type: "day",
      //  销售总笔数
      SCEoption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}月 : {c}",
        },
        legend: {
          data: [
            {
              name: "销售总笔数",
              icon: "rect",
            },
          ],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232",
          },
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1,
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1,
            },
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1,
            },
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999",
            },
          },
        },
        series: [
          {
            name: "销售总笔数",
            type: "bar",
            barGap: 0,
            data: [
              50000, 70000, 80000, 40000, 50000, 30000, 40000, 60000, 50000,
              40000, 60000, 40000,
            ],
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new Chart.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" },
                ]),
              },
              emphasis: {
                color: new Chart.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
          },
        ],
      },
      //  销售总金额
      SUMoption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}月 : {c}",
        },
        legend: {
          data: [
            {
              name: "销售总金额",
              icon: "rect",
            },
          ],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232",
          },
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1,
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1,
            },
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1,
            },
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999",
            },
          },
        },
        series: [
          {
            name: "销售总金额",
            //   type: 'bar',
            type: "line",
            barGap: 0,
            data: [
              50000, 70000, 80000, 40000, 50000, 30000, 40000, 60000, 50000,
              40000, 60000, 40000,
            ],
            barWidth: 10,
            itemStyle: {
              color: "#108ff9",
            },
          },
        ],
      },
      //  总点击量
      Clickoption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}月 : {c}",
        },
        legend: {
          data: [
            {
              name: "总点击量",
              icon: "rect",
            },
          ],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232",
          },
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1,
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1,
            },
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1,
            },
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999",
            },
          },
        },
        series: [
          {
            name: "总点击量",
            type: "bar",
            barGap: 0,
            data: [
              50000, 10000, 80000, 30000, 50000, 60000, 40000, 80000, 50000,
              20000, 60000, 40000,
            ],
            barWidth: 10,
            itemStyle: {
              color: "#48cefd",
            },
          },
        ],
      },
      //  支付方式统计
      payoption: {
        backgroundColor: "#2c343c",
        title: {
          text: "支付方式统计(金额)",
          left: 10,
          top: 5,
          textStyle: {
            fontSize: 12,
            color: "#ccc",
          },
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: "支付方式统计(金额)",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "支付宝" },
              { value: 310, name: "银商二维码" },
              { value: 274, name: "会员" },
              { value: 235, name: "微信支付" },
              { value: 100, name: "Pos通" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
            },
            itemStyle: {
              normal: {
                color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      },
      payNumoption: {
        backgroundColor: "#2c343c",
        title: {
          text: "支付方式统计(笔数)",
          left: 10,
          top: 5,
          textStyle: {
            fontSize: 12,
            color: "#ccc",
          },
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: "支付方式统计(笔数)",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "支付宝" },
              { value: 310, name: "银商二维码" },
              { value: 274, name: "会员" },
              { value: 235, name: "微信支付" },
              { value: 100, name: "Pos通" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
            },
            itemStyle: {
              normal: {
                color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      },
    };
  },
  // 注册组件
  components: {},
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
   created() {
    this.getdata(this.formInline)
  },
  // 挂载结束状态(里面是操作)
  mounted() {
    this.getpayNum();
    this.getpay();
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 支付方式统计
    getpay() {
      this.chart = Chart.init(this.$refs.payEchart);
      this.chart.setOption(this.payoption);
    },
    // 支付方式统计
    getpayNum() {
      this.chart = Chart.init(this.$refs.payNumEchart);
      this.chart.setOption(this.payNumoption);
    },
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
            roleName: "演示角色",
          },
        ],
      };
      this.loading = false;
      this.listData = res.data;
      // 分页赋值
      this.pageparm.currentPage = this.formInline.page;
      this.pageparm.pageSize = this.formInline.limit;
      this.pageparm.total = res.count;
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
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.getdata(this.formInline);
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
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == "edit") {
        this.editFormVisible = false;
      } else if (dialog == "perm") {
        this.menuAccessshow = false;
      }
    },
  },
};
</script>

<style scoped>
.stbox {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.stbgc {
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  padding: 0px 16px;
}
.stsearch {
  text-align: center;
}
.text-c {
  text-align: center;
}
.st-gbox {
  background-color: #fff;
  margin-top: 20px;
  border-radius: 5px;
  height: 30vh;
  box-sizing: border-box;
  padding: 10px;
}
.cavasbox {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.paybox {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 20px;
  height: 32vh;
}
</style>

 
 