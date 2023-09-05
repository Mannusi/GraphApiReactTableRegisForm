import * as React from 'react';
import { ITestDropdownProps } from './ITestDropdownProps';

export default class DisplayBtn extends React.Component<ITestDropdownProps, any> {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    // public displayDelete = (event) => {
    //     let theValueChecked = event.target.checked;
    //     console.log(theValueChecked);
    //     this.setState({ displayDeletebtn: theValueChecked });

    //   }
    render() {
        return (
            <>
                <div>
                    <button>Delete</button>
                
                </div>
            </>
        )
    }
}
