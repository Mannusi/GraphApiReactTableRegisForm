import * as React from 'react';
import styles from './EmployeeOnboardingForm.module.scss';
import { IEmployeeOnboardingFormProps, IEmployeeOnboardingFormState } from './IEmployeeOnboardingFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IListOperationService, ListOperationService } from '../../../Domain/Service';
import { ListFieldsCountryMaster, ListFieldsEmployeeForm, ListNames } from './Constant';
import { EmployeeOnboarding, IEmployeeOnboardingFormValues } from './IEmployeeOnboardingFormValues';
import { PrimaryButton } from '@fluentui/react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { BaseButton, Button, DatePicker, Dropdown, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react';
import * as moment from 'moment';
import DataTable from '../DataTable/DataTable';
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
import TestDropdown from '../../testDropdown/components/TestDropdown';
import stateconcept from '../../testDropdown/components/Stateconcept';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default class EmployeeOnboardingForm extends React.Component<IEmployeeOnboardingFormProps, IEmployeeOnboardingFormState> {

  private _listService: IListOperationService = null;

  constructor(props) {
    super(props)
    this.state = {
      FormValues: new EmployeeOnboarding(),
      onboardingStatusDropdownOption: [],
      employeeFormValues: [],
      countryFormValues: [],
      onboardingStatusChoices: [],
      eeStatusChoices: [],
    }
    this._listService = new ListOperationService();
  }
  public componentDidMount = async () => {
    let employeeListItems: any = await this._listService.GetAllItemsFromList(ListNames.EmployeeForm, "", ["*", ListFieldsEmployeeForm.EmployeeCountry + "/Title"], [ListFieldsEmployeeForm.EmployeeCountry]);

    let countryList: any = await this._listService.GetAllItemsFromList(ListNames.Country, "", ["Title", "Id"], []);

    let OnboardingDropdownOption: any = await this._listService.GetListField(ListNames.EmployeeForm, "OnboardingStatus");

    let EEStatusDropdownOption: any = await this._listService.GetListField(ListNames.EmployeeForm, "EEStatus");

    this.setState({
      employeeFormValues: employeeListItems,
      countryFormValues: countryList.map(it => ({ key: it["Title"], text: it["Title"] })),
      onboardingStatusChoices: OnboardingDropdownOption.Choices.map(it => ({ key: it, text: it })),
      eeStatusChoices: EEStatusDropdownOption.Choices.map(it => ({ key: it, text: it }))
    });
  }

  private SubmitFormValue = async () => {
    await this.SaveItemsToEmployeeMasterList(this.state.FormValues);
  }
  public async SaveItemsToEmployeeMasterList(FormValues: EmployeeOnboarding) {
    var strdate = new Date(FormValues.StartDate.toString());
    var startDate = strdate.getFullYear() + "-" + (strdate.getMonth() + 1) + "-" + strdate.getDate();
    var endDate = new Date(FormValues.ExpectedEndDate.toString());
    var expectedEndDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
    let item: any = {
      [ListFieldsEmployeeForm.EmployeeId]: +FormValues.EmployeeId,
      [ListFieldsEmployeeForm.EmployeeName]: FormValues.EmployeeName,
      [ListFieldsEmployeeForm.EEEmail]: FormValues.EEEmail,
      [ListFieldsEmployeeForm.EEStatus]: FormValues.EEStatus,
      [ListFieldsEmployeeForm.OnboardingStatus]: FormValues.OnboardingStatus,
      [ListFieldsEmployeeForm.EmployeeCountry + "Id"]: FormValues.EmployeeCountry,
      // [ListFieldsEmployeeForm.StartDate]: moment(FormValues.StartDate).format('DD/MM/YYYY').toString(),
      [ListFieldsEmployeeForm.StartDate]: startDate,
      //[ListFieldsEmployeeForm.ExpectedEndDate]: moment(FormValues.ExpectedEndDate).format('DD/MM/YYYY').toString(),
      [ListFieldsEmployeeForm.ExpectedEndDate]: expectedEndDate,
    }
    await this._listService.AddItemsToList(ListNames.EmployeeForm, item);
    this.setState({ FormValues: new EmployeeOnboarding() });
  }

  private _textboxChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => {
    let value = event.target["value"];
    let id = event.target["id"]
    let textFormValues = { ...this.state.FormValues };
    switch (id) {
      case "tbxEmpId":
        textFormValues.EmployeeId = value;
        break;
      case "tbxEmpNam":
        textFormValues.EmployeeName = value;
        break;
      case "tbxWrkEml":
        textFormValues.EEEmail = value;
        break;
    }
    this.setState({ FormValues: textFormValues });
  }

  private _dropdownChange = (event: React.FormEvent<HTMLDivElement>, optionDropdown?: IDropdownOption, index?: number) => {
    let key = event.target["id"];
    let value = optionDropdown.key;
    let dropDownFormValues = { ...this.state.FormValues };

    switch (key) {
      case "ddlOnbStatus":
        dropDownFormValues.OnboardingStatus = value.toString();
        const selectedOption = dropDownFormValues.OnboardingStatus;
        let filterStatus
        if (selectedOption !== "") {
          if (selectedOption === "EA executed" || selectedOption === "Onboarding in progress" || selectedOption === "Onboarded" || selectedOption === "Offboarding") {
            filterStatus = this.state.eeStatusChoices.filter(option => option.text === "Active");
            dropDownFormValues.EEStatus = filterStatus[0].key;
          } else if (selectedOption === "New Project Close" || selectedOption === "Draft EA Sent to Client" || selectedOption === "Draft EA Approved by Client" || selectedOption === "Draft EA Sent to EE" || selectedOption == "EA Approved by EE" || selectedOption == "Execution Arranged") {
            filterStatus = this.state.eeStatusChoices.filter(option => option.text === "Onboarding");
            dropDownFormValues.EEStatus = filterStatus[0].key;
          } else if (selectedOption === "Lost/withdrawn") {
            filterStatus = this.state.eeStatusChoices.filter(option => option.text === "Cancel");
            dropDownFormValues.EEStatus = filterStatus[0].key;
          }
        }
        break;
      case "ddlEEStatus":
        dropDownFormValues.EEStatus = value.toString();
        break;
      case "ddlEmployeeCountry":
        dropDownFormValues.EmployeeCountry = value.toString();
        break;
    }
    this.setState({ FormValues: dropDownFormValues });
  };

  public StartDateChange = (date: Date) => {
    //  let selectedCurrDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    //let selectedCurrDate = moment(date).format('DD-MM-YYYY');
    let startDateDropdownChange = { ...this.state.FormValues };
    startDateDropdownChange.StartDate = date;
    this.setState({ FormValues: startDateDropdownChange });
  }

  public ExpectedEndDateChange = (date1: Date) => {
    //  let selectedExpectedEndDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    // let selectedExpectedEndDate = moment(date1).format('DD-MM-YYYY');
    let expectedEndDateDropdowmChange = { ...this.state.FormValues };
    expectedEndDateDropdowmChange.ExpectedEndDate = date1;
    this.setState({ FormValues: expectedEndDateDropdowmChange });
  }
  // public onFormatDate = (date?: Date): string => {
  //   return !date ? '' : date.getDate() + '-' + (date.getMonth() + 1) + '-' + (date.getFullYear() % 100);
  // };

  public FormValuesEditClickHandler = (item: any) => {
    var editItems = this.state.employeeFormValues.filter(it => it["ID"] == parseInt(item));
    var edit: EmployeeOnboarding = {
      Id: editItems[0].Id,
      Title: editItems[0].Title,
      EmployeeId: editItems[0].EmployeeId,
      EmployeeName: editItems[0].EmployeeName,
      OnboardingStatus: editItems[0].OnboardingStatus,
      EEStatus: editItems[0].EEStatus,
      StartDate: moment(editItems[0].StartDate).toDate(),
      ExpectedEndDate: moment(editItems[0].ExpectedEndDate).toDate(),
      EEEmail: editItems[0].EEEmail,
      EmployeeCountry: editItems[0].EmployeeCountry["Title"],
      //  EmployeeCountryKey: ""
    }
    this.setState({ FormValues: edit })
  }

  public eeStatusChanged = () => {
    this.state.onboardingStatusChoices
  }

  public render(): React.ReactElement<IEmployeeOnboardingFormProps> {
    const dropdownStyles: Partial<IDropdownStyles> = {
      callout: {
        maxHeight: 200, overflowY: 'scroll',
        selectors: {
          '.ms-Callout-main': {
            maxHeight: 'none !important',
            height: 'auto',
            width: ""
          }
        }
      },
      dropdown: { maxWidth: `${700}px` },
    };
    return (
      <>
        <div className="Container">
          <div className={styles.employeeOnboardingForm}>
            <div className={styles.container}>
              <div className='row'>
                <div className='col'>
                  <TextField
                    id="tbxEmpId"
                    label='Employee Id'
                    value={this.state.FormValues.EmployeeId}
                    onChange={this._textboxChanged}
                  ></TextField>
                </div>
                <div className='col'>
                  <TextField
                    id="tbxEmpNam"
                    label='EmployeeName'
                    value={this.state.FormValues.EmployeeName}
                    onChange={this._textboxChanged}
                  ></TextField>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <Dropdown
                    id='ddlOnbStatus'
                    placeholder='Select Onboarding Status'
                    label='OnboardingStatus'
                    styles={dropdownStyles}
                    options={this.state.onboardingStatusChoices}
                    selectedKey={this.state.FormValues.OnboardingStatus}
                    onChange={this._dropdownChange}
                  ></Dropdown>
                </div>
                <div className='col'>
                  <Dropdown
                    id='ddlEEStatus'
                    label='EE Status'
                    placeholder='Select EEStatus'
                    styles={dropdownStyles}
                    options={this.state.eeStatusChoices}
                    selectedKey={this.state.FormValues.EEStatus}
                    onChange={this._dropdownChange}
                  ></Dropdown>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <TextField
                    id="tbxWrkEml"
                    label='Work Email'
                    value={this.state.FormValues.EEEmail}
                    onChange={this._textboxChanged}
                  ></TextField>
                </div>
                <div className='col'>
                  <Dropdown
                    id='ddlEmployeeCountry'
                    label='Employee Country'
                    placeholder='Select Country'
                    styles={dropdownStyles}
                    options={this.state.countryFormValues}
                    selectedKey={this.state.FormValues.EmployeeCountry}
                    onChange={this._dropdownChange}
                  ></Dropdown>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <DatePicker
                    id='strDate'
                    label='Start Date'
                    placeholder='Select Start Date'
                    value={this.state.FormValues.StartDate}
                    // formatDate={this.onFormatDate}
                    onSelectDate={this.StartDateChange}
                  ></DatePicker>
                </div>
                <div className='col'>
                  <DatePicker
                    id='expEndDate'
                    label='Expected End Date'
                    placeholder='Select Expected End Date'
                    value={this.state.FormValues.ExpectedEndDate}
                    // formatDate={this.onFormatDate}
                    onSelectDate={this.ExpectedEndDateChange}
                  ></DatePicker>
                </div>
              </div>
              <div>
                <PrimaryButton style={{ marginTop: "20px" }} id="btnSave" text='Save' onClick={this.SubmitFormValue}>Save</PrimaryButton>
              </div>
              <div>
                <DataTable
                  FormValuesProps={this.state.employeeFormValues}
                  onEditClickHandler={this.FormValuesEditClickHandler}
                ></DataTable>
              </div>
            </div>
          </div>
        </div>
        <div>
         <TestDropdown description={''} context={this.props.context} numbers={[]} itemId={''} displayDeletebtn={false}></TestDropdown>
        </div>
      </>
    );
  }

}



