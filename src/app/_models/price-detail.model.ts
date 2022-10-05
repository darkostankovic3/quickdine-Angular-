export class PriceDetailModel {
    constructor(public id: number = null,
        public price_with_tax: number = null,
        public price_without_tax: number = null,
        public tax_price: any[] = null,
        public total_tax: number = null) {
    }
}