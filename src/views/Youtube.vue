<template>
  <div>
    <h1>{{ comp }}</h1>
    <b-button v-on:click="inc"> increment </b-button>
    <b-button v-on:click="dec"> decrement </b-button>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import Vue from "vue";

export default Vue.extend({
  name: "Youtube",
  data: () => ({}),
  computed: {
    comp() {
      return store.state.count;
    }
  },
  methods: {
    inc() {
      store.commit("increment");
    },
    dec() {
      store.commit("decrement");
    },
  },
});
</script>