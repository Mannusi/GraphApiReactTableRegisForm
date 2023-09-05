import { IDropdownOption } from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { EmployeeOnboarding } from "./IEmployeeOnboardingFormValues";

export interface IEmployeeOnboardingFormProps {
  description: string;
  context:WebPartContext;
}

export interface IEmployeeOnboardingFormState {
      FormValues:EmployeeOnboarding;
      onboardingStatusDropdownOption:IDropdownOption[];
      employeeFormValues:EmployeeOnboarding[];
      countryFormValues:IDropdownOption[];
      onboardingStatusChoices:IDropdownOption[];
      eeStatusChoices:IDropdownOption[];
}


export { EmployeeOnboarding };

