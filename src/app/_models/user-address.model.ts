export class UserAddressModel {

    constructor(public id: number = null,
        public address_line_1: string = null,
        public address_line_2: string = null,
        public user_id: number = null,
        public city: string = null,
        public state: string = null,
        public pincode: string = null,
        public country: string = null,
        public phone_number: string = null,
        public note: string = null,
        public country_code: string = null,
    ) {
    }
}