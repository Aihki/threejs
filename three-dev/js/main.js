import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer, controls;
let pyramid, smallBoxWireframe, smallBoxStandard ,plank, box, boxGroup;
let clock = new THREE.Clock();

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const pyramidGeometry = new THREE.ConeGeometry(2, 4, 4);
  const pyramidMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
  pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
  pyramid.rotation.y = Math.PI / 4;
  scene.add(pyramid);

  const plankGeometry = new THREE.BoxGeometry(6, 0.2, 1);
  const plankMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  plank = new THREE.Mesh(plankGeometry, plankMaterial);
  plank.position.y = 2.1;
  scene.add(plank);

  const boxGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
  box = new THREE.Mesh(boxGeometry, boxMaterial);


  const smallBoxGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  smallBoxWireframe = new THREE.Mesh(smallBoxGeometry, wireframeMaterial);
  smallBoxWireframe.position.set(-1, 0, 0);

  const standardMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  smallBoxStandard = new THREE.Mesh(smallBoxGeometry, standardMaterial);
  smallBoxStandard.position.set(1, 0, 0);

  boxGroup = new THREE.Group();
  boxGroup.add(box);
  boxGroup.add(smallBoxWireframe);
  boxGroup.add(smallBoxStandard);
  boxGroup.position.set(0, 0.3, 0);

  plank.add(boxGroup);

  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  window.addEventListener("resize", onWindowResize);

  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  const elapsedTime = clock.getElapsedTime();

  pyramid.rotation.y += 0.01;
  box.rotation.y += 0.01;
  smallBoxWireframe.rotation.y += 0.01;
  smallBoxStandard.rotation.y += 0.01;


  plank.rotation.z = Math.sin(elapsedTime) * 0.1;

  boxGroup.position.x = Math.sin(elapsedTime) * 1.5;

  controls.update();
  renderer.render(scene, camera);
}
