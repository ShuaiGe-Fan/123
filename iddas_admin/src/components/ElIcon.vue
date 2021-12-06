//components/Icon-svg
<template>
  <span
    :class="iconName"
    :style="`color:${
      colorList.get(color) ? colorList.get(color) : color
    };fontsize:${size}px;margin-left:${left}px;margin-right:${right}px;`"
  ></span>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
export default {
  name: "icon-svg",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: "inherit",
    },
    size: {
      type: Number,
      required: false,
    },
    left: {
      type: Number,
      required: false,
      default: 5,
    },
    right: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  setup(props) {
    let data = reactive({
      colorList: new Map([
        ["danger", "#F56C6C"],
        ["success", "#67C23A"],
        ["primary", "#409eff"],
        ["info", "#909399"],
        ["warning", "#E6A23C"],
      ]),
    });
    const iconName = computed(() => {
      return `iconfont ${props.iconClass}`;
    });
    return {
      ...toRefs(data),
      iconName,
    };
  },
};
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
