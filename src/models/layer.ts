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

export class LayerDatas {
    private layerId!: Layer;
    public content!: number;
    public granulometry!: number;

    public constructor(layerId: Layer, content: number = 0, granulometry: number = 0) {
        this.layerId = layerId;
        this.content = content;
        this.granulometry = granulometry;
    }
}
