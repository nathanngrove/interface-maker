export default class Component {
    #htmlNode = null;
    #id = "";
    #parent = null;
    #isChild = false;
    #stylesMap = new Map();
    #childComponents = new Array();

    constructor(id) {
        this.#id = id;
        this.#htmlNode = document.createElement("div");
        this.#htmlNode.id = this.#id;
    }

    addChild(childComponent) {
        childComponent.#parent = this.#id;
        childComponent.#isChild = true;
        this.#childComponents.push(childComponent);
    }

    getId() {
        return this.#id;
    }

    setText(text) {
        this.#htmlNode.innerHTML = text;
    }

    setSize(width, height) {
        this.#stylesMap.set("size", { "width": width, "height": height });
        this.#applySize(this.#htmlNode);
    }

    setBackgroundColor(color) {
        this.#stylesMap.set("backgroundColor", color);
        this.#applyBackgroundColor(this.#htmlNode);
    }

    setPosition(position) {
        this.#stylesMap.set("position", position);
        //resetPosition(this.node);
        this.#applyPosition(this.#htmlNode);
    }

    setZIndex(index) {
        this.#stylesMap.set("z-index", index);
        this.#applyZIndex(this.#htmlNode);
    }

    build() {
        this.#appendElement();
        this.#appendChildren();
    }

    #applyZIndex() {
        if(this.#stylesMap.has("z-index")) {
            this.#htmlNode.style.zIndex = this.#stylesMap.get("z-index");
        }
    }

    #applyBackgroundColor() {
        if(this.#stylesMap.has("backgroundColor")) {
            this.#htmlNode.style.backgroundColor = this.#stylesMap.get("backgroundColor");
        }
    }

    #applySize() {
        if(this.#stylesMap.has("size")) {
            this.#htmlNode.style.width = this.#stylesMap.get("size").width;
            this.#htmlNode.style.height = this.#stylesMap.get("size").height;
        }
    }

    #applyPosition() {
        if(this.#stylesMap.has("position")) {
            let positions = this.#stylesMap.get("position").split(" ");
            positions.forEach(pos => {
                switch(pos) {
                    case "bottom":
                        this.#htmlNode.style.position = "absolute";
                        this.#htmlNode.style.bottom = "0px";
                        break;
                    case "top":
                        this.#htmlNode.style.position = "absolute";
                        this.#htmlNode.style.top = "0px";
                        break;
                    case "right":
                        this.#htmlNode.style.position = "absolute";
                        this.#htmlNode.style.right = "0px";
                        break;
                    case "left":
                        this.#htmlNode.style.position = "absolute";
                        this.#htmlNode.style.left = "0px";
                        break;
                    case "vcenter":
                        this.#htmlNode.style.position = "absolute";
                        this.#htmlNode.style.top = "50%";
                        this.#htmlNode.style.transform = "translateY(-50%)";
                        break;
                    case "hcenter":
                        this.#htmlNode.style.position = "absolute";
                        this.#htmlNode.style.left = "50%";
                        this.#htmlNode.style.transform = "translateX(-50%)";
                        break;
                    default:
                        console.error(`Could not apply position to ${this.#id} because ${pos} is not a vaild position`);
                }
            });

            if (positions.find(pos => pos === "vcenter") != undefined && positions.find(pos => pos === "hcenter") != undefined) {
                this.#htmlNode.style.transform = "translate(-50%, -50%)";
            }
        }
    }

    #appendElement() {
        let parent;
        if(this.#isChild) {
            parent = document.getElementById(this.#parent);
        } else {
            parent = document.body;
        }
        parent.appendChild(this.#htmlNode);
    }

    #appendChildren() {
        if(this.#childComponents.length > 0) {
            this.#childComponents.forEach(child => child.build());
        }
    }
}