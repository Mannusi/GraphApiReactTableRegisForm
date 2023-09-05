import * as React from 'react';
import { IRegistrationFormProps } from './IRegistrationFormProps';
import UserLoginForm from './UserLoginForm';
import ILoginUserState from './ILoginUserState';
import UserProfile from '../components/UserProfileComponenet/UserProfile';
import { RegistrationFormValue } from './IRegistrationFormValues';
import { IRegistrationState } from './IRegistrationState';
import { ListOperation } from '../../../Domains/service';
import { render } from 'react-dom';
import { ActionButton } from 'office-ui-fabric-react';

export default class RegistrationForm extends React.Component<IRegistrationFormProps, IRegistrationState> {
  private _listService: ListOperation = null;

  constructor(props) {
    super(props)
    this.state = {
      errorMessage: false,
      loadLoginForm: false,
      formValues: new RegistrationFormValue(),
      isValidForm: true
    };
    this._listService = new ListOperation();
  };
  public textInputChangeHandler = (event) => {
    let value = event.target.value;
    let id = event.target.id;
    let txtValue = { ...this.state.formValues };
    switch (id) {
      case "tbx-Name":
        txtValue.userName = value;
        break;
      case "tbx-email":
        txtValue.yourEmail = value;
        break;
      case "tbx-PhoneNum":
        txtValue.phoneNumber = value;
        break;
      case "tbx-YourPass":
        txtValue.password = value;
        break;
      case "tbx-ConfirmPass":
        txtValue.confirmPassword = value;
        break;
    }
    this.setState({ formValues: txtValue });
  };

  public isEmail(value: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  }

  public onSubmitData = async () => {

    if (this.isEmail(this.state.formValues.yourEmail) && this.state.formValues.yourEmail != "" && this.state.formValues != null) {
      if (this.state.formValues.password === this.state.formValues.confirmPassword) {
        let item: any = {
          "UserName": this.state.formValues.userName,
          "UserloginId": this.state.formValues.yourEmail,
          "PhoneNumber": this.state.formValues.phoneNumber,
          "Password": this.state.formValues.password,
          "ConfirmPassword": this.state.formValues.confirmPassword
        }
        await this._listService.AddItemToList("UserLoginList", item);
        this.setState({ formValues: new RegistrationFormValue(), errorMessage: false });
      } else {
        this.setState({ errorMessage: true })
      }
    } else {
      this.setState({ isValidForm: false });
    }
  }

  public loadLoginForm = async (e) => {
    this.setState({ loadLoginForm: true })
    // e.preventdefault();
  }

  public backToRegistration = () => {
    this.setState({ loadLoginForm: false })
  }

  render() {
    return (
      <>
        {
          this.state.loadLoginForm == true ? <UserLoginForm description={''} context={this.props.context} backToRegistration={this.backToRegistration} emailValue={''} userProfile={[]} userDetailsValues={[]}></UserLoginForm> :
            <div className="container register-form">
              <div className="form">
                <div className="note">
                </div>
                <div className="form-content">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div className="form-group">
                        <label className="control-label col"> Your Name:
                          <input
                            id="tbx-Name"
                            type="text"
                            className="form-control"
                            placeholder="Name *"
                            onChange={this.textInputChangeHandler}
                            value={this.state.formValues.userName}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div className="form-group">
                        <label className="control-label col"> Your emailId:
                          <input
                            id="tbx-email"
                            type="text"
                            className="form-control"
                            placeholder="Your Email *"
                            onChange={this.textInputChangeHandler}
                            value={this.state.formValues.yourEmail}
                          />
                        </label>
                        {
                          !this.state.isValidForm ? <p>
                            <sub style={{ color: "red" }}>Provide valid email</sub>
                          </p> : ""
                        }
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div className="form-group">
                        <label className="control-label col"> Your Phone:
                          <input
                            id="tbx-PhoneNum"
                            type="text"
                            className="form-control"
                            placeholder="Phone Number *"
                            onChange={this.textInputChangeHandler}
                            value={this.state.formValues.phoneNumber}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div className="form-group">
                        <label className="control-label col" htmlFor="pwd">
                          Password:
                          <input
                            id="tbx-YourPass"
                            type="text"
                            className="form-control"
                            placeholder="Your Password *"
                            onChange={this.textInputChangeHandler}
                            value={this.state.formValues.password}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div className="form-group">
                        <label className="control-label col" htmlFor="pwd">
                          Confirm Password:
                          <input
                            id="tbx-ConfirmPass"
                            type="text"
                            className="form-control"
                            placeholder="Confirm Password *"
                            onChange={this.textInputChangeHandler}
                            value={this.state.formValues.confirmPassword}
                          />
                        </label>
                        {
                          this.state.errorMessage ? <p>
                            <sub style={{ color: "red" }}>Password does not match</sub>
                          </p> : ""
                        }

                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className='row'>
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="submit" className="btn btn-default" style={{ backgroundColor: "darkgray" }} onClick={this.onSubmitData}>
                        Submit
                      </button>
                      <div className="float-sm-right">
                        <ActionButton onClick={this.loadLoginForm}>Login In</ActionButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }

      </>
    )
  }
}

