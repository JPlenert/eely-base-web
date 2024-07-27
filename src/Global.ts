// Eelybase - (c) 2022-24 by Joerg Plenert | https://eely.eu
class Global{
    public com: Com;
    public deviceVersion: string;
    protected nextControlId: number;
    // Base element
    public body: Body;

    constructor(url: string){
        this.com = new Com(url);
        this.nextControlId = 1;
    }
    
    getNextControlId(): string{
        return "c"+(this.nextControlId++).toString();
    }
}

var global : Global;
