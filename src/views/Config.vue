<template>
  <div >
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Couche</th>
          <th scope="col">Teneur</th>
          <th scope="col">Granulométrie</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in [0,1,2,3,4,5,6,7]" v-bind:key="i">
          <th scope="row">{{ printLayerById(i) }}</th>
          <td>
            <b-form-input required
              type="number" step="0.01"
              v-model="config[i].content"/>
            </td>
          <td>
            <b-form-input required
              type="number" step="0.01"
              v-model="config[i].granulometry"/>
          </td>
        </tr>
      </tbody>
    </table>
    <b-button @click="onSubmit" variant="primary">Enregistrer</b-button>
    <b-button @click="onReset" type="reset" variant="default">Reset</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LayerDatas, Layer } from '@/models/layer';
import { ObjectUtil } from '@/util/object';
import { CalculationConfig } from '@/models/config';

@Component
export default class Config extends Vue {
  static readonly LAYER_NAMES: string[] = [
    Layer.Couche0,
    Layer.Couche1,
    Layer.Couche2,
    Layer.Couche3,
    Layer.Couche4,
    Layer.Couche5,
    Layer.SillonA,
    Layer.SillonB,
  ];

  // Datas
  private config: LayerDatas[] = ObjectUtil.deepCopy(CalculationConfig.CURRENT);

  // Methods
  private printLayerById(id: number): string {
    console.log(this.config[id]);
    return Config.LAYER_NAMES[id];
  }
  private onSubmit(evt: any) {
    console.log(this.config);
    CalculationConfig.CURRENT = ObjectUtil.deepCopy(CalculationConfig.DEFAULT);
  }
  private onReset(evt: any) {
    this.config = ObjectUtil.deepCopy(CalculationConfig.DEFAULT);
  }
}
</script>
