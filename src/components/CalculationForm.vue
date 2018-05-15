<template>
  <div>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group horizontal
        breakpoint="md"
        label="Besoin de safi" label-size="md" label-class="font-weight-bold">
        <b-form-group horizontal
          label="Tonnage :" label-class="text-sm-right" label-for="neededTonnage">
          <b-form-input required id="neededTonnage"
            type="number" step="10"
            v-model="form.needed.tonnage"/>
        </b-form-group>
        <b-form-group horizontal
          label="Teneur :" label-class="text-sm-right" label-for="neededContent"
          description="Pourcentage (%)">
          <b-form-input required id="neededContent"
            type="number" step="0.01" min="50" max="60"
            v-model="form.needed.content"/>
        </b-form-group>
      </b-form-group>
      <b-form-group horizontal breakpoint="md"
        label="Couche de départ" label-size="md" label-class="font-weight-bold">
        <b-form-group horizontal
          label="Couche :" label-class="text-sm-right" label-for="givenLayer">
          <b-form-select required id="givenLayer"
            v-model="form.given.layer" :options="layersOptions" />
        </b-form-group>
        <b-form-group horizontal
          label="Tonnage :" label-class="text-sm-right" label-for="givenTonnage">
          <b-form-input required id="givenTonnage"
            type="number"
            v-model="form.given.tonnage"/>
        </b-form-group>
      </b-form-group>
      <b-form-group horizontal breakpoint="md"
        label="Couches à mélanger" label-size="md" label-class="font-weight-bold">
        <b-form-group horizontal
          label="Choix :"  label-class="text-sm-right">
          <b-form-checkbox-group
            v-model="form.given.mixedLayers">
            <b-form-checkbox v-for="i in mixedLayersOptions" v-bind:key="i.value"
              :value="i.value" :disabled="i.value === form.given.layer">
                {{ i.text }}
              </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-group horizontal v-show="additionalLayersNumber > 0"
          label="Tonnages fixés :" label-class="text-sm-right">
          <b-form-input v-for="i in additionalLayersNumber" v-bind:key="i" required
            name="additionalTonnages" type="number" min="1" class="my-2"
            v-model="form.given.additionalTonnages[i-1]" @change="checkTonnages(i-1)" />
        </b-form-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Calculer</b-button>
      <b-button type="reset" variant="default">Reset</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
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
      mixedLayers: [Layer.Couche1, Layer.Couche2],
      additionalTonnages: [0, 0, 0, 0, 0],
    },
  };

  // Datas
  private layersOptions: any[] = [
    { value: Layer.Couche0, text: Layer.Couche0 },
    { value: Layer.Couche1, text: Layer.Couche1 },
    { value: Layer.Couche2, text: Layer.Couche2 },
    { value: Layer.Couche3, text: Layer.Couche3 },
    { value: Layer.Couche4, text: Layer.Couche4 },
    { value: Layer.Couche5, text: Layer.Couche5 },
    { value: Layer.SillonA, text: Layer.SillonA },
    { value: Layer.SillonB, text: Layer.SillonB },
  ];
  private mixedLayersOptions: any[] = [
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
  private checkTonnages(i: any) {
    const sumFunction = (acc: number, current: number) =>
      Number(acc) + Number(current);
    let sum = this.form.given.additionalTonnages.reduce(sumFunction);
    const tonnage = Number(this.form.needed.tonnage);
    if (sum >= tonnage) {
      sum -= Number(this.form.given.additionalTonnages[i]);
      this.form.given.additionalTonnages[i] = Number(tonnage) - sum;
    }
    this.$forceUpdate();
  }
  private onSubmit(evt: any) {
    this.$emit('formUpdated', this.form);
  }
  private onReset(evt: any) {
    this.form = ObjectUtil.deepCopy(CalculationForm.FORM_INITIAL_VALUES);
  }

  // Computed properties
  get additionalLayersNumber() {
    return this.form.given.mixedLayers.length - 2;
  }

  // Watch
  @Watch("additionalLayersNumber")
  onAdditionalLayersNumberChanged(val: number, oldVal: number) {
    if (oldVal > val) {
      for (let i = val; i <= oldVal; i += 1) {
        this.form.given.additionalTonnages[i] = 0;
      }
      this.$forceUpdate();
    }
  }
}
</script>

<style scoped lang="scss">

</style>
