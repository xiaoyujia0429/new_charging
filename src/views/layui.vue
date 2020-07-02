<template>
  <div id="home">
    <div class="content">
      <flight-form
        ref="childRules"
        :formConfig="formConfig"
        :value="form"
        :rules="rules"
      ></flight-form>
      <flight-table
        v-if="tableData.length != 0"
        :tableData="tableData"
        :columns="columns"
        :pageshow="pageshow"
        :pagesizes="pagesizes"
        @handleDelete="handleDelete"
        @handleSelectionChange="handleSelectionChange"
        @clickTable="clickTable"
        @handleEdit="handleEdit"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="total"
        :layout="layout"
        :pageSize="pageSize"
      ></flight-table>

      <div v-if="tableData.length === 0">
        <flight-null-data></flight-null-data>
      </div>
    </div>
  </div>
</template>
<script>
import flightForm from "@/components/flightForm.vue";
import flightTable from "@/components/flightTable.vue";
import flightNullData from "@/components/flightNulldata.vue";
import jsondata from "assets/json/vue.json";
export default {
  components: {
    flightForm,
    flightTable,
    flightNullData
  },
  data() {
    return {
      //查询form的传参
      formConfig: {
        formItemList: [
          [
            {
              type: "input",
              prop: "WaybillInventory",
              label: "主运单号",
              name1: "WaybillInventory",
              name2: "WaybillInventory2",
              placeholder: "请输入主运单号",
              span: 8
            },
            {
              type: "text",
              name: "largeClass",
              prop: "largeClass",
              label: "大类",
              placeholder: "请输入大类",
              span: 8
            },

            {
              type: "select",
              name: "isDomestic",
              prop: "isDomestic",
              value: "国内",
              label: "国内/国际",
              placeholder: "请输入国内/国际",
              span: 8,
              optList: [
                {
                  value: "",
                  label: ""
                },
                {
                  value: "国内",
                  label: "国内"
                },
                {
                  value: "国际",
                  label: "国际"
                }
              ]
            }
          ],
          [
            {
              type: "text",
              prop: "airport",
              label: "站点",
              name: "airport",
              placeholder: "请输入站点",
              span: 8
            },
            {
              type: "select",
              prop: "importOrExport",
              label: "进出港",
              name: "importOrExport",
              placeholder: "请输入进出港",
              span: 8,
              optList: [
                {
                  value: "",
                  label: ""
                },
                {
                  value: "进港",
                  label: "进港"
                },
                {
                  value: "出港",
                  label: "出港"
                }
              ]
            },
            {
              type: "select",
              prop: "mainOrSubBill",
              name: "mainOrSubBill",
              label: "主分单",
              placeholder: "请输入主分单",
              span: 8,
              optList: [
                {
                  value: "",
                  label: ""
                },
                {
                  value: "主分",
                  label: "主分"
                },
                {
                  value: "主单",
                  label: "主单"
                }
              ]
            }
          ],
          [
            {
              type: "daterange",
              name: "daterange",
              label: "出港时间",
              prop: "daterange",
              dateFormate: "yyyy-MM-dd",
              span: 8
            },
            {
              type: "datetimerange",
              name: "pickerdata",
              label: "选择时间",
              prop: "pickerdata",
              dateFormate: "yyyy-MM-dd HH:mm:ss",
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now() - 8.64e6; //不能选择今天之后的日期
                }
              },
              span: 8
            },
            {
              type: "datetimerange",
              name: "pickerdata",
              label: "出港",
              prop: "pickerdata",
              dateFormate: "yyyy-MM-dd HH:mm:ss",
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() < Date.now() - 8.64e7; //不能选择今天日期之前的日期
                }
              },
              span: 8
            }
          ],
          [
            {
              type: "switch",
              name: "save",
              prop: "save",
              label: "保存",
              span: 8
            },
            {
              type: "radio",
              name: "radio",
              prop: "radio",
              label: "活动类型",
              span: 8,
              optList: ["演唱会", "球赛"]
            },
            {
              type: "Checkbox",
              label: "爱好",
              prop: "Checkbox",
              name: "Checkbox",
              span: 8,
              checkboxs: [
                { label: "羽毛球", value: "badminton" },
                { label: "篮球", value: "basketball" },
                { label: "足球", value: "football" },
                { label: "兵乓球", value: "pong" }
              ]
            }
          ]
        ],

        operate: [
          {
            type: "primary",
            name: "查询",
            handleClick: this.search
          },
          {
            type: "primary",
            name: "重置",
            handleClick: this.add
          }
        ]
      },
      //form的验证规则
      rules: {
        airport: [{ required: true, message: "请输入站点", trigger: "blur" }],
        importOrExport: [
          { required: true, message: "请输入进出港", trigger: "blur" }
        ],
        largeClass: [
          { required: true, message: "请输入大类", trigger: "blur" }
        ],
        mainOrSubBill: [
          { required: true, message: "请输入主分单", trigger: "blur" }
        ],
        isDomestic: [
          { required: true, message: "请输入国内/国际", trigger: "blur" }
        ],
        pickerdata: [
          { required: true, message: "请输入时间", trigger: "change" }
        ]
      },
      //form的参数绑定
      form: {
        isDomestic: "国内",
        mainOrSubBill: "主分",
        importOrExport: "进港",
        airport: "",
        largeClass: "",
        Checkbox: [],
        pickerdata: [],
        save: false,
        radio: "",
        WaybillInventory1: "",
        WaybillInventory2: ""
      },
      // table表格中tbody的数据传参
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      //table表格中thead的数据传参
      columns: [
        {
          id: "selection",
          type: "selection",
          label: "",
          fixed: "left",
          width: "55",
          prop: "",
          isShow: true,
          align: "center"
        },
        {
          id: "button",
          type: "button",
          label: "操作",
          fixed: "left",
          width: "200",
          prop: "",
          isShow: true,
          align: "center",
          list: [
            {
              id: "examine",
              name: "查看",
              type: ""
            },
            {
              id: "compile",
              name: "编辑",
              type: "danger"
            }
          ]
        },
        {
          id: "text",
          type: "text",
          label: "跳转",
          fixed: "left",
          width: "120",
          prop: "",
          isShow: true,
          align: "center",
          list: [{ id: "jump", name: "跳转", type: "" }]
        },
        {
          id: "index",
          type: "index",
          label: "序列号",
          fixed: "left",
          width: "120",
          prop: "",
          isShow: true,
          align: "center"
        },
        {
          id: "date",
          type: "",
          label: "日期",
          fixed: "left",
          width: "150",
          prop: "date",
          isShow: true,
          align: "center"
        },
        {
          id: "name",
          type: "",
          label: "姓名",
          fixed: false,
          width: "120",
          prop: "name",
          isShow: true,
          align: "center"
        },
        {
          id: "province",
          type: "",
          label: "省份",
          fixed: false,
          width: "120",
          prop: "province",
          isShow: true,
          align: "center"
        },
        {
          id: "city",
          type: "",
          label: "市区",
          fixed: false,
          width: "120",
          prop: "city",
          isShow: true,
          align: "center"
        },
        {
          id: "address",
          type: "",
          label: "地址",
          fixed: false,
          width: "300",
          prop: "address",
          isShow: true,
          align: "center"
        },
        {
          id: "zip",
          type: "",
          label: "邮编",
          fixed: false,
          width: "120",
          prop: "zip",
          isShow: true,
          align: "center"
        }
      ],
      // 控制分页是否显示隐藏
      pageshow: true,
      //分页的每页显示个数选择器的选项设置
      pagesizes: [1, 2, 3, 4],
      //分页查询后的总条数
      total: 10,
      // 初始化显示的页面
      pageSize: 1,
      //分页的模式，对应的是：总条目数，每页显示条数，上一个，页面，下一个，跳转
      layout: "total,sizes,prev,pager,next,jumper"
    };
  },
  created() {
    this.fun_data();
  },
  methods: {
    // 查询
    search() {
      let flag = this.$refs["childRules"].validateForm();
      if (flag) {
        console.log(this.form);
      }
    },
    // 新增或重置
    add() {
      this.$refs["childRules"].resetFields();
    },
    // 初始化时间格式
    fun_data() {
      this.form.pickerdata[0] = this.StringUtil.fun_date(-1, 2);
      this.form.pickerdata[1] = this.StringUtil.fun_date(0, 2);
    },
    //text的跳转触发
    handleDelete(val) {
      this.$router.push({ path: "/layui2" });
      console.log(val);
    },
    // checkbox的触发接收
    handleSelectionChange(val) {
      console.log(val);
    },
    // 点击tbody的行触发
    clickTable(val) {
      console.log(val);
    },
    //button的触发
    handleEdit(val) {
      console.log(val);
    },
    handleSizeChange(val) {
      console.log(val);
      this.total = 100;
      this.tableData = jsondata.tabledata;
    },
    handleCurrentChange(val) {
      console.log(val);
      this.total = 200;
      this.tableData = jsondata.tabledata2;
    },
    change() {
      console.log(this.form);
    }
  },
  destroyed() {
    // this.$store.dispatch("toggleloading", true);
  }
};
</script>
<style lang="less" scoped>
@import "assets/css/layui.less";
</style>
<style lang="less">
#home {
  .bread-icon {
    background-position: -125px -5px;
  }
}

.active .bread-icon {
  background-position: -105px -5px !important;
}
.el-select.el-select--small {
  width: 100%;
}
.el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange.el-range-editor--small {
  width: 100%;
}
</style>
