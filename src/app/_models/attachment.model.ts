import { UserModel } from './user.model';

export class AttachmentModel {
    public user: UserModel;

    constructor(public id: number = null,
        public file_path: string = null,
        public file_name: string = null,
        public created_by: string = null,
        public created_at: string = null,
        public is_selected: boolean = false,
        public type: string = null,
        public thumbnail: string = null) {
    }
}