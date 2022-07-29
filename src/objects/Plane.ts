import * as THREE from 'three';
import Loader from '../loaders/Loader';

export default class Plane {
    private planeMesh : THREE.Mesh;
    private loader : Loader | undefined = undefined;
    private width : number = 0;
    private height : number = 0;
    private vertical_segments : number = 0;
    private horizontal_segments : number = 0;
    private color : number = 0;

    constructor(width : number, height : number, vertical_segments : number, horizontal_segments : number, color? : number) {
        this.setWidth(width);
        this.setHeight(height);
        this.setVerticalSegments(vertical_segments);
        this.setHorizontalSegments(horizontal_segments);
        color !== undefined ? this.setColor(color) : this.setColor(0xffffff);
        

        const geometry = new THREE.PlaneGeometry(this.width, this.height, this.vertical_segments, this.horizontal_segments);
        const material = new THREE.MeshPhongMaterial({color: this.color, side: THREE.DoubleSide});
        this.planeMesh = new THREE.Mesh(geometry, material);
    }

    public setLoader(loader : Loader) {
        this.loader = loader;
        this.loader.getScene().add(this.planeMesh);
    }

    public setColor(color : number) {
        this.color = color;
    }

    public setVerticalSegments(segments : number) {
        this.vertical_segments = segments;
    }

    public setHorizontalSegments(segments : number) {
        this.horizontal_segments = segments;
    }

    public setWidth(newWidth : number) {
        this.width = newWidth;
    }

    public setHeight(newHeight : number) {
        this.height = newHeight;
    }

    public rotateX(radians : number) {
        this.planeMesh.rotation.x = radians;
    }

    public rotateY(radians : number) {
        this.planeMesh.rotation.y = radians;
    }

    public rotateZ(radians : number) {
        this.planeMesh.rotation.z = radians;
    }

    public rotate(radiansX : number, radiansY : number, radiansZ : number) {
        this.rotateX(radiansX);
        this.rotateY(radiansY);
        this.rotateZ(radiansZ);
    }
}