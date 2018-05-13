<template>
  <div>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group horizontal
        breakpoint="md"
        label="Besoin en safi" label-size="md" label-class="font-weight-bold">
        <b-form-group horizontal
          label="Tonnage:" label-class="text-sm-right" label-for="neededTonnage">
          <b-form-input required id="neededTonnage"
            type="number" step="10"
            v-model="form.needed.tonnage"/>
        </b-form-group>
        <b-form-group horizontal
          label="Teneur:" label-class="text-sm-right" label-for="neededContent"
          description="Pourcentage (%)">
          <b-form-input required id="neededContent"
            type="number" step="0.01" min="50" max="60"
            v-model="form.needed.content"/>
        </b-form-group>
      </b-form-group>
      <b-form-group horizontal breakpoint="md"
        label="Couche de départ" label-size="md" label-class="font-weight-bold">
        <b-form-group horizontal
          label="Couche:" label-class="text-sm-right" label-for="givenLayer">
          <b-form-select required
            v-model="form.given.Layer" :options="LayersOptions" />
        </b-form-group>
        <b-form-group horizontal
          label="Tonnage:" label-class="text-sm-right" label-for="givenTonnage">
          <b-form-input required id="givenTonnage"
            type="number"
            v-model="form.given.tonnage"/>
        </b-form-group>
        <b-form-group horizontal
          label="Teneur:" label-class="text-sm-right" label-for="givenContent"
          description="Pourcentage (%)">
          <b-form-input required id="givenContent"
          type="number" step="0.01" min="50" max="60"
          v-model="form.given.content"/>
        </b-form-group>
        <b-form-group horizontal
          label="Granulométrie:" label-class="text-sm-right" label-for="givenGranulometry">
          <b-form-input required id="givenGranulometry"
            type="number" step="0.01"
            v-model="form.given.granulometry"/>
        </b-form-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Calculer</b-button>
      <b-button type="reset" variant="default">Reset</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Layer } from '@/models/layer';
import { ObjectUtil } from '@/util/object';

@Component
export default class CalculationForm extends Vue {
  // Consts
  private static readonly FORM_INITIAL_VALUES: any = {
    needed: {
      tonnage: 10000,
      content: 59,
    },
    given: {
      layer: Layer.Couche0,
      tonnage: 5000,
    },
  };

  // Datas
  private LayersOptions: any[] = [
    { value: Layer.Couche0, text: Layer.Couche0 },
    { value: Layer.Couche1, text: Layer.Couche1 },
    { value: Layer.Couche2, text: Layer.Couche2 },
    { value: Layer.Couche3, text: Layer.Couche3 },
    { value: Layer.Couche4, text: Layer.Couche4 },
    { value: Layer.Couche5, text: Layer.Couche5 },
    { value: Layer.SillonA, text: Layer.SillonA },
    { value: Layer.SillonB, text: Layer.SillonB },
  ];
  private form: any = ObjectUtil.deepCopy(CalculationForm.FORM_INITIAL_VALUES);

  // Methods
  private onSubmit(evt: any) {
    console.log(this.form);
  }
  private onReset(evt: any) {
    this.form = ObjectUtil.deepCopy(CalculationForm.FORM_INITIAL_VALUES);
  }
}
</script>

<style scoped lang="scss">

</style>
