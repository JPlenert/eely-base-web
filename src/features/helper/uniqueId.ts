/** @internal */
var globalId : number = 1;

export function getGlobalId() : number { return globalId++; }