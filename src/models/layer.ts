export enum Layer {
    Couche0 = "Couche 0",
    Couche1 = "Couche 1",
    Couche2 = "Couche 2",
    Couche3 = "Couche 3",
    Couche4 = "Couche 4",
    Couche5 = "Couche 5",
    SillonA = "Sillon A",
    SillonB = "Sillon B"
}

export default class LayerDatas {
    private layerId!: Layer;
    private tonnage!: number;
    private content!: number;
    private granulometry!: number;
}