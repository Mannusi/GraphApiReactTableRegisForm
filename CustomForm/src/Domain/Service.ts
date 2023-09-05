import * as React from 'react';
import {sp} from "@pnp/sp/presets/all";
import { IItem, IItemAddResult, IItemUpdateResult } from "@pnp/sp/items";
import { IField, IFileAddResult, IFolder } from "@pnp/sp/presets/all";
import { selectProperties } from 'office-ui-fabric-react';


export interface IListOperationService {
    AddItemsToList: (listName: String, item: any) => Promise<any>;
    GetAllItemsFromList: (listName: String, filter: String, Select: String[], expand: String[]) => Promise<any>;
    GetListField:(listName:string,fieldName:string)=>Promise<IField>;
}


export class ListOperationService implements IListOperationService {

    public async AddItemsToList(listName: string, item: any): Promise<any> {
        let result: IItemAddResult = await sp.web.lists.getByTitle(listName).items.add(item);
        return result;
    }
    public async GetAllItemsFromList(_listName: string, filter: string = "", _Select: string[] = [], expand: string[] = []): Promise<any> {
        let items = await sp.web.lists.getByTitle(_listName).items;
        if (filter != "") {
            items = items.filter(filter);
        }
        if (expand.length > 0) {
            items = items.expand(...expand);
        }
        if (_Select.length > 0) {
            items = items.select(..._Select)
        }
        return items.getAll();
    }
    public async GetListField (listName: string, fieldName: string): Promise<IField> {
        return await sp.web.lists.getByTitle(listName).fields.getByInternalNameOrTitle(fieldName).get();
    }
}
