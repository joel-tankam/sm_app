<template>
  <div class="home">
    <CalculationForm @resultsGenerated="showResults" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CalculationForm from '@/components/CalculationForm.vue';

@Component({
  components: {
  CalculationForm
  }
  })
export default class Home extends Vue {
  static showResults(results: any) {}
}
</script>
