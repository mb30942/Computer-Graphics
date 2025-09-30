import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 15;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// Group
const group = new THREE.Group();
scene.add(group);

// Capsule
const capsule = new THREE.Mesh(
  new THREE.CapsuleGeometry(1, 2, 4, 8),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
capsule.position.x = -6;
group.add(capsule);

// Cylinder
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(2, 2, 6, 32),
  new THREE.MeshStandardMaterial({ color: 0xffff00 })
);
cylinder.position.x = 0;
group.add(cylinder);

// Cone
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(2, 6, 32),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
cone.position.x = 6;
group.add(cone);

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Rotate group (orbit effect)
  group.rotation.y += 0.01;

  // Spin each shape individually
  capsule.rotation.x += 0.02;
  capsule.rotation.y += 0.02;

  cylinder.rotation.x += 0.02;
  cylinder.rotation.y += 0.02;

  cone.rotation.x += 0.02;
  cone.rotation.y += 0.02;

  renderer.render(scene, camera);
}

animate();
