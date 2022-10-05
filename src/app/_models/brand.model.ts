import { BrandMenuModel } from './brand-menu.model';
export class BrandModel {
    public brand_menus: BrandMenuModel[];

    constructor(public id: number = null,
        public name: string = null,
        public location_id: any = null,
        public range: any = null) {
    }
}