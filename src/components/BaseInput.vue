<template lang="html">
  <div class="">
    <label>{{ label }}</label>
    <input type="text" v-on="listeners" @input="updateValue" :value="value" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number],
  },

  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.updateValue,
      }
    }
  },

  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  },


}
</script>

<style lang="css" scoped>
</style>
