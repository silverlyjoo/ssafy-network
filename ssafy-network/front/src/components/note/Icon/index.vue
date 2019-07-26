<template>
  <div class="icon" :class="[`icon--${name}`, `icon--${size}`, { 'has-align-fix': fixAlign }]">
    <svg class="icon__svg" xmlns="http://www.w3.org/2000/svg" >
      <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="iconPath"></use>
    </svg>
    </div>
</template>

<script>
export default {
  props: {
    name: {type:String,
    required: true},
    size: {
      default: 'normal',
    },
    modifier: {
      default: null,
    },
    fixAlign: {
      default: true,
    },
  },
  computed:{
     iconPath() {
      let icon = require("@/assets/svg/"+this.name+".svg");
      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default;
      }
      return '#'+icon.id;
    },
    className() {
      return 'svg-icon svg-icon--' + this.name;
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 0.8em;
  height: 0.8em;
  margin: 0.3rem;
  top: -.05rem;
  fill: currentColor;
  // &.has-align-fix {
  // 	top: -.1rem;
  // }
  &__svg {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
}
// svg sprite
body > svg,
.icon use > svg,
symbol {
  path,
  rect,
  circle,
  g {
    fill: currentColor;
    stroke: none;
  }
  *[d="M0 0h24v24H0z"] {
    display: none;
  }
}
</style>