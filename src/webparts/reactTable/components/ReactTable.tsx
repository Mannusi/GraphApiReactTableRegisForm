import * as React from 'react';
import styles from './ReactTable.module.scss';
import { IReactTableProps } from './IReactTableProps';
import { escape } from '@microsoft/sp-lodash-subset';
import IReactTableState, { ReactTableValues } from './IReactTableState';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page } from '@syncfusion/ej2-react-grids';
import { ListOperation } from '../../../Domains/service';
import { SPComponentLoader } from '@microsoft/sp-loader';
SPComponentLoader.loadCss("https://cdn.syncfusion.com/ej2/21.1.35/material3.css");
SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");

export default class ReactTable extends React.Component<IReactTableProps, IReactTableState, {}> {
 private listoperation: ListOperation = null;
  constructor(props) {
    super(props)
    this.state ={
      data:[],

    }
    this.listoperation = new ListOperation();
  }

  public componentDidMount= async()=> {
     let bigData:any = await this.listoperation.GetAllItemsFromList("BigData","",[],[]);
     console.log(bigData);
     
     this.setState({data : bigData}); 
  }

  public render(): React.ReactElement<IReactTableProps> {
    return (
      <>

        <div className='control-pane'>
          <div className='control-section'>
            <GridComponent dataSource={this.state.data} allowPaging={true} pageSettings={{ pageCount: 5 }}>
              <ColumnsDirective>
                <ColumnDirective field='Title' headerText='Year' width='120' textAlign='Center'></ColumnDirective>
                <ColumnDirective field='field_1' headerText='Month' width='150' textAlign='Center'></ColumnDirective>
                <ColumnDirective field='field_2' headerText='Country' width='130' format='yMd' textAlign='Center' />
                <ColumnDirective field='field_3' headerText='Employee Name' width='120' format='C2' textAlign='Center' />
                <ColumnDirective field='field_4' headerText='Payroll Vendor' width='130' format='yMd' textAlign='Center'></ColumnDirective>
                <ColumnDirective field='field_5' headerText='EE Number' width='150' textAlign='Center'></ColumnDirective>
                <ColumnDirective field='field_6' headerText='Client' width='150' textAlign='Center'></ColumnDirective>
                <ColumnDirective field='field_7' headerText='EndClient' width='150' textAlign='Center'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Page]} />
            </GridComponent>
          </div>
        </div>

      </>
    );
  }
}
