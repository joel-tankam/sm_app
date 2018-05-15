import { Gauss } from "@/app/gauss";
import { Layer, LayerDatas } from "@/models/layer";
import { CalculationConfig } from "@/models/config";

export class SuggestionGenerator {
    public static GetFromForm(form: any): any[][] {
        let A: number[][] = [[1, 1], [0, 0]];
        let x: number[] = [0, 0];


        let c: number = Number(form.needed.tonnage) * Number(form.needed.content);
        let givenLayer = CalculationConfig.GetLayerDatas(form.given.layer);
        c -= givenLayer.content * givenLayer.granulometry * Number(form.given.tonnage);

        x[0] = Number(form.needed.tonnage) - Number(form.given.tonnage);
        x[1] = c;
        let unknownLayer1 = CalculationConfig.GetLayerDatas(form.given.mixedLayers[0]);
        let unknownLayer2 = CalculationConfig.GetLayerDatas(form.given.mixedLayers[1]);
        A[1][0] = unknownLayer1.content * unknownLayer1.granulometry;
        A[1][1] = unknownLayer2.content * unknownLayer2.granulometry;

        let sol = Gauss.solve(A, x);
        return [[
            { couche: unknownLayer1.layerId, teneur: unknownLayer1.content, granulometrie: unknownLayer1.granulometry, tonnage: sol[0] },
            { couche: unknownLayer2.layerId, teneur: unknownLayer2.content, granulometrie: unknownLayer2.granulometry, tonnage: sol[1] },
        ]];
    }
}
