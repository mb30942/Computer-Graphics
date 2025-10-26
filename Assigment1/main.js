import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(30, 50, 30);
scene.add(directionalLight);

const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x4caf50 });
const grass = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), grassMaterial);
grass.rotation.x = -Math.PI / 2;
scene.add(grass);

const roadMaterial = new THREE.MeshStandardMaterial({
  color: 0x333333,
  roughness: 0.8,
});

const verticalRoad = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.1, 40),
  roadMaterial
);
verticalRoad.position.y = 0.05;
scene.add(verticalRoad);

const horizontalRoad = new THREE.Mesh(
  new THREE.BoxGeometry(40, 0.1, 6),
  roadMaterial
);
horizontalRoad.position.y = 0.05;
scene.add(horizontalRoad);

const whiteBuildingMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const redBuildingMaterial = new THREE.MeshPhongMaterial({ color: "#FF0000" });

const building1 = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 6),
  whiteBuildingMaterial
);
building1.position.set(-7, 3, -7);
scene.add(building1);

const building2 = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 6),
  whiteBuildingMaterial
);
building2.position.set(7, 3, -7);
scene.add(building2);

const building3 = new THREE.Mesh(
  new THREE.BoxGeometry(10, 5, 4),
  redBuildingMaterial
);
building3.position.set(-10, 2.5, 15);
scene.add(building3);

const building4 = new THREE.Mesh(
  new THREE.BoxGeometry(4, 5, 10),
  redBuildingMaterial
);
building4.position.set(10, 2.5, 8);
scene.add(building4);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();