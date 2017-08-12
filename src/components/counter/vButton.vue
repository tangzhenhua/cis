<template>
	<input @click="handleClick" type="button" :value="name">
</template>

<script>
export default {
  name: 'vButton',
  props: {
  	name: {
  		type: String,
  		default: "btn"
  	}
  },
  methods: {
  	handleClick() {
  		this.$emit("handleClick")
  	}
  }
}
</script>

<style>

</style>
