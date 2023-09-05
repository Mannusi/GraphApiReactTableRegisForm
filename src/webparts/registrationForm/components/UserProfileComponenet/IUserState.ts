import { IFileInfo } from "@pnp/sp/presets/all";

export interface IUserState {
    userData: UserProfileValues
}

export interface IUserProfileValues {
    ServerRelativeUrl: string;
    Name: string;
}

export class UserProfileValues implements IUserProfileValues {
    public ServerRelativeUrl: string = "";
    public Name: string = "";
}