export class CountryModel {
    constructor(public id: number = null,
        public country: string = null,
        public payment_methods: any = null,
        public delivery_partners: any = null,
        public calling_code: number = null
    ) {
    }
}