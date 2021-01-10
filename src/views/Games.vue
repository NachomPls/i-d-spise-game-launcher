<template>
  <div>
    <b-tabs content-class="mt-3" justified>
      <b-tab pill active v-for="section in sections" :key="section.name">
        <template #title>
          {{ section.name }}
        </template>
        <!-- path als abteilung für mehrere paths -->
        <div
          v-for="overview in getAllGameOverviewsFromSection(section)" :key="overview.path">
          <div v-text="overview.path" />
          <b-row>
            <b-col cols="2" v-for="game in overview.games" :key="game.exePath">
              <!-- dynamically generate games indem man parameter in Games mitgibt -->
              <GameContainer />
            </b-col>
          </b-row>
          <hr />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { Game } from "@/models/game";
import { GameOverview } from "@/models/game-overview";
import { Section } from "@/models/section";
import store from "@/store";
import Vue from "vue";
import GameContainer from "../components/Game.vue";

export default Vue.extend({
  name: "Games",
  components: {
    GameContainer,
  },
  data: () => ({}),
  computed: {
    sections() {
      return store.state.sections;
    },
    gameOverviews() {
      return store.state.gameOverviews;
    },
  },
  methods: {
    // methods to get passed in template
    clickEvent() {
      store.commit("count", 20);
    },
    currGameOverview(section: Section): GameOverview {
      const retGameOverview: GameOverview = {
        path: "test",
        parentSection: section,
        games: [],
      };
      //
      return retGameOverview;
    },

    //helper
    getAllGameOverviewsFromSection(section: Section): GameOverview[] {
      const overviews: GameOverview[] = [];

      section.paths.forEach((p, index) => {
        const game1 = {
          name: "Legend of Korra",
          imgPath: "something",
          exePath: p + "\\something",
        } as Game;
        const game2 = {
          name: "Samorost 2",
          imgPath: "something",
          exePath: p + "\\woanders",
        } as Game;

        overviews.push({
          path: p,
          games: index % 2 === 0 ? [game1, game2] : [game2, game1],
          parentSection: section,
        } as GameOverview);
      });
      return overviews;
    },
  },
});
</script>
