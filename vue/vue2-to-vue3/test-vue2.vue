<template>
  <div v-if="state === 'display'" class="display-text">
    <x-ellipsis
      v-if="displayLabel(attrValue)"
      mode="origin"
      :label="displayLabel(attrValue)"
    ></x-ellipsis>
    <div v-else class="display-text-empty">
      -
    </div>
  </div>
  <el-select
    v-else-if="state === 'edit'"
    v-model="attrValue"
    :class="{ 'tag-select': fixSelectConfig.hasOwnProperty('allowCreate') ? fixSelectConfig.allowCreate : false }"
    :clearable="fixSelectConfig.hasOwnProperty('clearable') ? fixSelectConfig.clearable : true"
    :filterable="fixSelectConfig.hasOwnProperty('filterable') ? fixSelectConfig.filterable : false"
    :allow-create="fixSelectConfig.hasOwnProperty('allowCreate') ? fixSelectConfig.allowCreate : false"
    :placeholder="$t(fixSelectConfig.placeholder)"
    :multiple="fixSelectConfig.selectType === 'multiple'"
    :disabled="
      fixSelectConfig.hasOwnProperty('disabled') && parsePseudoCode(fixSelectConfig.disabled)
    "
    :filter-method="handleFilterMethod"
    default-first-option
    @change="change"
  >
    <el-option
      v-for="item in option"
      :key="item.itemValue"
      :label="$t(item.itemLabel)"
      :value="item.itemValue"
    ></el-option>
  </el-select>
</template>

<script>
import { isArray, isBoolean, conditionPseudoCode } from '@common/utils'

export default {
  model: {
    prop: 'value', //  设置v-model取到的值
    event: 'exportAttrValue' //  返回响应的值给父组件
  },
  props: {
    config: {
      type: Object,
      defualt: {}
    },
    isTable: {
      type: Boolean,
      defualt: false
    },
    tableIndex: {
      type: Number,
      defualt: 0
    },
    tableProp: {
      type: String,
      default: ''
    },
    dataCenter: {
      type: Object,
      default: () => {
        return {}
      }
    },
    state: {
      type: String,
      default: 'edit'
    },
    value: null
  },
  data() {
    return {
      fixSelectConfig: {},
      attrValue: null,
      option: []
    }
  },
  computed: {
    displayLabel() {
      return (value) => {
        if (this.fixSelectConfig.selectType === 'multiple' && isArray(value)) {
          let result = []
          this.option.forEach((item) => {
            value.forEach((valueItem) => {
              if (valueItem === item.itemValue) {
                result.push(item.itemLabel)
              }
            })
          })
          return result.join(',')
        } else {
          let result = ''
          this.option.forEach((item) => {
            if (item.itemValue === value) {
              result = item.itemLabel
            }
          })
          return result
        }
      }
    },
    parsePseudoCode() {
      return (condition) => {
        return conditionPseudoCode(
          this.isTable
            ? this.dataCenter.dataController.getFormData()[this.tableProp][this.tableIndex]
            : this.dataCenter.dataController.getFormData(),
          condition
        )
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        if (this.fixSelectConfig.selectType === 'multiple' && !this.value) {
          // 多选
          this.attrValue = []
          this.fixSelectConfig.attrValue = [] // 监听父config的变化并赋值
        } else {
          this.fixSelectConfig.attrValue = val // 监听父config的变化并赋值
          this.attrValue = val
        }
      }
    }
  },
  created() {
    this.fixSelectConfig = this.config
    if (this.value || this.isTable) {
      // 如果有value或者为表格，则赋值为表格
      this.attrValue = this.value || this.fixSelectConfig.defaultValue || ''
    } else if (isBoolean(this.fixSelectConfig.attrValue)) {
      // 如果attrValue存在，则赋值为attrValue
      this.attrValue = this.fixSelectConfig.attrValue
    } else if (this.fixSelectConfig.attrValue) {
      // 如果attrValue存在，则赋值为attrValue
      this.attrValue = this.fixSelectConfig.attrValue
    } else if (this.fixSelectConfig.selectType === 'multiple' && !isArray(this.value)) {
      // 如果为多选，且attrValue不存在，则赋值为默认值或空数组
      this.attrValue = this.fixSelectConfig.defaultValue || []
    } else {
      // 如果为单选，且attrValue不存在，则赋值为默认值
      this.attrValue = this.fixSelectConfig.defaultValue
    }
    this.fixSelectConfig.attrValue = this.attrValue
    this.$emit('exportAttrValue', this.attrValue)
    // 获取option
    this.option = this.fixSelectConfig.listOfValues.sort((val, next) => {
      return val.itemOrder - next.itemOrder
    })
  },
  methods: {
    handleFilterMethod(keyword) {
      // // 创建条目功能
      // if (this.fixSelectConfig?.allowCreate) {
      //   this.change(keyword)
      // }
    },
    change(val) {
      this.fixSelectConfig.attrValue = val
      this.attrValue = val
      this.$emit('exportAttrValue', this.attrValue)
    }
  }
}
</script>

<style scoped lang="scss">
.tag-select {
  :deep(.el-input__suffix){
    display: inline-block;
  }
  :deep(.el-icon-arrow-up) {
    display: none;
  }
}
</style>
