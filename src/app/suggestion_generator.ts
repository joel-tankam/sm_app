import { Gauss } from "@/app/gauss";
import { Layer, LayerDatas } from "@/models/layer";
import { CalculationConfig } from "@/models/config";

export class SuggestionGenerator {
    public static GetFromForm(form: any): any[][] {
        let A: number[][] = [[1, 1], [0, 0]];
        let x: number[] = [form.needed.tonnage, 0];

        let c: number = Number(form.needed.tonnage) * Number(form.needed.content);
        let givenLayer = CalculationConfig.GetLayerDatas(form.given.layer);
        c -= givenLayer.content * givenLayer.granulometry - Number(form.given.tonnage);

        x[1] = c;
        let unknownLayer1 = CalculationConfig.GetLayerDatas(form.given.mixedLayers[0]);
        let unknownLayer2 = CalculationConfig.GetLayerDatas(form.given.mixedLayers[1]);
        A[1][0] = unknownLayer1.content * unknownLayer1.granulometry;
        A[1][1] = unknownLayer2.content * unknownLayer2.granulometry;

        let sol = Gauss.solve(A, x);
        return [[
            { layer: unknownLayer1.layerId, content: unknownLayer1.content, granulometry: unknownLayer1.granulometry, tonnage: sol[0] },
            { layer: unknownLayer2.layerId, content: unknownLayer2.content, granulometry: unknownLayer2.granulometry, tonnage: sol[1] },
        ]];
    }
}
