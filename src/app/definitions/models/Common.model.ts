import { filteringOperationType, filteringOrderType } from "./DataTypes.model";

export class ListResultModel {
    CurrentPage: number;
    TotalPages: number;
    PageSize: number;
    TotalCount: number;
    HasPrevious: boolean;
    HasNext: boolean;
    Items: any[];
}

export class FilteringModel {
    PageNumber: number = 1;
    PageSize: number = 50;
    SearchValue: string = '';
    Conditions: FilteringConditionModel[] = [];
    Orders: FilteringOrderModel[] = [];

    AddCondition(key: string, value: any, operation: filteringOperationType) {
        this.RemoveCondition(key);
        this.Conditions.push({ Key: key, Value: value, Operation: operation });
    }
    RemoveCondition(key: string) {
        this.Conditions = this.Conditions.filter(x => x.Key !== key);
    }

    AddOrder(key: string, orderType: filteringOrderType) {
        this.RemoveOrder(key);
        this.Orders.push({ Key: key, OrderType: orderType });
    }
    RemoveOrder(key: string) {
        this.Orders = this.Orders.filter(x => x.Key !== key);
    }
}

export class FilteringConditionModel {
    Key: string = "";
    Value: any = null;
    Operation: filteringOperationType;
}

export class FilteringOrderModel {
    Key: string = "";
    OrderType: filteringOrderType
}

export class KeyValueModel {
    "Key": string;
    "Value": any;
}

export class ScrollableTabModel {
    "title": string;
    "value": any;
    "actionUrl": string | any;
}

export class SliderModel {
    "title": string;
    "fileType": any;
    "fileUrl": string;
    "actionUrl": string;
}

export class MenuModel {
    "title": string;
    "type": 'page' | 'iframe';
    "url": string;
    "icon": string;
    "code": string;
    "id": string;
}
