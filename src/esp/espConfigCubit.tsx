import { CubitBase } from "../features/cubit/cubit"
import { EspCom } from '../esp/espCom'
import { ModalBox } from "../components/modal/modalBox";

export class EspConfigState {
    static readonly ConfigState_Reading = 0; 
    static readonly ConfigState_Ready = 1; 
    static readonly ConfigState_Writing = 2; 
    static readonly ConfigState_NeedReset = 3; 

    private _state: number;

    constructor(newState : number){
        this._state = newState;
    }

    public get state(){
        return this._state;
    }
}

export class EspConfigCubit extends CubitBase<EspConfigState>{
  private _espConfig : any;
  private _espCom : EspCom;

  constructor(espCom : EspCom) {
    super(new EspConfigState(EspConfigState.ConfigState_Ready));
    this._espCom = espCom;
  }

  public async getConfig() : Promise<any>{
    this.emit(new EspConfigState(EspConfigState.ConfigState_Reading));

    this._espConfig = await this._espCom.configGet();

    this.emit(new EspConfigState(EspConfigState.ConfigState_Ready));

    return this._espConfig;
  }

  public async setConfig(config: any = null) : Promise<any>{
    this.emit(new EspConfigState(EspConfigState.ConfigState_Writing));

    if (config != null)
      this._espConfig = config;
    
    await this._espCom.configSet(this._espConfig);

    this.emit(new EspConfigState(EspConfigState.ConfigState_NeedReset));
  } 

  public resetDeviceAndShowModalBox(resetText: string) : void
  {
    this._espCom.restart();
    // "Device will reset now and try to connect to the given Wifi."
    ModalBox.show("Resetting ....", resetText, false);
  }

  public get config(){
    return this._espConfig;
  }
}