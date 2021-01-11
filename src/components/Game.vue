<template>
  <b-col>
    <b-img v-bind="mainProps" rounded alt="image"></b-img>
    <div class="text-wrap game-name">
      {{ this.gameData.name }}
    </div>
    <b-button v-on:click="executeFile()">Play</b-button>
  </b-col>
</template>

<script lang="ts">
import store from "@/store";
import Vue from "vue";
import { ipcRenderer } from "electron"
import { Game } from "@/models/game";

export default Vue.extend({
  name: "GameContainer",
  props: ['gameData'],
  data: () => ({
    mainProps: {
      blank: true,
      blankColor: "#F0F",
      width: 120,
      height: 170,
      class: "m1"
    },

  }),
  methods: {
    // methods to get passed in template
    clickEvent() {
      store.commit("count", 20);
    },
    executeFile() {
      ipcRenderer.send('execute-event', this.gameData.exePath)
    },
  },
});
</script>

<style scoped>
button {
  width: 120px;
}

.game-name {
  max-width: 120px;
  max-height: 70px;
  font-size: 15px;
}
</style>