import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, light, gameScene, plane, controls;

export function setGameScene(container) {
    gameScene = document.getElementById(container);
}

export function initGameScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5));
    camera = new THREE.PerspectiveCamera(75, gameScene.offsetWidth / gameScene.offsetHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(gameScene.offsetWidth, gameScene.offsetHeight);
    document.body.appendChild(renderer.domElement);
    
    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(3,5,5);
    controls.update();

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 0);
    scene.add(light);

    const geometry = new THREE.PlaneGeometry(5, 5, 10, 10);
    const material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide, flatShading: THREE.FlatShading});
    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    plane.rotation.x = Math.PI/2;
}

export function animateCube() {
    requestAnimationFrame(animateCube);
    renderer.render(scene, camera);
}

export function onWindowResize() {
    camera.aspect = gameScene.offsetWidth / gameScene.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(gameScene.offsetWidth, gameScene.offsetHeight, false);
}