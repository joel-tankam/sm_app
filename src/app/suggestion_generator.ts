import { Gauss } from "@/app/gauss";
import { Layer, LayerDatas } from "@/models/layer";
import { CalculationConfig } from "@/models/config";

export class SuggestionGenerator {
    public static GetFromForm(form: any): any[][] {
        let results: any[][] = [];

        for (let i of form.given.mixedLayers) {
            for (let j of form.given.mixedLayers) {
                let A: number[][] = [[1, 1], [0, 0]];
                let x: number[] = [0, 0];

                let c: number = Number(form.needed.tonnage) * Number(form.needed.content);
                let givenLayer = CalculationConfig.GetLayerDatas(form.given.layer);
                c -= givenLayer.content * givenLayer.granulometry * Number(form.given.tonnage);

                if (i == j) continue;
                x[0] = Number(form.needed.tonnage) - Number(form.given.tonnage);
                x[1] = c;
                let unknownLayer1 = CalculationConfig.GetLayerDatas(i);
                let unknownLayer2 = CalculationConfig.GetLayerDatas(j);
                A[1][0] = unknownLayer1.content * unknownLayer1.granulometry;
                A[1][1] = unknownLayer2.content * unknownLayer2.granulometry;

                let fixedLayers: Layer[] = form.given.mixedLayers.filter((layer: Layer) => layer != i && layer != j);
                let result: any[] = [];
                for (let k in fixedLayers) {
                    let fixedLayer = CalculationConfig.GetLayerDatas(fixedLayers[k]);
                    let fixedTonnage = Number(form.given.additionalTonnages[k]);
                    result.push({
                        couche: fixedLayer.layerId,
                        teneur: fixedLayer.content,
                        granulometrie: fixedLayer.granulometry,
                        tonnage: fixedTonnage
                    });
                    x[0] -= fixedTonnage;
                    x[1] -= fixedLayer.content * fixedLayer.granulometry * fixedTonnage;
                }
                let sol = Gauss.solve(A, x);
                result.push({
                    couche: unknownLayer1.layerId,
                    teneur: unknownLayer1.content,
                    granulometrie: unknownLayer1.granulometry,
                    tonnage: sol[0]
                });
                result.push({
                    couche: unknownLayer2.layerId,
                    teneur: unknownLayer2.content,
                    granulometrie: unknownLayer2.granulometry,
                    tonnage: sol[1]
                });
                results.push(result);
            }
        }
        return results;
    }
}
