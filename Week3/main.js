import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js";

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x1e1e1e);

// Create a sphere
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  metalness: 0.3,
  roughness: 0.6,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Add lights
const light = new THREE.PointLight(0xffffff, 10);
light.position.set(3, 3, 3);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040, 1);
scene.add(ambient);

// Animate
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.01;
  sphere.rotation.x += 0.005;
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
