import { LayerDatas, Layer } from "@/models/layer";
import { ObjectUtil } from "@/util/object";

export class CalculationConfig {
    public static readonly DEFAULT: LayerDatas[] = [
        new LayerDatas(Layer.Couche0, 70, 0.9),
        new LayerDatas(Layer.Couche1, 66, 0.92),
        new LayerDatas(Layer.Couche2, 60, 0.91),
        new LayerDatas(Layer.Couche3, 69, 0.8),
        new LayerDatas(Layer.Couche4, 58, 0.8),
        new LayerDatas(Layer.Couche5, 68, 0.8),
        new LayerDatas(Layer.SillonA, 60, 0.9),
        new LayerDatas(Layer.SillonB, 60, 0.9),
    ];
    public static CURRENT: LayerDatas[] = ObjectUtil.deepCopy(CalculationConfig.DEFAULT);

    public static GetLayerDatas(layer: Layer): LayerDatas {
        var t = CalculationConfig.CURRENT.filter(ld => ld.layerId == layer);
        return t[0];
    }
}
