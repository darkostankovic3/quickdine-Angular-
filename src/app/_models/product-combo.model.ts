import { ProductComboItemModel } from './product-combo-item.model';
export class ProductComboModel {
    public product_combo_items: ProductComboItemModel[];

    constructor(
        public id: number = null,
        public combo_name: string = null,
        public display_label: string = null,
        public brand_id: number = null,
        public selected: any = null,
        public tag_valid: boolean = null,
        public minimum: number = null,
        public maximum: number = null,
        public valid: boolean = null,
        public total_amount: number = null,
        public sub_total_amount: number = null,
        public display_price: number = null) { }
}
