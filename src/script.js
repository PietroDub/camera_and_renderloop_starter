import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene()

//criando formas
const geometry = new THREE.TorusKnotGeometry(10, 3, 90, 16)

// add objects to the scene
// const cubeGeometry = new THREE.BoxGeometry(1,1,1, 2, 2, 2);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red", wireframe: true})

const cubeMesh = new THREE.Mesh( geometry, cubeMaterial)

scene.add(cubeMesh) 
// cubeMesh3.scale.setScalar(2);
// cubeMesh.scale.set(1.5, 1.5, 1.5)

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