import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let container,
  camera,
  scene,
  renderer,
  cube,
  sphere,
  torus,
  controls,
  wireframeBox,
  wireframeSphere,
  wireframeGroup;
init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  const geometry = new THREE.BoxGeometry(0.5, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 0.5,
    metalness: 0.5,
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const geometry2 = new THREE.SphereGeometry(
    0.5, // radius
    14, // widthSegments
    7 // heightSegments
  );
  const material2 = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    flatShading: true,
  });
  sphere = new THREE.Mesh(geometry2, material2);
  scene.add(sphere);

  sphere.position.set(2, 0, 0);

  const geometry3 = new THREE.TorusKnotGeometry(0.5, 0.1, 100, 16);
  const material3 = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
  });
  torus = new THREE.Mesh(geometry3, material3);
  scene.add(torus);

  torus.position.set(-2, 0, 0);

  const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boxWireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xfffff,
    wireframe: true,
  });
  wireframeBox = new THREE.Mesh(boxGeometry, boxWireframeMaterial);

  const sphereGeometry = new THREE.SphereGeometry(0.5, 14, 7);
  const sphereWireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  wireframeSphere = new THREE.Mesh(sphereGeometry, sphereWireframeMaterial);

  wireframeGroup = new THREE.Group();
  wireframeGroup.add(wireframeBox);
  wireframeGroup.add(wireframeSphere);
  scene.add(wireframeGroup);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
  camera.position.set(2, 2, 2);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const spotLight = new THREE.SpotLight(0xffffff, 0.5);
  spotLight.position.set(10, 10, 10);
  spotLight.target.position.set(0, 0, 0);
  scene.add(spotLight);
  scene.add(spotLight.target);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
}

window.addEventListener("resize", resize, false);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  const time = Date.now() * 0.001;

  cube.position.x = Math.sin(time + Math.PI) * 2;
  cube.position.y = Math.sin(time + Math.PI) * 2;
  cube.position.z = Math.cos(time + Math.PI) * 2;

  sphere.position.x = Math.sin(time + Math.PI) * 2;
  sphere.position.y = Math.cos(time + Math.PI) * 2;
  sphere.position.z = Math.sin(time + Math.PI) * 2;

  torus.position.x = Math.cos(time + Math.PI) * 2;
  torus.position.y = Math.sin(time + Math.PI) * 2;
  torus.position.z = Math.sin(time + Math.PI) * 2;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  wireframeGroup.rotation.x += 0.01;
  wireframeGroup.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}
