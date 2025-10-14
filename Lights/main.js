import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'
const gui= new GUI()

const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

const scene = new THREE.Scene();// scene constructor
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
    75, sizes.width/sizes.height, 0.1, 1000
);

camera.position.z=3;
scene.add(camera);

const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(sizes.width, sizes.height);

document.body.appendChild(renderer.domElement);

const ambientLight= new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);
gui.add(ambientLight,'intensity').min(0).max(3).step(0.001)

const directionalLight= new THREE.DirectionalLight(0x00fffc,0.9)
directionalLight.position.set(1,0.25,0)
scene.add(directionalLight)

const directionalLightHelper= new THREE.DirectionalLightHelper(directionalLight,0.5)
scene.add(directionalLightHelper)

const hemiphereLight= new THREE.HemisphereLight(0xff0000,0x0000ff,0.9)
scene.add(hemiphereLight)

const HemisphereLightHelper=new THREE.HemisphereLightHelper(hemiphereLight,0.2)
scene.add(HemisphereLightHelper)

const pointLight=new THREE.PointLight(0xff9000,1.5,0,2)
pointLight.position.set(1,-0.5,1)
scene.add(pointLight)

const pointLightHelper=new THREE.PointLightHelper(pointLight,0.2)
scene.add(pointLightHelper)

const rectAreaLight=new THREE.RectAreaLight(0x4e00ff,6,1,1)
scene.add(rectAreaLight)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

const spotLight=new THREE.SpotLight(0x78ff00,4.5,10,Math.PI*0.1,0.25,1)
spotLight.position.set(0,2,3)
scene.add(spotLight)
scene.add(spotLight.target)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)


const material = new THREE.MeshStandardMaterial()
material.roughness=0.4

const sphere= new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32),material);
sphere.position.x=-2

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75,0.75,0.75),material);
cube.position.x=0

const torus= new THREE.Mesh(new THREE.TorusGeometry(0.3,0.2,32,64), material);
torus.position.x=2

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5,5,),material);
plane.rotation.x=-Math.PI*0.5
plane.position.y=-0.65

scene.add(sphere,cube,torus,plane)



window.addEventListener('resize',()=>{
    sizes.width=window.innerWidth,
    sizes.height=window.innerHeight,
    camera.aspect=sizes.width/sizes.height,
    renderer.setSize(sizes.width,sizes.height)
})


const constrols = new OrbitControls(camera,renderer.domElement)
constrols.enableDamping=true;

function animate(){
    renderer.render(scene,camera);
    requestAnimationFrame(animate)
}




animate();