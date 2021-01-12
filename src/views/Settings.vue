<template>
  <div>
    <!-- add a new path -->
    <b-row>
      <b-col>
        <h2>Sections</h2>
      </b-col>
      <b-col>
        <b-input type="text" placeholder="name" v-model="sectionName" />
      </b-col>
      <b-col>
        <b-input type="text" placeholder="path" v-model="path" /> 
      </b-col>
      <b-col>
        <b-button v-on:click="addSection">add Section</b-button>
      </b-col>
    </b-row>
    <!-- show all paths -->
    <b-table
      dark
      hover
      selectable
      :items="sections"
      :select-mode="selectMode"
      ref="selectedSections"
      @row-selected="onRowSelected"
    >
      <template #cell(name)="data">
        {{ data.item.name }}
      </template>

      <!-- A custom formatted column -->
      <template #cell(paths)="data">
          <b >{{ pathToString(data.item.paths) }}</b>
      </template>
    </b-table>
    <h3>{{ selectedSections }}</h3>
    <b-button v-if="selected" v-on:click="deleteSelected">
      Delete Selected Sections
    </b-button>
    <hr />
  </div>
</template>

<script lang="ts">
import { GameOverview } from "@/models/game-overview";
import { Section } from "@/models/section";
import store from "@/store";
import { shell } from "electron";
import Vue from "vue";

export default Vue.extend({
  name: "Settings",
  data: () => ({
    sectionName: "",
    path: "",
    selectMode: "multi",
    selectedSections: [] as Section[],
    fields: ["name", "paths"],
  }),
  computed: {
    comp() {
      return this.sectionName;
    },
    sections() {
      return store.state.sections;
    },
    selected() {
      return this.selectedSections.length > 0;
    },
    
  },
  methods: {
    // methods to get passed in template
    addSection() {
      let section: Section;
      //if(this.path.length === 0) this.path = "" //Custom Path for debug
      if ( store.state.sections.filter((s) => s.name == this.sectionName).length > 0) {
        section = {
          name: this.sectionName,
          paths: [
            ...store.state.sections.filter((s) => s.name == this.sectionName)[0]
              .paths,
            this.path,
          ],
        } as Section
        store.commit("addPathToSection", section);
      } else {
        section = {
          name: this.sectionName,
          paths: [this.path],
        } as Section
        store.commit("addSection", section);
      }

      // code for adding exePaths
      store.commit("addGameOverviews", {section, path: this.path});
    },
    onRowSelected(sections: Section[]) {
      this.selectedSections = sections;
    },
    deleteSelected() {
      store.commit("deleteSections", this.selectedSections);
    },
    pathToString(paths: string[]) {
      return paths.join(" | ")
    }
  },
});
</script>