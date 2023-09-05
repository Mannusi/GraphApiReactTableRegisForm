export interface IRegistrationFormValues {
    Id:string;
    userName:string;
    yourEmail:string;
    password:string;
    confirmPassword:string;
    phoneNumber:string;
}

export class RegistrationFormValue implements IRegistrationFormValues {
  public Id: string = "";
  public  userName:string = "";
  public  yourEmail: string = "";
  public  password: string = "";
  public  confirmPassword: string = "";
  public  phoneNumber: string = "";
    
}
