import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IRegistrationFormValues } from "./IRegistrationFormValues";

export interface IRegistrationFormProps {
  description: string;
  context: WebPartContext
  backToRegistration : () => void;
  emailValue: string;
  userProfile:any[];
  userDetailsValues: any[];
}

