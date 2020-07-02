<template>
  <div class="resultTips">
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          很抱歉，查询不到相关数据
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.resultTips {
  font-size: 14px;
  padding: 15px;
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
  border: 1px solid transparent;
  border-radius: 4px;
  margin: 20px -20px;
}
</style>
