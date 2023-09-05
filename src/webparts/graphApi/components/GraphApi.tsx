import * as React from 'react';
import styles from './GraphApi.module.scss';
import { IGraphApiProps } from './IGraphApiProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { MSGraphClient } from '@microsoft/sp-http';
import { DetailsList, List, PrimaryButton } from 'office-ui-fabric-react';

export interface IUser {
  displayName: string;
  mail: string;
}
export interface IUserState {
  usersInformations: IUser[];
  usersListDetails: IUserListDetails[];
}
export interface IUserListDetails {
  UserloginId: string;
  PhoneNumber: string;
}

export default class GraphApi extends React.Component<IGraphApiProps, IUserState, {}> {
  constructor(props) {
    super(props)

    this.state = {
      usersInformations: [],
      usersListDetails: []

    }
  }
  public userInfo: IUser[] = [];
  public usersLoginDetails: IUserListDetails[] = [];
  public getUser = () => {
    this.props.context.msGraphClientFactory
      .getClient()
      .then((msGraphClient: MSGraphClient) => {
        msGraphClient.api("users").version("v1.0").select("displayName,mail")
          .get((err, res) => {
            if (err) {
              console.log("error occured", err);
            }
            console.log("error occured", err);
            console.log("Response", res);
            res.value.map((result) => {
              this.userInfo.push({
                displayName: result.displayName,
                mail: result.mail
              });
            });
            this.setState({ usersInformations: this.userInfo })
          })
      })
  }

  public getListData = (): void => {
    this.props.context.msGraphClientFactory.getClient()
      .then((msGraphClientUserInfo: MSGraphClient) => {
        msGraphClientUserInfo
          .api("sites/pcrp.sharepoint.com,4e266a26-d6d2-4284-ab77-3e6174e4e95e,6855601d-a7a5-4df4-bfe7-0c260e8872c4/lists/%7B3dfc1bb4-704f-4e95-96f8-cd8f91d553c6%7D/items")
          .expand("fields($select=UserloginId,PhoneNumber)")
          .version("v1.0")
          .get((err, res) => {
            if (err) {
              console.log("error", err);
            }
            console.log("result", res);
            res.value.map((result) => {
              this.usersLoginDetails.push({
                UserloginId: result.fields.UserloginId,
                PhoneNumber: result.fields.PhoneNumber
              })
            })
            this.setState({ usersListDetails: this.usersLoginDetails })
          })
      })
  }
  public render(): React.ReactElement<IGraphApiProps> {
    return (
      <div style={{width:"100%"}}>
        <div>
          <PrimaryButton
            text='Search Users'
            onClick={this.getUser}
          ></PrimaryButton>
        </div>
        <div>
          <DetailsList items={this.state.usersInformations} ></DetailsList>
        </div>
        <hr></hr>
        <div>
          <PrimaryButton
            text='Serarch List Data'
            onClick={this.getListData}
          ></PrimaryButton>
        </div>
        <div>
          <DetailsList items={this.state.usersListDetails} ></DetailsList>
        </div>
      </div>
    );
  }
}
