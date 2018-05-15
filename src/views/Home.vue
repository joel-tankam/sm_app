<template>
  <div class="home">
    <CalculationForm @formUpdated="calculateResults" />
    <div class="w-100 my-3"></div>
    <CalculationResult :results="results" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CalculationForm from '@/components/CalculationForm.vue';
import CalculationResult from '@/components/CalculationResult.vue';
import { SuggestionGenerator } from '@/app/suggestion_generator';

@Component({
  components: {
  CalculationForm,
  CalculationResult
  }
  })
export default class Home extends Vue {
  // Datas
  results: any[][] = [[]];

  // Methods
  private calculateResults(form: any) {
    this.results = SuggestionGenerator.GetFromForm(form);
    console.log(this.results);
  }
}
</script>
