import { TaxMapModel } from './tax-map.model';
export class TaxModel {
    public tax_maps: TaxMapModel[];

    constructor(public id: number = null,
        public name: string = null,
        public description: string = null,
        public tax_percent: number = null) {
    }
}