
import * as React from 'react';
import { IFileInfo, sp } from "@pnp/sp/presets/all";
import { IUserProfileValues, IUserState, UserProfileValues } from './IUserState';
import { IRegistrationFormProps } from '../IRegistrationFormProps';
import ImageUploader from 'react-images-upload';

export default class UserProfile extends React.Component<IRegistrationFormProps, IUserState> {

  constructor(props) {
    super(props)
    this.state = {
      userData: new UserProfileValues(),
    }
  }

  public componentDidMount = async () => {

  }

  public onDrop = (files: File[], pictures: string[]) => {
    const userDocName = this.props.userDetailsValues["UserName"];
    const serverRelatedPath = this.props.context.pageContext.web.serverRelativeUrl + "/Shared Documents/MyImage/" + userDocName;
    for (let i = 0; i < files.length; i++) {
      var fileName = files[i].name;
      console.log(files);
      console.log(pictures);
      if (files[i].size < 5000000)
        sp.web.getFolderByServerRelativeUrl(serverRelatedPath).files.add(fileName, files[i], true)
        .then(() => {
          f => {
            f.files[i].getItem().then(item => {
              item.update({
                
              }).then((myUpdate) => {
                console.log(myUpdate);
              })
            })
          }
        });
    }
  };

  render() {

    return (
      <>
        {
          this.props.userProfile.map(user => {
            return (
              <>
                <div className="col d-flex justify-content-center">
                  <div className="card" style={{ width: "18rem" }}>
                    <img src={user.ServerRelativeUrl} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{user.Name}</h5>
                      <p className="card-text">
                        {user.TimeCreated}
                      </p>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </>
            )
          })
        }
        <div>
          <ImageUploader
            withIcon={false}
            buttonText='upload images'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
          />
        </div>
      </>
    )
  }
}


