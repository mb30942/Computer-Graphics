// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Raycaster and mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// UI panel
const infoPanel = document.getElementById("infoPanel");

// Store cubes
const cubes = [];
let selectedCube = null;
let previousColor = null;

// Create 20 cubes
for (let i = 0; i < 20; i++) {
    const width = Math.random() * 2 + 1;
    const height = Math.random() * 2 + 1;
    const depth = Math.random() * 2 + 1;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff
    });

    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
    );

    // Save size info
    cube.userData.size = { width, height, depth };

    scene.add(cube);
    cubes.push(cube);
}

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Mouse click handler
window.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    // Reset previous cube
    if (selectedCube) {
        selectedCube.material.color.set(previousColor);
        selectedCube.scale.set(1, 1, 1);
    }

    if (intersects.length > 0) {
        selectedCube = intersects[0].object;
        previousColor = selectedCube.material.color.clone();

        // Highlight cube
        selectedCube.material.color.set(0xffff00);
        selectedCube.scale.set(1.2, 1.2, 1.2);

        const pos = selectedCube.position;
        const size = selectedCube.userData.size;

        infoPanel.innerHTML = `
            <strong>Cube Selected</strong><br><br>
            <strong>Position:</strong><br>
            x: ${pos.x.toFixed(2)}<br>
            y: ${pos.y.toFixed(2)}<br>
            z: ${pos.z.toFixed(2)}<br><br>
            <strong>Size:</strong><br>
            width: ${size.width.toFixed(2)}<br>
            height: ${size.height.toFixed(2)}<br>
            depth: ${size.depth.toFixed(2)}
        `;
    } else {
        selectedCube = null;
        infoPanel.innerHTML = "No object selected.";
    }
});

// Resize handling
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
