import * as React from 'react';
import styles from './TestDropdown.module.scss';
import { ITestDropdownProps,ITestDropdownState } from './ITestDropdownProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IListOperationService, ListOperationService } from '../../../Domain/Service';
import { ListNames } from '../../employeeOnboardingForm/components/Constant';
import { Dropdown, IDropdownOption, PrimaryButton } from 'office-ui-fabric-react';
import Stateconcept from './Stateconcept';
import ControlledComponent from './ControlledComponent';
import Map from './Map';


const dropdownControlledExampleOptions = [
  { key: 'fruitsHeader', text: 'Fruits',  },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-',  },
  { key: 'vegetablesHeader', text: 'Vegetables', },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];


export default class TestDropdown extends React.Component<ITestDropdownProps, ITestDropdownState,{}> {

  private _listService: IListOperationService = null;
  constructor(props) {
    super(props)
    this.state = {
      countryFormValues: [],
      countrySelectedKey:0,
     
      
    }
    this._listService = new ListOperationService();
  }


 public componentDidMount = async()=>{ 
  let countryList: any[] = await this._listService.GetAllItemsFromList(ListNames.Country, "", ["Title", "Id"], []);
  // let number = [1,2,3,4,5]
  this.setState({
   
    countryFormValues: countryList.map(it => ({ key: it["Id"], text: it["Title"] })),
   
   //countryFormValues: dropdownControlledExampleOptions

  });
  }

  private _dropdownChange=(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    this.setState({ countrySelectedKey:parseInt(option.key.toString()) });
  }
  
  public render(): React.ReactElement<ITestDropdownProps> {
    
    return (
      <div className={ styles.testDropdown }>
        <div className={ styles.container }>
        <Dropdown
                id='ddlEmployeeCountry'
                label='Employee Country'
                placeholder='Select Country'             
                options={this.state.countryFormValues}
                selectedKey={this.state.countrySelectedKey}
                onChange={this._dropdownChange}
         ></Dropdown>
        </div>
        <PrimaryButton onClick={()=>this.setState({countrySelectedKey:2}) }>India</PrimaryButton>
        <div>
          <Stateconcept  numbers={[]} description={''} context={this.props.context} itemId={''} displayDeletebtn={false}></Stateconcept>
        </div>
        <div>
          <ControlledComponent   numbers={[]} description={''} context={this.props.context} itemId={''} displayDeletebtn={false}   ></ControlledComponent>
        </div>
        <div>
          <Map  numbers={[1, 2, 3, 4, 5]} context={this.props.context} description={''} itemId={''} displayDeletebtn={false}></Map>
        </div>
      </div>
    );
  }
}



