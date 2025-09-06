import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
scene.add(cubeMesh)

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35, //FOV - campo de visão
  window.innerWidth / window.innerHeight,
  0.5, //near
  200)  //far
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)


//initialize the controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.autoRotate = true;

const renderloop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderloop);
}

renderloop()
