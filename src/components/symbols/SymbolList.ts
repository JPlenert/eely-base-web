
export abstract class SymbolInfo{
    id: string;
    viewbox: string;
    pathes: string[];
    extPathes: [string, string][][];

    constructor(id: string, viewbox: string, pathes?: string[], extPathes?: [string, string][][]) {
        this.id = id;
        this.viewbox = viewbox;
        this.pathes = pathes;
        this.extPathes = extPathes;
    }
}

export class SymbolList{
    idList: string[];
    svgRoot?: SVGElement;
    //svgRoot?: HTMLElement;

    constructor(){
        this.idList = [];
    }

    init() : void{
        this.svgRoot = <SVGElement><unknown>document.getElementById("svgRoot");
        if (this.svgRoot == null)
        {
            this.svgRoot = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.svgRoot.setAttribute("xmlns", "http://www.w3.org/2000/svg")
            this.svgRoot.style = "display:none";
            document.body.appendChild(this.svgRoot);
        }
    }

    addSvgInfo(id: string, viewbox: string, pathes: string[]){
        var sym = document.createElementNS("http://www.w3.org/2000/svg", "symbol");
        sym.setAttribute("id", id);
        sym.setAttribute("viewBox", viewbox);
        pathes.forEach(pathString => {
            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", pathString);
            sym.appendChild(path);
        });
        this.svgRoot!.appendChild(sym);   
    }

    addSvg(sy : SymbolInfo) : void{
        var sym = document.createElementNS("http://www.w3.org/2000/svg", "symbol");
        sym.setAttribute("id", sy.id);
        sym.setAttribute("viewBox", sy.viewbox);
        if (sy.pathes !== undefined) {
            sy.pathes.forEach(pathString => {
                var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", pathString);
                sym.appendChild(path);
            });
        }
        if (sy.extPathes !== undefined) {
            sy.extPathes.forEach(pathItems => {
                var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

                pathItems.forEach(pathItem => {
                    path.setAttribute(pathItem[0], pathItem[1]);
                });
                sym.appendChild(path);
            });
        }

        this.svgRoot!.appendChild(sym);   
    }
}

export var symbolList = new SymbolList();
