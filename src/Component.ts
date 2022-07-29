export default class Component {
    
    /*
    MAKE EXPLICIT FUNCTIONS, I.E. onMouseOver, onClick, etc.

    setAction(listen : string, action : Function) {
        this.#htmlNode.addEventListener(listen, action);
    }
    */

    private htmlNode: HTMLElement;;
    private id : string = "";
    private parent : Component | null = null;
    private isHidden : boolean = false;
    private stylesMap : Map<string, Array<string>> = new Map();
    private childComponents : Array<Component> = new Array();

    constructor(id: string, parent? : Component) {
        this.id = id;
        this.htmlNode = document.createElement("div");
        parent ? parent.addChild(this) : this.parent = null;
        this.htmlNode.id = this.id;
    }

    public addChild(childComponent: Component) {
        childComponent.parent = this;
        this.childComponents.push(childComponent);
    }

    public getId() {
        return this.id;
    }
    
    public setText(text: string) {
        this.htmlNode.innerHTML = text;
    }

    public setSize(width: string, height: string) {
        this.stylesMap.set("size", [width, height]);
        this.applySize();
    }

    public setBackgroundColor(color: string) {
        this.stylesMap.set("backgroundColor", [color]);
        this.applyBackgroundColor();
    }

    private resetPosition() {
        this.htmlNode.style.position = "static";
        this.htmlNode.style.top = "";
        this.htmlNode.style.bottom = "";
        this.htmlNode.style.left = "";
        this.htmlNode.style.right = "";
    }

    public setPosition(position: string) {
        this.stylesMap.set("position", [position]);
        this.resetPosition();
        this.applyPosition();
    }

    public setZIndex(index: string) {
        this.stylesMap.set("z-index", [index]);
        this.applyZIndex();
    }

    public showComponent() {
        this.htmlNode.style.display = "none";
        this.isHidden = false;
    }

    public hideComponent() {
        this.htmlNode.style.display = "block";
        this.isHidden = true;
    }

    public removeComponent() {
        this.htmlNode.remove();
    }

    public buildComponent() {
        this.appendElement();
        this.appendChildren();
    }

    public toggleDisplay() {
        this.isHidden ? this.showComponent() : this.hideComponent();
    }

    private applyZIndex() {
        if(this.stylesMap.has("z-index")) {
            this.htmlNode.style.zIndex = this.stylesMap.get("z-index")![0];
        }
    }

    private applyBackgroundColor() {
        if(this.stylesMap.has("backgroundColor")) {
            this.htmlNode.style.backgroundColor = this.stylesMap.get("backgroundColor")![0];
        }
    }

    private applySize() {
        if(this.stylesMap.has("size")) {
            this.htmlNode.style.width = this.stylesMap.get("size")![0];
            this.htmlNode.style.height = this.stylesMap.get("size")![1];
        }
    }

    private applyPosition() {
        if(this.stylesMap.has("position")) {
            let positions : Array<string> = this.stylesMap.get("position")![0].split(" ");
            positions.forEach(pos => {
                switch(pos) {
                    case "bottom":
                        this.htmlNode.style.position = "absolute";
                        this.htmlNode.style.bottom = "0px";
                        break;
                    case "top":
                        this.htmlNode.style.position = "absolute";
                        this.htmlNode.style.top = "0px";
                        break;
                    case "right":
                        this.htmlNode.style.position = "absolute";
                        this.htmlNode.style.right = "0px";
                        break;
                    case "left":
                        this.htmlNode.style.position = "absolute";
                        this.htmlNode.style.left = "0px";
                        break;
                    case "vcenter":
                        this.htmlNode.style.position = "absolute";
                        this.htmlNode.style.top = "50%";
                        this.htmlNode.style.transform = "translateY(-50%)";
                        break;
                    case "hcenter":
                        this.htmlNode.style.position = "absolute";
                        this.htmlNode.style.left = "50%";
                        this.htmlNode.style.transform = "translateX(-50%)";
                        break;
                    default:
                        console.error(`Could not apply position to ${this.id} because ${pos} is not a vaild position`);
                }
            });

            if (positions.find(pos => pos === "vcenter") != undefined && positions.find(pos => pos === "hcenter") != undefined) {
                this.htmlNode.style.transform = "translate(-50%, -50%)";
            }
        }
    }

    private appendElement() {
        let parent : HTMLElement | null;
        if(this.parent) {
            parent = document.getElementById(this.parent.getId());
        } else {
            parent = document.body;
        }
        parent!.appendChild(this.htmlNode);
    }

    private appendChildren() {
        if(this.childComponents.length > 0) {
            this.childComponents.forEach(child => child.buildComponent());
        }
    }
}