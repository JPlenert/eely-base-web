// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { Component } from '../preact';
import { CubitBase } from './cubit';
import { CubitComponent, registerCubitAndUnsubscribeHandler, ComponentInt } from './helper';
import { CubitProvider } from './cubitProvider';

function findCubitProvider<B extends CubitBase<S>, S>(com: Component, type: (new () => B)) : Component & CubitComponent<B, S> | undefined{
    let icom = <ComponentInt<B, S>> com;
    var curVNode = icom._vnode;    

    while (curVNode != undefined){
        if (curVNode._component != undefined && 
            curVNode._component._cubit != undefined && 
            curVNode._component instanceof CubitProvider &&
            curVNode._component._cubit instanceof type)
        {
            return curVNode._component;
        }
        curVNode = curVNode._parent;
    }

    return undefined;
}

export function tryRegisterCubit<B extends CubitBase<S>, S>(com: Component, cubit: B): B{
    let cubitCom = <CubitComponent<B, S>>com;

    if (cubitCom._cubit == undefined){
        registerCubitAndUnsubscribeHandler<B, S>(cubitCom, cubit);
    }else {
        if (cubitCom._cubit !== cubit)
            throw new Error(`Another cubit is already registered. Unable to use more then one cubit`);
    }

    return cubitCom._cubit!;
}

export function findAndTryRegisterCubit<B extends CubitBase<S>, S>(com: Component, type: (new () => B)): B {
    let cubitCom = <CubitComponent<B, S>>com;

    if (cubitCom._cubit == undefined){
        let foundProvider = findCubitProvider<B, S>(com, type);
        if (foundProvider == undefined){
            throw new Error(`Unable to find provider for ${type}`);
        }

        registerCubitAndUnsubscribeHandler<B, S>(cubitCom, foundProvider._cubit!);
    }else {
        if (!(cubitCom._cubit! instanceof type))
            throw new Error(`Another cubit is already registered. Unable to use more then one cubit`);
    }

    return cubitCom._cubit!;
}

export function findCubit<B extends CubitBase<S>, S>(com: Component, type: (new () => B)): B | undefined{
    let foundProvider = findCubitProvider<B, S>(com, type);
    if (foundProvider == undefined)
        return undefined;

    return foundProvider._cubit;
}

