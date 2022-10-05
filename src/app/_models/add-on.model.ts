import { AddOnTypeModel } from './add-on-type.model';

export class AddOnModel {
    public add_on_types: AddOnTypeModel[];

    constructor(public id: number = null,
        public name: string = null,
        public type: string = null,
        public brand_id: number = null,
        public menu_id: number = null,
        public validate: boolean = true) {
    }
}