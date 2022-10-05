export class ProductPortionPriceModel {
    constructor(public id: number = null,
        public product_portion_id: number = null,
        public price: number = null,
        public tag: string = null,
        public product_portion_price_id: number = null) {
    }
}