import { GameOverview } from "@/models/game-overview";
import { Section } from "@/models/section";
import Vue from "vue" ;
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { ExeSearcher } from "../utils/exeSearch"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    sections: [] as Section[],
    gameOverviews: [] as GameOverview[]
  },
  mutations: {
    increment: (state) => state.count++,
    decrement: (state) => state.count--,
    count: (state, number) => state.count = number,
    addSection: (state, payload: Section): void => {
      if (state.sections == undefined) state.sections = [payload];
      else state.sections.push(payload);
    },
    addPathToSection: (state, payload: Section): void => {
      state.sections = [...state.sections.filter(s => s.name != payload.name), payload];
    },
    deleteSections: (state, payload: Section[]): void => {
      state.sections = state.sections.filter(s => payload.map(p => p.name).filter(x => x == s.name).length === 0);
    },
    addGameOverviews: (state, payload): void => {
      const exeSearcher = new ExeSearcher();
      exeSearcher.creatGameOverviews(payload.section, payload.path).forEach(gameOverview => {
        state.gameOverviews.push(gameOverview);
      })
    },
    //removeGameOverview: () => {}
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});
