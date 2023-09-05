import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITestDropdownProps {
  description: string;
  context:WebPartContext;
  numbers: any[];
  itemId: string;
  displayDeletebtn: boolean;
  
}

export interface ITestDropdownState {
  countryFormValues : any[];
  countrySelectedKey: number;
  
}
