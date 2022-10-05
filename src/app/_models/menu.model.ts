import { TagModel } from 'app/_models/tag.model';
import { ProductModel } from 'app/_models/product.model';
import { BrandLocationProductModel } from './brand-location-product.model';
import { AddOnModel } from './add-on.model';
import { BrandMenuItemAddOnModel } from './brand-menu-item-add-on.model';
import { BrandMenuItemModel } from './brand-menu-item.model';
import { MenuDescriptionModel } from 'app/_models/menu-description.model';

export class MenuModel {
    public menus: MenuModel[];
    public menu_descriptions: MenuDescriptionModel[];
    public brand_menu_items: BrandMenuItemModel[];
    //public brand_menu_item_adds_ons: BrandMenuItemAddOnModel[] = new Array();
    public add_ons: AddOnModel[];
    public portions: BrandLocationProductModel[];
    public product: ProductModel;
    public tags: TagModel[];

    constructor(public id: number = null,
        public name: string = null,
        public description: string = null,
        public parent_id: number = null,
        public taxes: number = null,
        public visibility: string = null,
        public type: string = null,
        public price: number = null,
        public price_with_tax: number = null,
        public price_without_tax: number = null,
        public pic: string = null,
        public quantity: number = 0,
        public amount: number = 0,
        public tax_price: any = null,
        public product_id: number = null,
        public show_only: any[] = null,
        public show_only_from_range: any[] = null,
        public show_only_from_days: any[] = null,
        public hide_until_date: any[] = null,
        public hide_until_time: any[] = null,
        public youtube_link: string = null,
        public upsell_items: ProductModel[] = null,
        public tag_valid: boolean = null,
        public total_amount: number = 0,
        public sub_total_amount: number = 0,
        public sub_total: number = 0,
        public selected_quantity: number = null,
        public display_price: number = null,
        public brand_name: string = null,
        public display_label: string = null,
        public tax_object: any = null,
        public remarks: string = null,
        public sub_category: string = null) {
    }
}