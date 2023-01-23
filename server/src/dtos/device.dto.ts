export class DeviceDto {
    name: string;
    price: number;
    image: string;

    constructor(model: any) {
        this.name = model.name;
        this.price = model.price;
        this.image = model.image;
    }
}
