export class FormSnippet {
    static populateValueInForm(form: any, item: string, value: any) {
        if (form.controls[item]) {
            form.controls[item].patchValue(value);
        }
    }
}
