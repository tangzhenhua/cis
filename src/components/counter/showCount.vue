<template>
  <h1>你一共点击了{{count}}次</h1>
</template>

<script>

import {mapState} from "vuex"


export default {
  name: 'showCount',
  computed: {
  	...mapState("counter", ["count"])
  },
}
</script>

<style>

</style>
