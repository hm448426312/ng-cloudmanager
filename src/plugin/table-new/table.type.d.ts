export interface TableOptionsClass {
    checkbox?: boolean;
    maxHeight?: string;
    multiple?: boolean;
    minHeight?: string;
    loading?: boolean;
    showIndex?: boolean;
    keyId?: string;
    hideAllCheck?: boolean;
}
export interface TableFilterOptionClass {
    filterKey?: string;
    maxHeight?: string;
    keyId?: string;
}
export interface TableFilterOptionListClass {
    checked?: boolean;
    name?: string;
    index?: number;
}
export interface TableFilterClass {
    type: string;
    option?: TableFilterOptionClass;
    optionList?: TableFilterOptionListClass[];
    fn: Function;
    filterAllCheck?: any;
    defaultText?: any;
    defaultRadio?: any;
    hasFilter?: any;
    showFilterDrop?: boolean;
    placeholder?: string;
    selfCheck?: any;
    overShow?: boolean;
}
export interface TableHeaderClass {
    field: string;
    title: string;
    canSort?: boolean;
    defaultSort?: string;
    filter?: TableFilterClass;
    width?: string;
    flex?: string;
    isGroup?: boolean;
    alignTd?: string;
    alignTh?: string;
    hideHeaderGroup?: boolean;
}
