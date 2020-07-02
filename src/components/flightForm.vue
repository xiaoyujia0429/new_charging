<template>
  <div class="sumbit-form">
    <el-form
      :model="value"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <slot name="formItem" />
      <template v-for="(item, index) in formConfig.formItemList">
        <el-row :key="index">
          <template v-for="(i, k) in item">
            <el-col :span="i.span" :key="k">
              <template
                v-if="
                  ['text', 'textarea', 'number', 'email'].indexOf(i.type) !== -1
                "
              >
                <el-form-item :label="i.label" :prop="i.prop ? i.prop : ''">
                  <el-input :type="i.type" v-model="value[i.name]"></el-input>
                </el-form-item>
              </template>
              <template v-if="i.type == 'input'">
                <el-form-item :label="i.label" :prop="i.prop ? i.prop : ''">
                  <el-input
                    class="prefix"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    maxLength="3"
                    v-model="value[i.name]"
                    @keyup.native="changeinput(value[i.name])"
                  ></el-input>
                  <el-input
                    class="suffix"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    maxLength="8"
                    v-model="value[i.name2]"
                  ></el-input>
                </el-form-item>
              </template>
              <template v-if="i.type === 'select'">
                <el-form-item :label="i.label" :prop="i.prop ? i.prop : ''">
                  <el-select v-model="value[i.name]" placeholder="">
                    <el-option
                      v-for="(j, k) in i.optList"
                      :key="k"
                      :label="j.label"
                      :value="j.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
              <template
                v-if="
                  ['datetimerange', 'datetime', 'daterange'].indexOf(i.type) !==
                    -1
                "
              >
                <el-form-item :label="i.label" :prop="i.prop ? i.prop : ''">
                  <el-date-picker
                    v-model="value[i.name]"
                    :type="i.type"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :value-format="i.dateFormate"
                    :picker-options="i.pickerOptions"
                    @change="change"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
              <template v-if="i.type == 'switch'">
                <el-form-item :label="i.label" :prop="i.prop ? i.prop : ''">
                  <el-switch v-model="value[i.name]"></el-switch>
                </el-form-item>
              </template>
              <template v-if="i.type == 'radio'">
                <el-form-item :label="i.label">
                  <el-radio-group v-model="value[i.name]">
                    <el-radio
                      v-for="(j, k) in i.optList"
                      :label="j"
                      :key="k"
                    ></el-radio>
                  </el-radio-group>
                </el-form-item>
              </template>
              <template v-if="i.type === 'Checkbox'">
                <el-checkbox-group v-model="value[i.name]">
                  <el-checkbox
                    v-for="ch in i.checkboxs"
                    :label="ch.value"
                    :key="ch.value"
                    >{{ ch.label }}</el-checkbox
                  >
                </el-checkbox-group>
              </template>
            </el-col>
          </template>
        </el-row>
      </template>

      <div class="searchBtn">
        <el-button-group>
          <el-button
            v-for="(item, index) in formConfig.operate"
            :key="index"
            size="small"
            :type="item.type"
            @click.stop.prevent="item.handleClick"
            >{{ item.name }}
          </el-button>
        </el-button-group>
        <slot name="operate"></slot>
      </div>
    </el-form>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  props: {
    formConfig: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isSearchLock: true
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e7就是不可以选择今天的
      //   }
      // }
    };
  },
  created() {},
  methods: {
    //子组件校验，传递到父组件
    validateForm() {
      // e.preventDefault();
      let flag = null;
      if (this.isSearchLock) {
        this.$refs["ruleForm"].validate(valid => {
          let vm = this;
          if (valid) {
            flag = true;
            vm.isSearchLock = flag;
          } else {
            flag = false;
            vm.isSearchLock = flag;
            this.$message.error("保存信息不完整，请继续填写完整");
            setTimeout(function() {
              vm.isSearchLock = true;
            }, 2000);
          }
        });
        return flag;
      }
    },
    resetFields() {
      this.$refs["ruleForm"].resetFields();
      $(".suffix .el-input__inner").val("");
      $(".prefix .el-input__inner").val("");
    },
    change() {
      this.$emit("change", true);
    },
    changeinput(val) {
      // console.log(val.length);
      if (val.length >= 3) {
        $(".suffix .el-input__inner").focus();
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.el-form-item__content {
  .el-date-editor--datetimerange {
    width: 100%;
  }
}
.searchBtn {
  text-align: center;
  .el-button {
    background-color: #4a91d7;
    width: 96px;
    color: #fff;
    &:first-child {
      margin-right: 5px;
    }
    &:hover {
      background-color: #257ccd;
      border-color: #257ccd;
    }
  }
}
.prefix.el-input.el-input--small {
  width: 30%;
  display: inline-block;
  .el-input__inner {
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
}
.suffix.el-input.el-input--small {
  width: 70%;
  display: inline-block;
  .el-input__inner {
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
  }
}
</style>
