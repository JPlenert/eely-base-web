// Eely-Base-Web - (c) 2022-26 by Joerg Plenert | https://eely.eu

import { Component } from '../preact';
import { CubitBase } from './cubit';

interface CubitProviderProps<B extends CubitBase<S>, S> {
    type: (new () => B);
};

// Types for state
interface CubitProviderState {};

export class CubitProvider<B extends CubitBase<S>, S> extends Component<CubitProviderProps<B, S>, CubitProviderState>{
    protected _cubit : B | null = null;

    constructor(props: any) {
        super(props);   
        this._cubit = new this.props.type();
      }

      render() {
        return this.props.children;
      }
}