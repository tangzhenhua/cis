<template>
  <div>
    <show-count />
    <v-button @handleClick="INCREMENT" name="+" />
    <v-button @handleClick="DECREMENT" name="-" />
    <v-button @handleClick="ASYNC_INCREMENT" name="a_+" />
    <v-button @handleClick="ASYNC_DECREMENT" name="a_-" />
  </div>
</template>

<script>

import showCount from "./showCount.vue"
import vButton from "./vButton.vue"
import {mapMutations, mapActions} from "vuex"
import {INCREMENT, DECREMENT, ASYNC_INCREMENT, ASYNC_DECREMENT} from "./store.js"


export default {
  name: 'counter',
  components: {
    showCount,
    vButton
  },
  methods: {
    ...mapMutations("counter", [INCREMENT, DECREMENT]),
    ...mapActions("counter", [ASYNC_INCREMENT, ASYNC_DECREMENT])
  }
}
</script>

<style>

</style>
