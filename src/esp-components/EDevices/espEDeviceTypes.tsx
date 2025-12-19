import { FormDropDown, FormDropDownItem } from "../../components/form/formDropDown"

export class EspEDeviceTypes{
    public static readonly TYPE_shelly_3em = "shelly_3em";
    public static readonly TYPE_shelly_em = "shelly_em";
    public static readonly TYPE_shelly_pro3em = "shelly_pro3em";
    public static readonly TYPE_shelly_proem = "shelly_proem";
    public static readonly TYPE_shelly_ht = "shelly_ht";
    public static readonly TYPE_shelly_plugs = "shelly_plugs";
    public static readonly TYPE_tibber_price = "tibber_price";


    public static getDDItems(typeFilter?: Array<string>) : Array<FormDropDownItem> {
        var ddItems: Array<FormDropDownItem> = [];

        if (typeFilter == null || typeFilter?.includes(this.TYPE_shelly_pro3em))
            ddItems.push(new FormDropDownItem("Shelly Pro 3EM", this.TYPE_shelly_pro3em));
        if (typeFilter == null || typeFilter?.includes(this.TYPE_shelly_proem))
            ddItems.push(new FormDropDownItem("Shelly Pro EM(-50)", this.TYPE_shelly_proem));
        if (typeFilter == null || typeFilter?.includes(this.TYPE_shelly_ht))
            ddItems.push(new FormDropDownItem("Shelly H&T", this.TYPE_shelly_ht));
        if (typeFilter == null || typeFilter?.includes(this.TYPE_shelly_plugs))
            ddItems.push(new FormDropDownItem("Shelly Plug S", this.TYPE_shelly_plugs));
        if (typeFilter == null || typeFilter?.includes(this.TYPE_tibber_price))
            ddItems.push(new FormDropDownItem("Tibber Prices", this.TYPE_tibber_price));
        if (typeFilter == null || typeFilter?.includes(this.TYPE_shelly_3em))
            ddItems.push(new FormDropDownItem("Shelly 3EM", this.TYPE_shelly_3em));
        if (typeFilter == null || typeFilter?.includes(this.TYPE_shelly_em))
            ddItems.push(new FormDropDownItem("Shelly EM", this.TYPE_shelly_em));

        return ddItems;
    }
}

