export interface EspEDeviceInfo{
    device_last_error: string;
    device_name: string;
    device_id: string;
}

export interface EspEDeviceConfig{
    type: string;
    name: string;
}

export interface EspEDeviceShellyConfig extends EspEDeviceConfig{
    id: string;
    access: string;
    host: string;
    username: string;
    password: string;
}
