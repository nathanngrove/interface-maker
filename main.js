import Component from "./src/Component";
import './styles/styles.css';
import { setGameScene, initGameScene, animateCube, onWindowResize } from "./src/GameScene";

/*
Pop-up window (Click and a interface pops up)
Buttons
*/

const chat = new Component("chat");
const inventory = new Component("inventory");
const minimap = new Component("minimap");
const playableArea = new Component("playableArea");

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

playableArea.setSize("80%", "75%");
playableArea.setPosition("top left");
playableArea.setZIndex("-1");

const test = new Component("test");
test.setSize("50%", "50%");
test.setBackgroundColor("magenta");
test.setPosition("bottom right");
test.setZIndex("1");

// test.build();

chat.build();
inventory.build();
minimap.build();
playableArea.build();

setGameScene(playableArea.getId());
window.addEventListener('resize', onWindowResize, false);
initGameScene();
animateCube();
