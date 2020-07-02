<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      min-width="1190"
      max-height="300"
      :header-row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      @row-click="clickTable"
    >
      <template v-for="(item, index) of columns">
        <el-table-column
          v-if="item.id === 'text'"
          :key="index"
          :fixed="item.fixed"
          :prop="item.id"
          :label="item.label"
          :align="item.align ? item.align : 'center'"
          :width="item.width"
        >
          <!--if判断的是父组件传的表头是操作的id名-->
          <template slot-scope="scope">
            <el-button
              v-for="item1 in item.list"
              :key="item1.id"
              @click="handleDelete(scope.row, item1.id)"
              type="text"
              size="small"
              >{{ item1.name }}</el-button
            >
            <!--可以自行增加按钮，请改变点击事件的第二个参数，父组件会根据第二个参数判断当前点击的是什么按钮-->
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.id === 'button'"
          :key="index"
          :fixed="item.fixed"
          :prop="item.id"
          :label="item.label"
          :align="item.align ? item.align : 'center'"
          :width="item.width"
        >
          <!--if判断的是父组件传的表头是操作的id名-->
          <template slot-scope="scope">
            <el-button
              v-for="item2 in item.list"
              :key="item2.id"
              @click="handleEdit(scope.row, item2.id)"
              size="mini"
              :type="item2.type"
              >{{ item2.name }}</el-button
            >
            <!--可以自行增加按钮，请改变点击事件的第二个参数，父组件会根据第二个参数判断当前点击的是什么按钮-->
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.index === 'index'"
          :type="item.index"
          :key="index"
          :width="item.width"
        >
        </el-table-column>
        <el-table-column
          v-else
          :label="item.label"
          :key="index"
          :fixed="item.fixed"
          :prop="item.id"
          :align="item.align ? item.align : 'center'"
          :width="item.width"
          :type="item.type"
        >
        </el-table-column>
        <!--可以传align,width和type来控制表格的居中，宽度和类型（比如需要序号，type传index）-->
      </template>
    </el-table>
    <el-pagination
      v-if="pageshow"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      // 表格数据源 默认为空数组
      type: Array,
      default: () => []
    },
    columns: {
      // 表格的字段展示 默认为空数组
      type: Array,
      default: () => []
    },
    pagesizes: {
      type: Array,
      default: () => []
    },
    total: { type: Number, default: 0 },
    pageSize: { type: Number, default: 0 },
    pageshow: { type: Boolean, default: false },
    layout: { type: String }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    // 正常
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", { val: val });
    },
    // 正常
    clickTable(row, column, event) {
      this.$emit("clickTable", { row: row, column: column, event: event });
    },
    // 正常
    handleEdit(index, row) {
      this.$emit("handleEdit", { index: index, row: row });
    },
    // 正常
    handleDelete(index, row) {
      this.$emit("handleDelete", { index: index, row: row });
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      } else if (rowIndex === 1) {
        return "warning-row";
      }
      return "";
    }
  }
};
</script>
<style lang="less">
.el-pagination {
  margin-top: 20px;
}

.warning-row .is-leaf {
  color: #1a68b5;
  background-color: #e3edf7 !important;
}
</style>
