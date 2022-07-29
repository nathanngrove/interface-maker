import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Loader {
    private scene : THREE.Scene;
    private camera : THREE.PerspectiveCamera;
    private renderer : THREE.Renderer;
    private controls : OrbitControls;
    private scalar : Map<string, number> = new Map([["widthScalar", 1], ["heightScalar", 1]]);

    constructor(widthScalar : number, heightScalar : number) {
        this.scalar.set("widthScalar", widthScalar);
        this.scalar.set("heightScalar", heightScalar);

        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AxesHelper(5));

        let aspectRatio = (window.innerWidth * this.getWidthScalar()) / (window.innerHeight * this.getHeightScalar());
        this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
        this.camera.position.set(3,5,5);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth * this.getWidthScalar(), window.innerHeight * this.getHeightScalar());
        document.body.appendChild(this.renderer.domElement);
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.update();
    
        let light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 10, -10);
        this.scene.add(light);
    
        light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, -10, 10);
        this.scene.add(light);

        window.addEventListener('resize', () => { this.onWindowResize(); }, false);

        console.log(this.getCamera());
    }

    public getScene() {
        return this.scene;
    }

    public getCamera() {
        return this.camera;
    }

    public setScalar(widthScalar : number, heightScalar : number) {
        this.scalar.set("widthScalar", widthScalar);
        this.scalar.set("heightScalar", heightScalar);
    }

    public getWidthScalar() {
        return this.scalar.get("widthScalar")!;
    }

    public getHeightScalar() {
        return this.scalar.get("heightScalar")!;
    }

    private onWindowResize() {
        let aspectRatio = (window.innerWidth * this.getWidthScalar()) / (window.innerHeight * this.getHeightScalar());
        this.camera.aspect = aspectRatio;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth * this.getWidthScalar(), window.innerHeight * this.getHeightScalar());
    }

    public animate() {
        requestAnimationFrame(() => { this.animate(); });
        this.renderer.render(this.scene, this.camera);
    }
}