// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { Component } from '../preact'

export abstract class CubitBase<S>{
    protected _state: S;
    /** @internal */
    private _subscriptions: Set<Component> = new Set();

    public get state() : S { return this._state; }

    constructor(state: S){
        this._state = state;
    }

    /** @internal */
    public unsubscribe(com: Component) : void{
        this._subscriptions.delete(com);
    }

    /** @internal */
    public subscribe(com: Component) : void{
        this._subscriptions.add(com);
    }

    protected emit(newState : S): void{
        this._state = newState;
        this._subscriptions.forEach(com => com.setState({}));
    }    
}