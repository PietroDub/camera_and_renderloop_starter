import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene()

//criando formas
const geometry = new THREE.BoxGeometry(1, 1, 1, 1)
const planeGeometry = new THREE.PlaneGeometry(1,1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16);

// add objects to the scene
// const cubeGeometry = new THREE.BoxGeometry(1,1,1, 2, 2, 2);
// const material = new THREE.MeshBasicMaterial({
//   color: "red",
//   // transparent: true,
//   // opacity: 0.5,
//   //wireframe: true
// })

const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color('cyan');

// pane.addInput(material, 'metalness', {
//   min: 0,
//   max: 1,
//   step: 0.01
// })

// pane.addInput(material, 'rughness', {
//   min: 0,
//   max: 1, 
//   step: 0.01
// })

material.side = THREE.DoubleSide; //poder ser visto de ambos os lados

const cubeMesh = new THREE.Mesh( geometry, material)

const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 1.5

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5

scene.add(mesh2);
scene.add(cubeMesh); 
scene.add(plane);
// cubeMesh3.scale.setScalar(2);
// cubeMesh.scale.set(1.5, 1.5, 1.5)

//inicializndo a luz
const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)

const pointLight = new THREE.PointLight(0xffffff, 5)
pointLight.position.set(2,2,2)
scene.add(pointLight)

const axesHelper = new THREE.AxesHelper(5);
//adiciona o axes para seguir o cubo
cubeMesh.add(axesHelper);

//initialize the camera (perspective)
const camera = new THREE.PerspectiveCamera(
  35, //FOV - campo de visão
  window.innerWidth / window.innerHeight,
  0.5, //near
  200)  //far

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
controls.autoRotate = true;

window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth /   window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})

//initialize the clock
const clock = new THREE.Clock()
let previousTime = 0;

//render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
}


renderloop();