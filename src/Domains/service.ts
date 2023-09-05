import { sp } from "@pnp/sp/presets/all";
import { IItemAddResult } from "@pnp/sp/items";

export interface IListOperation {
    AddItemToList: (listName: string, item: any) => Promise<any>;
    GetAllItemsFromList: (listName: string, filter: string, Select: string[], expand: string[]) => Promise<any>;
    GetListField: (listName: string, fieldName: string, Select: string) => Promise<any>;
}

export class ListOperation implements IListOperation {
    public async AddItemToList(listName: string, item: any): Promise<any> {
        let result: IItemAddResult = await sp.web.lists.getByTitle(listName).items.add(item);
        return result;
    }

    public async GetAllItemsFromList(listName: string, filter: string = "", Select: string[] = [], expand: string[] = []): Promise<any> {
        let items = await sp.web.lists.getByTitle(listName).items;
        if (filter != "") {
            items = items.filter(filter)
        }
        if (expand.length > 0) {
            items = items.expand(...expand)
        }
        if (Select.length > 0) {
            items = items.select(...Select)
        }
        return items.getAll();

    }

    public async GetListField(listName: string, fieldName: string): Promise<any> {
       return await sp.web.lists.getByTitle(listName).fields.getByInternalNameOrTitle(fieldName).get();
    }
}
