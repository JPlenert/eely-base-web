// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { h, Fragment } from "../features/preact";

export interface HeaderValueItemProps{
    headerText: string | Array<string>;
    value: string | Array<string>;
}

export function HeaderValueItem({headerText, value} : HeaderValueItemProps){
    let headerItems;
    let valueItems;
    if (Array.isArray(headerText) && Array.isArray(value)){
        headerItems = headerText.map(a => <div class="col pad-lr-1 row-header-content">{a}</div>);
        valueItems = value.map(a => <div class="col pad-lr-1"><div class="form-control text-center">{a}</div></div>);
    }
    else
    {
        headerItems = [<div class="col row-header-content">{headerText}</div>];
        valueItems = [<div class="col pad-lr-1"><div class="form-control text-center">{value}</div></div>];
    }

    return(
        <>
            <div class="row row-header">
                {headerItems}
            </div>
            <div class="row">
                {valueItems}
            </div>
      </>
    );
}