import * as React from "react";
import { IRegistrationFormValues, RegistrationFormValue } from "./IRegistrationFormValues";
import { IFileInfo } from "@pnp/sp/presets/all";


export default interface ILoginUserState {
    userDetailsArray:[];
    emailValue: string;
    passwordValue: string;
    isLoginRequired: boolean;
    userDetailsValues:[];
    userProfile : IFileInfo[];
}


