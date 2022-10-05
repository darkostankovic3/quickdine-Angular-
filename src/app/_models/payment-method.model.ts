export class PaymentMethodModel {

    constructor(public id: number = null,
        public payment_method: string = null,
        public label: string = null,
        public is_active: boolean = null,
        public use_payment_keys: boolean = null,
        public keys: any[] = null,
        public card_charges: number = null) {
    }
}