export class BrandLocationProductModel {
    constructor(public id: number = null,
        public brand_location_id: number = null,
        public product_id: number = null,
        public price: number = null,
        public product_portion_id: number = null,
        public tax_price: any[] = null,
        public price_with_tax: number = null,
        public price_without_tax: number = null,
        public name: string = null) {
    }
}