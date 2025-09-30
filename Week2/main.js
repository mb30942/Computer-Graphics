import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cubeMesh = new THREE.Mesh(geometry, material);
// scene.add(cubeMesh);

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshStandardMaterial({ color: 0x0000ff }); 
const cubeMesh2 = new THREE.Mesh(geometry2, material2);
cubeMesh2.position.x = 2; 
// scene.add(cubeMesh2);


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// Move objects x,y,z

// cubeMesh.position.x = 0.7
// cubeMesh.position.y = -0.6
// cubeMesh.position.z = 1

// console.log(cubeMesh.length());
// console.log(cubeMesh.position.distanceTo(camera.position));
// cubeMesh.position.set(0.7, -0.6, 1 );

// Axes Helper 

const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper); //y-green, x-red, z is blue but its hidden

//Scailing objects 

// cubeMesh.scale.x = 2;
// cubeMesh.scale.y = 0.25;
// cubeMesh.scale.z = 0.5;

//Rotation
// cubeMesh.rotation.x = Math.PI * 0.25;
// cubeMesh.rotation.y = Math.PI * 0.25;

//Combaining Transformations
// cubeMesh.scale.x = 4;
// cubeMesh.scale.y = 2;
// cubeMesh.rotation.x = Math.PI * 0.25;


//Scene graph (define a group)

const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cubel = new  THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color: 0xff0000})
);
cubel.position.x = -1.5;
group.add(cubel);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = 0; 
group.add(cube2);


const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 1.5;
group.add(cube3);

function animate() {
  requestAnimationFrame(animate);
  cubeMesh.rotation.x += 0.01;
  cubeMesh.rotation.y += 0.01;

  cubeMesh2.rotation.x += 0.01;
  cubeMesh2.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();