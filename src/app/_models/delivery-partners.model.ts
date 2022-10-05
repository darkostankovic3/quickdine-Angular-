export class DeliveryPartnerModel {

    constructor(public id: number = null,
        public name: string = null,
        public label: string = null,
        public is_active: boolean = null,
        public use_keys: boolean = null,
        public keys:any = null
        ) {
    }
}