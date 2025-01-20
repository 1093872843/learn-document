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

<script setup>
import {
    isArray,
    isBoolean,
    conditionPseudoCode
} from '@common/utils';

    const emits = defineEmits(['exportAttrValue'])
    const value = defineModel({ type: String })
    const props = defineProps({
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
    })
    const data = ref(function () {
        return {
            fixSelectConfig: {},
            attrValue: null,
            option: []
        }
    })
    const fixSelectConfig = ref({})
    const attrValue = ref(null)
    const option = ref([])
    const displayLabel = computed(() => {
        return value => {
            if (fixSelectConfig.value.selectType === 'multiple' && isArray(value)) {
                let result = [];
                option.value.forEach(item => {
                    value.forEach(valueItem => {
                        if (valueItem === item.itemValue) {
                            result.push(item.itemLabel)
                        }
                    })
                })
                return result.join(',')
            } else {
                let result = '';
                option.value.forEach(item => {
                    if (item.itemValue === value) {
                        result = item.itemLabel;
                    }
                })
                return result;
            }
        }
    })
    const parsePseudoCode = computed(() => {
        return condition => {
            return conditionPseudoCode(props.isTable ? props.dataCenter.dataController.getFormData()[props.tableProp][props.tableIndex] : props.dataCenter.dataController.getFormData(), condition)
        }
    })
    watch(() =>
        value, val => {
        if (fixSelectConfig.value.selectType === 'multiple' && !props.value) {
            attrValue.value = [];
            fixSelectConfig.value.attrValue = [];
        } else {
            fixSelectConfig.value.attrValue = val;
            attrValue.value = val;
        }
    })
    const init = () => {
        fixSelectConfig.value = props.config;
        if (props.value || props.isTable) {
            attrValue.value = props.value || fixSelectConfig.value.defaultValue || '';
        } else if (isBoolean(fixSelectConfig.value.attrValue)) {
            attrValue.value = fixSelectConfig.value.attrValue;
        } else if (fixSelectConfig.value.attrValue) {
            attrValue.value = fixSelectConfig.value.attrValue;
        } else if (fixSelectConfig.value.selectType === 'multiple' && !isArray(props.value)) {
            attrValue.value = fixSelectConfig.value.defaultValue || [];
        } else {
            attrValue.value = fixSelectConfig.value.defaultValue;
        }
        fixSelectConfig.value.attrValue = attrValue.value;
        emits('exportAttrValue', attrValue.value)
        option.value = fixSelectConfig.value.listOfValues.sort((val, next) => {
            return val.itemOrder - next.itemOrder;
        })
    }
    init()
    const handleFilterMethod = keyword => {
    }
    const change = val => {
        fixSelectConfig.value.attrValue = val;
        attrValue.value = val;
        emits('exportAttrValue', attrValue.value)
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
