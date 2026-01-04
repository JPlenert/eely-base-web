// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { CubitBase } from './cubit'
import { Component } from '../preact'

export interface CubitComponent<B extends CubitBase<S>, S> extends Component{
    // ToDo: Consume multiple cubits =>Split CubitComponent in CubitProviderComponent and CubitConsumerComponent
    // ToDo: Provide multiple cubits (Multi provider)
    _cubit: B | undefined;
}

// I was unable to use Component and VNode from preact/internal
export interface VNodeInt<B extends CubitBase<S>, S> {
    _parent: VNodeInt<B, S> | null;
    _component: Component & CubitComponent<B, S> | null;
}

export interface ComponentInt<B extends CubitBase<S>, S> extends Component{
    _vnode?: VNodeInt<B, S> | null;
}

export function registerCubitAndUnsubscribeHandler<B extends CubitBase<S>, S>(com: CubitComponent<B, S>, cubit: B){
    // build ref to cubit
    com._cubit = cubit;
    com._cubit?.subscribe(com);
    
    // Handle unsubscribe
    const oldUnmount = com.componentWillUnmount;
    com.componentWillUnmount = () => {

        if (com._cubit != undefined){
            com._cubit.unsubscribe(com);
            com._cubit = undefined;
        }

        if (oldUnmount){
            oldUnmount();
        }
    }
}

