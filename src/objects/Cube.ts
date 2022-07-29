import * as THREE from 'three';
import Loader from '../loaders/Loader';

export default class Plane {
    private cubeMesh : THREE.Mesh;
    private loader : Loader | undefined = undefined;
    private width : number = 0;
    private height : number = 0;
    private color : number = 0;

    constructor(width : number, height : number, color? : number) {
        this.width = width;
        this.height = height;
        color !== undefined ? this.color = color : this.color = 0xffffff;

        const geometry = new THREE.BoxGeometry(this.width, this.height);
        const material = new THREE.MeshPhongMaterial({color: this.color});
        this.cubeMesh = new THREE.Mesh(geometry, material);
    }

    public setLoader(loader : Loader) {
        this.loader = loader;
        this.loader.getScene().add(this.cubeMesh);
    }

    public rotateX(radians : number) {
        this.cubeMesh.rotation.x = radians;
    }

    public rotateY(radians : number) {
        this.cubeMesh.rotation.y = radians;
    }

    public rotateZ(radians : number) {
        this.cubeMesh.rotation.z = radians;
    }

    public rotate(radiansX : number, radiansY : number, radiansZ : number) {
        this.rotateX(radiansX);
        this.rotateY(radiansY);
        this.rotateZ(radiansZ);
    }
}