import ReactTable from "./ReactTable";

export default interface IReactTableState{
  data: [];
}

export interface IReactTableValues{
    Title:string;
    Month:string;
    Country:string;
    EmployeeName:string;
    PayrollVendor:string;
    EENumber:string;
    Client:string;
    EndClient:string;

}

export class ReactTableValues implements IReactTableValues{
   public Title:string ="";
   public Month:string ="";
   public Country:string ="";
   public EmployeeName:string ="";
   public PayrollVendor: string ="";
   public EENumber:string ="";
   public Client: string ="";
   public EndClient: string = "";
}
