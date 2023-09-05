import * as React from 'react';
import { ITestDropdownProps } from './ITestDropdownProps';
import DisplayBtn from './DisplayBtn';

export default class Map extends React.Component<ITestDropdownProps, any> {


  constructor(props) {
    super(props)

    this.state = {
      displayDeletebtn: false,
    }
  }
  public displayDelete = (event) => {
    let theValueChecked = event.target.checked;
    this.setState({ displayDeletebtn: theValueChecked });
  }

  public render(): React.ReactElement<ITestDropdownProps> {
    return (
      <>
        {
          this.props.numbers.map(item => {
            return (
              <>
                <div>
                  <tr>
                    <td>
                      <input type='checkbox' onClick={this.displayDelete}></input>
                    </td>
                    <td>
                      <h3>{item}</h3>
                    </td>
                    {  this.state.displayDeletebtn ?
                      <td>
                        <DisplayBtn displayDeletebtn={this.state.displayDeletebtn} itemId={item.Id} description={''} context={this.props.context} numbers={[]} ></DisplayBtn>
                      </td>:null
                    }

                  </tr>
                </div>
              </>
            )
          })
        }
      </>
    )
  }
}