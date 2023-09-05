import * as React from 'react';
import { ITestDropdownProps, ITestDropdownState } from './ITestDropdownProps';

export default class Stateconcept extends React.Component<ITestDropdownProps,any>{


    constructor(props) {
        super(props)

        this.state = {
            displayBio: false
        }
    }
    public toggleDisplayBio = () => {
        this.setState({ displayBio: !this.state.displayBio });
    }

    render(): React.ReactElement<ITestDropdownProps> {
        return (
            <div>
                <h1>Welcome to Learn State Concept</h1>
                {
                    this.state.displayBio ? (
                        <div>
                            <p>
                                <h4>
                                    Learn React using javapoint
                                </h4>
                            </p>
                            <button onClick={this.toggleDisplayBio}>Show Less</button>
                        </div>

                    ) : (
                        <div>
                            <button onClick={this.toggleDisplayBio}>Read More</button>
                        </div>
                    )
                }
            </div>
        )
    }
}