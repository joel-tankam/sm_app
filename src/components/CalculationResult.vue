<template>
  <div>
    <b-alert show v-show="!resultsExist">Pas de resultat disponible</b-alert>
    <div v-show="resultsExist" v-for="result in results" v-bind:key="result.toString()">
      <b-table striped hover :items="result"></b-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ObjectUtil } from '@/util/object';

@Component
export default class CalculationForm extends Vue {
  // Datas
  @Prop() results: any[][];

  // Computed
  get resultsExist() {
    return this.results.length !== 0 && this.results[0].length !== 0;
  }
}
</script>
