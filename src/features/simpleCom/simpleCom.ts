export class SimpleCom{
    private url: string;

    constructor(url: string | null){
        this.url = url ?? "com";
    }

    protected async post(request: any) : Promise<any>{
        let resp : Response = await fetch(this.url, { method: 'POST', body: JSON.stringify(request) });
        if (!resp.ok)
            throw new Error(resp.statusText);
        return resp.json();
    }

    public async restart() : Promise<void>{
        let controller = new AbortController();
        let signal = controller.signal;

        fetch(this.url, { method: 'POST', body: JSON.stringify({ ApiId: "Restart" }), signal: signal });
        // abort this fetch, as we will not get an answer and we should not retry to restart.
        setTimeout(() => {controller.abort();}, 3000);
    }

    public async wifi_settings_set(ssid: string, password: string) : Promise<void>{
        let req = { ApiId: "WifiSettingsSet",  ssid: ssid, password: password };
        return await this.post(req);
    }

    public async device_info_get() : Promise<any>{
        let req = { ApiId: "DeviceInfoGet" };
        return await this.post(req);
    }

    public async base_values_get() : Promise<any>{
        let req = { ApiId: "BaseValuesGet" };
        return await this.post(req);
    }

    // uploadLen = number of bytes of the full upload (all chunks). Only needed for chunk 0
    public async ota_upload(chunkNo: number, data: string, uploadLen: number) : Promise<any>{
        let req = { ApiId: "OtaUpload",  chunkNo: chunkNo, bin: data};
        if (uploadLen != 0)
            (<any>req).uploadLen = uploadLen;            
        return await this.post(req);
    }
}

export default SimpleCom;