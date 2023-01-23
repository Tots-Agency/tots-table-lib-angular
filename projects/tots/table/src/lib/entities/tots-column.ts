export class TotsColumn {
    key: string = '';
    title: string = '';
    field_key?: string|Array<string>;
    component: any;
    extra?: any;
    is_show?: boolean = true;

    hasOrder?: boolean = false;
    order?: 'asc'|'desc';
}