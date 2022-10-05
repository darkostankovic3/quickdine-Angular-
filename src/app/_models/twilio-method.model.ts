export class TwilioMethodModel {

    constructor(public id: number = null,
        public twilio_method: string = null,
        public is_active: boolean = null,
        public use_twilio_keys: boolean = null,
        public keys: any[] = null) {
    }
}