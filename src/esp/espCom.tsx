import { SimpleCom } from '../features/simpleCom/simpleCom'

export class EspCom extends SimpleCom{

    constructor(url : string | null = null) {
        super(url);
    }

    public async configGet() : Promise<any>{
        let req = { ApiId: "ConfigGet" };
        return (await this.post(req)).config;
    }

    public async configSet(config: any) : Promise<any>{
        let req = { ApiId: "ConfigSet", config: config};
        return await this.post(req);
    }
}