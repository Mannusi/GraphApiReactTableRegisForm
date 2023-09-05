export interface IEmployeeOnboardingFormValues {
    Id:string;
    Title:string;
    EmployeeId:string;
    EmployeeName:string;
    OnboardingStatus:string;
    EEStatus:string;
    StartDate:Date;
    ExpectedEndDate:Date;
    EEEmail:string;
    EmployeeCountry:string
  //  EmployeeCountryKey:string;
    
}

export class EmployeeOnboarding implements IEmployeeOnboardingFormValues{
   public Id: string = "";
   public Title: string="";
   public EmployeeId: string= "";
   public EmployeeName: string="";
   public OnboardingStatus: string="";
   public EEStatus:string="";
   public StartDate: Date=null;
   public ExpectedEndDate: Date=null;
   public EEEmail: string="";
   public EmployeeCountry: string="";  
  // public EmployeeCountryKey: string="";
}