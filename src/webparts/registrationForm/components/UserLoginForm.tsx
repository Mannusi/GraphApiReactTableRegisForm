import * as React from 'react';
import styles from './RegistrationForm.module.scss';
import { IRegistrationFormProps } from './IRegistrationFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListOperation } from '../../../Domains/service';
import ILoginUserState from './ILoginUserState';
import { RegistrationFormValue } from './IRegistrationFormValues';
import UserProfile from './UserProfileComponenet/UserProfile';
import { sp } from '@pnp/sp/presets/all';
require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
import 'office-ui-fabric-react/dist/css/fabric.css';

export default class RegistrationForm extends React.Component<IRegistrationFormProps, ILoginUserState> {
  private _listService: ListOperation;


  constructor(props) {
    super(props)

    this.state = {
      userDetailsArray: [],
      emailValue: "",
      passwordValue: "",
      isLoginRequired: false,
      userDetailsValues: [],
      userProfile: []

    }
    this._listService = new ListOperation()
  }


  public componentDidMount = async () => {
    let userDetails: any = await this._listService.GetAllItemsFromList("UserLoginList", "", [], [])
    this.setState({ userDetailsArray: userDetails })
    console.log(this.state.userDetailsArray);
  }


  public inputChangeHandler = (event) => {
    if (event.target.id === "email") {
      this.setState({ emailValue: event.target.value });
    } else {
      this.setState({ passwordValue: event.target.value })
    }
  }

  public onSubmit = async (e) => {
    e.preventDefault()
    var isLogin = this.state.userDetailsArray.some(item => item["UserloginId"] === this.state.emailValue && item["Password"] === this.state.passwordValue);
    var currentUser = this.state.userDetailsArray.filter(item => item["UserloginId"] === this.state.emailValue)[0];
    var userNameDoc: string = this.state.userDetailsValues["UserName"];
    const serverRelatedPath = this.props.context.pageContext.web.serverRelativeUrl + "/Shared Documents/MyImage/" + userNameDoc;
    console.log(currentUser);
    if (isLogin) {
      try {
          let userImage = await sp.web.getFolderByServerRelativePath(serverRelatedPath).files.get();
          console.log(userImage)
          this.setState({isLoginRequired: isLogin, userDetailsValues: currentUser, userProfile: userImage })
          alert("Login Successfully")
        
        // let userImage = await sp.web.getFolderByServerRelativeUrl("sites/Manishdev/ReportsUpload").expand("Folders,Files").files.get();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Login Failure");
    }
  }

  public render(): React.ReactElement<IRegistrationFormProps> {
    return (
      <div>
        <div className="container" style={{width:"900px"}}>
          <h2>Login form</h2>
          <form  className="form-horizontal" action="/action_page.php" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="email">
                Email:
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={this.inputChangeHandler}
                  value={this.state.emailValue}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="pwd">
                Password:
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Enter password"
                  name="pwd"
                  onChange={this.inputChangeHandler}
                  value={this.state.passwordValue}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <div className="checkbox">
                  <label>
                    <input type="checkbox" name="remember" /> Remember me
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default" style={{ backgroundColor: "darkgray" }}>
                  Submit
                </button>
                <div className="float-sm-right">
                  <button className="btn btn-default" style={{ backgroundColor: "darkgray" }} onClick={this.props.backToRegistration}>Back</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <hr></hr>
        <div>
          {
            this.state.isLoginRequired === true ? <UserProfile context={this.props.context}
              description={''}
              backToRegistration={function (): void { throw new Error('Function not implemented.'); }}
              userProfile={this.state.userProfile} 
              emailValue={''}
              userDetailsValues ={this.state.userDetailsValues}
              >
              </UserProfile> : null
          }
        </div>
      </div>
    );
  }
}
