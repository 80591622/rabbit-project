<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <!-- 选中小图标 -->
    <i v-if="checked" class="iconfont icon-checked"></i>
    <!-- 未选中小图标 -->
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 自定义文字 -->
    <span><slot/></span>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // checked 选中状态  true代表选中  false代表未选中
    const checked = ref(false)
    // 实现通过v-model 完成父子之间的选中状态同步
    /*
      1.绑定自定义属性 这个属性叫做modelValue   props
      2.绑定自定义事件 这个事件叫做update:modelValue  emit('update:modelValue')
      3.自定义事件绑定的回调函数中完成了对于自定义属性的赋值修改(这个值就是我们触发自定义事件时传递的实参)
    */
    const changeChecked = () => {
      checked.value = !checked.value
      emit('update:modelValue', checked.value)
    }
    watch(
      () => {
        return props.modelValue
      },
      () => {
        checked.value = props.modelValue
      },
      {
        immediate: true
      }
    )
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
