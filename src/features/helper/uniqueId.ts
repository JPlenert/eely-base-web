// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

/** @internal */
var globalId : number = 1;

export function getGlobalId() : number { return globalId++; }