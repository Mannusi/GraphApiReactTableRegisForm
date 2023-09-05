import { RegistrationFormValue } from "./IRegistrationFormValues";

export interface IRegistrationState{
    formValues : RegistrationFormValue;
    errorMessage : boolean;
    loadLoginForm: boolean;
    isValidForm: boolean;
}

