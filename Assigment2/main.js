import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

console.log("Assignment 2 Main.js Loaded");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

// Camera Setup
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(30, 50, 30);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Texture Loader
const textureLoader = new THREE.TextureLoader();

const loadTexture = (path, wrap = true) => {
  const texture = textureLoader.load(path);
  if (wrap) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  }
  return texture;
};

// Textures
const grassTexture = loadTexture('assets/textures/grass.jpg');
grassTexture.repeat.set(10, 10);

const roadTexture = loadTexture('assets/textures/road.jpg');
roadTexture.repeat.set(1, 10);

const roadTextureHorizontal = loadTexture('assets/textures/road.jpg');
roadTextureHorizontal.repeat.set(10, 1);
roadTextureHorizontal.rotation = Math.PI / 2;

const brickTexture = loadTexture('assets/textures/brick.jpg');
brickTexture.repeat.set(2, 2);

const concreteTexture = loadTexture('assets/textures/concrete.jpg');
concreteTexture.repeat.set(2, 2);

// Materials
const grassMaterial = new THREE.MeshLambertMaterial({ map: grassTexture });
const roadMaterial = new THREE.MeshStandardMaterial({
  map: roadTexture,
  roughness: 0.8
});
const roadMaterialHorizontal = new THREE.MeshStandardMaterial({
  map: roadTexture,
  roughness: 0.8
});

const horizontalRoadTex = loadTexture('assets/textures/road.jpg');
horizontalRoadTex.repeat.set(10, 1);

const roadMatVertical = new THREE.MeshStandardMaterial({ map: roadTexture, roughness: 0.8 });
const roadMatHorizontal = new THREE.MeshStandardMaterial({ map: horizontalRoadTex, roughness: 0.8 });

const brickMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });
const concreteMaterial = new THREE.MeshStandardMaterial({ map: concreteTexture });
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x88ccff,
  metalness: 0.1,
  roughness: 0.1,
  transmission: 0.9, // Add transparency
  transparent: true,
  opacity: 0.6
});

const interactableObjects = [];

// Ground
const grass = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), grassMaterial);
grass.rotation.x = -Math.PI / 2;
grass.receiveShadow = true;
scene.add(grass);

// Roads
const verticalRoad = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.1, 40),
  roadMatVertical
);
verticalRoad.position.y = 0.05;
verticalRoad.receiveShadow = true;
scene.add(verticalRoad);

const horizontalRoad = new THREE.Mesh(
  new THREE.BoxGeometry(40, 0.1, 6),
  roadMatHorizontal
);
horizontalRoad.position.y = 0.05;
horizontalRoad.receiveShadow = true;
scene.add(horizontalRoad);

// Buildings
const building1 = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 6),
  brickMaterial
);
building1.position.set(-7, 3, -7);
building1.castShadow = true;
building1.receiveShadow = true;
building1.userData = { originalColor: building1.material.color.getHex() };
scene.add(building1);
interactableObjects.push(building1);

const building2 = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 6),
  concreteMaterial
);
building2.position.set(7, 3, -7);
building2.castShadow = true;
building2.receiveShadow = true;
building2.userData = { originalColor: building2.material.color.getHex() };
scene.add(building2);
interactableObjects.push(building2);

// Glass Building
const building3 = new THREE.Mesh(
  new THREE.BoxGeometry(10, 5, 4),
  glassMaterial
);
building3.position.set(-10, 2.5, 15);
building3.castShadow = true;
scene.add(building3);

const building4 = new THREE.Mesh(
  new THREE.BoxGeometry(4, 5, 10),
  brickMaterial
);
building4.position.set(10, 2.5, 8);
building4.castShadow = true;
building4.receiveShadow = true;
building4.userData = { originalColor: building4.material.color.getHex() };
scene.add(building4);
interactableObjects.push(building4);

// GLTF Loader
const loader = new GLTFLoader();
let loadedModel;

loader.load(
  'assets/models/simple_model.gltf',
  function (gltf) {
    loadedModel = gltf.scene;
    loadedModel.position.set(0, 2, 0); // Center intersection
    loadedModel.scale.set(2, 2, 2);
    loadedModel.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });
        child.castShadow = true;
      }
    });
    scene.add(loadedModel);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Interaction
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener('click', (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(interactableObjects);

  if (intersects.length > 0) {
    const object = intersects[0].object;
    // Toggle color
    const randomColor = Math.random() * 0xffffff;
    object.material = object.material.clone(); // Clone to avoid affecting others sharing same material
    object.material.color.setHex(randomColor);
  }
});

let animationEnabled = true;

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key === 'l') {
    directionalLight.visible = !directionalLight.visible;
  } else if (key === 'a') {
    animationEnabled = !animationEnabled;
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  if (animationEnabled) {
    // Animation: Rotate the loaded model
    if (loadedModel) {
      loadedModel.rotation.y += 0.01;
      loadedModel.rotation.x += 0.005;
    }

    // Animation: Rotate buildings
    building1.rotation.y += 0.005;
    building4.rotation.y -= 0.005;

    // Animation: Move light slightly
    const time = Date.now() * 0.001;
    directionalLight.position.x = 30 + Math.sin(time) * 5;
  }

  renderer.render(scene, camera);
}
animate();