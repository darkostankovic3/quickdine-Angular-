import { MenuModel } from './menu.model';
export class BrandMenuItemModel {
    public menu: MenuModel;

    constructor(public id: number = null,
        public price: number = null,
        public tax_id: number = null,
        public brand_menu_id: number = null,
        public menu_id: number = null,
        public show_only_from: string = null,
        public show_only_to: string = null,
        public hide_until: string = null,
        public show_only_days: any[] = null,
        public visibility: any[] = null) {
    }
}