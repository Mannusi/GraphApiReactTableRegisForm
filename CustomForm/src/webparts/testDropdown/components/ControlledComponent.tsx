import * as React from 'react';
import { ITestDropdownProps, ITestDropdownState } from './ITestDropdownProps';

export default class ControlledComponent extends React.Component<ITestDropdownProps, any>{


    constructor(props) {
        super(props)
        this.state = {
            personGoing: true,
            numberofPerson: 5
        }
    }
    public handleInputChange = (event) => {
         const target = event.target;
         const value = target.type === "Checkbox" ? target.checked:target.value;
         const name = target.name;
         this.setState({name: value})
    }


    render(): React.ReactElement<ITestDropdownProps> {
        return (
            <div>
                <form>
                    <h1>Handling Multiplre Input in Controlled Component</h1>
                    <label>Is Person going:
                        <input name="PersonGoing"
                            type="Checkbox"
                            checked={this.state.personGoing}
                            onChange={this.handleInputChange}>
                        </input></label> <br></br>
                    <label>Number of Persons:
                        <input name="numberofPerson"
                            type="number"
                            value={this.state.numberofPerson}
                            onChange={this.handleInputChange}
                        ></input>
                    </label>
                </form>
            </div>
        )
    }
}