<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="decrease">-</a>
      <input type="text" readonly :value="num">
      <a href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue-demi'
export default {
  name: 'XtxNumbox',
  // 声明两个props来限制增减按钮的数量
  props: {
    max: {
      type: Number,
      default: 5
    },
    min: {
      type: Number,
      default: 2
    },
    modelValue: {
      type: Number
    }
  },
  setup (props, { emit }) {
    const num = ref(props.min)
    // 数量按钮增加商品数量
    function add () {
      if (num.value === props.max) {
        return false
      }
      num.value++
      // 每次修改number之后，通过调用`emit`方法触发自定义事件把值同步给父组件 （子 -> 父）
      emit('update:modelValue', num.value)
    }
    // 数量按钮减少商品数量
    function decrease () {
      if (num.value === props.min) {
        return false
      }
      num.value--
      // 每次修改number之后，通过调用`emit`方法触发自定义事件把值同步给父组件 （子 -> 父）
      emit('update:modelValue', num.value)
    }
    // 监听props传入值的变化,一旦发生变化就赋值给num
    watch(() => props.modelValue, () => {
      num.value = props.modelValue
    }, {
      immediate: true
    })
    return {
      num,
      add,
      decrease
    }
  }

}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right:1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left:1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
