import "./style.css";
import Component from "./Component";
import Loader from "./loaders/Loader";
import Plane from "./objects/Plane";
import Cube from "./objects/Cube";

/**** 3D SCENE ****/
const loader = new Loader(0.8, 0.75);
loader.animate();

let plane = new Plane(5, 5, 10, 10);
plane.setLoader(loader);
plane.rotateX(Math.PI/2);

let cube = new Cube(1, 1, 0xff00ff);
cube.setLoader(loader);

/**** INTERFACES ****/
const chat = new Component("chat");
const inventory = new Component("inventory");
const minimap = new Component("minimap");

const test = new Component("test", chat);
test.setSize("25%", "25%");
test.setBackgroundColor("black");
test.setPosition("bottom right");

const test1 = new Component("test1", test);
test1.setSize("25%", "25%");
test1.setBackgroundColor("magenta");
test1.setPosition("bottom right");

chat.setSize("80%", "25%");
chat.setBackgroundColor("blue");
chat.setPosition("bottom left");
chat.setText("CHAT");

inventory.setSize("20%", "50%");
inventory.setBackgroundColor("red");
inventory.setPosition("right bottom");
inventory.setText("INVENTORY");

minimap.setSize("20%", "50%");
minimap.setBackgroundColor("green");
minimap.setPosition("top right");
minimap.setText("MINIMAP");

chat.buildComponent();
inventory.buildComponent();
minimap.buildComponent();