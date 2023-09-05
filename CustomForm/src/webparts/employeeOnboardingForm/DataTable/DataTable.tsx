import * as React from 'react';
import { IDataTableFormProps } from './IDataTablesFormProps';
import "DataTables.net";
import 'datatables.net-responsive';
import * as $ from "jquery";
import { Link } from 'office-ui-fabric-react';
import DataTables from 'datatables.net-dt';
import { IEmployeeOnboardingFormValues } from '../components/IEmployeeOnboardingFormValues';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { sp } from '@pnp/sp';
require("./Datatable.css");
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");

import { ListFieldsCountryMaster, ListFieldsEmployeeForm, ListNames } from '../components/Constant';

export default class DataTable extends React.Component<IDataTableFormProps, any> {


  constructor(props: IDataTableFormProps) {
    super(props);
  }


  onEditButtonCliecked = (item) => {
    this.props.onEditClickHandler(item);
  }


  public componentDidMount = async () => {
    this.filesave;
  }

  private filesave = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => {
    let id = event.target["id"];
    let path = event.target["value"];
    let fileName = path.replace(/^.*\\/, "");
    let myfile = (document.querySelector("#" + id + "") as HTMLInputElement);
    let fileCount = myfile.files.length;
    console.log(fileCount);
    for (let i = 0; i < fileCount; i++) {
      var file = myfile.files[i];
      // var fileName = myfile.files[i].name;
      if (file.size <= 10485760) {
        sp.web.getFolderByServerRelativeUrl(ListNames.ReportsUpload).files.add(fileName, file, true).then(f => {
          console.log("File Uploaded");
          f.file.getItem().then(item => {
            item.update({
              fileName
            }).then((myupdate) => {
              console.log(myupdate);
              console.log("Metadata Updated");
            });
          });
        });
      }
      else {
        sp.web.getFolderByServerRelativeUrl(ListNames.ReportsUpload)
          .files.addChunked(fileName, file)
          .then(({ file }) => file.getItem()).then((item: any) => {
            console.log("File Uploaded");
            return item.update({
              Title: 'Metadata Updated'
            }).then((myupdate) => {
              console.log(myupdate);
              console.log("Metadata Updated");
            });
          }).catch(console.log);
      }
    }
  }

  render() {
    return (
      <>
        <div className="Container">
          <div className="col-md-12 ">       
              <table
                id="Employee-Onboarding-Form"
                className="table display nowrap"
                style={{ width: '100%' }}
              >
                <thead>
                  <div className='row'>
                    <tr>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Onboarding Status</th>
                      <th>EE Status</th>
                      <th>Employee Email</th>
                      <th>Employee Country</th>
                      <th>Start Date</th>
                      <th>Expected End Date</th>
                      <th>Action</th>
                      <th>Attachment</th>
                    </tr>
                  </div>
                </thead>
                <tbody>
                  {
                    this.props.FormValuesProps.map(item => {
                      return (
                        <div className='row'>
                        <tr>
                          <td>{item.EmployeeId}</td>
                          <td>{item.EmployeeName}</td>
                          <td>{item.OnboardingStatus}</td>
                          <td>{item.EEStatus}</td>
                          <td>{item.EEEmail}</td>
                          {/* <td>{item.EmployeeCountry["Title"]}</td> */}
                          <td>{item.StartDate}</td>
                          <td>{item.ExpectedEndDate}</td>
                          <td><Link data-selection-invoke={true} itemID={item.Id} onClick={(it: any) => { this.onEditButtonCliecked(it.target.getAttribute("itemID")) }}>{"Edit"}</Link></td>
                          <td>
                            <label className="control-label-file">
                              <input multiple type='file' name="fileUpload" className="file" id="file_" onChange={this.filesave}></input>
                            </label>
                          </td>
                        </tr>
                        </div>
                      )
                    })
                  }
                </tbody>
              </table>
          </div>
        </div >
      </>
    )
  }



}

