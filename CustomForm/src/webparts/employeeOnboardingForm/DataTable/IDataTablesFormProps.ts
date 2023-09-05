import { IDropdownOption } from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { EmployeeOnboarding } from "../components/IEmployeeOnboardingFormProps";
import { IEmployeeOnboardingFormValues } from "../components/IEmployeeOnboardingFormValues";

export interface IDataTableFormProps{
    FormValuesProps:IEmployeeOnboardingFormValues[];
    onEditClickHandler: (item: EmployeeOnboarding) => void; 
}