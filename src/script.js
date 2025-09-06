import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})

const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial)
const cubeMesh2 = new THREE.Mesh( cubeGeometry, cubeMaterial)
const cubeMesh3 = new THREE.Mesh( cubeGeometry, cubeMaterial)
cubeMesh2.position.x = 2;
cubeMesh3.position.x = -2;

const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);

scene.add(group)
// scene.add(cubeMesh) 
cubeMesh3.scale.setScalar(2);
cubeMesh.scale.set(1.5, 1.5, 1.5)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//initialize the camera (perspective)
const camera = new THREE.PerspectiveCamera(
  35, //FOV - campo de visão
  window.innerWidth / window.innerHeight,
  0.5, //near
  200)  //far

// const aspectRatio = window.innerWidth / window.innerHeight;

// //initialize Orthohraphic camera
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 200
// )

camera.position.z = 5;
cubeMesh.position.distanceTo(camera.position)

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(window.devicePixelRatio)

//initialize the controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth /   window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const renderloop = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
}

renderloop();