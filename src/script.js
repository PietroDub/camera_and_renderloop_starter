import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene()

// initialize the loader
const textureLoader = new THREE.TextureLoader();
//criando formas
const geometry = new THREE.BoxGeometry(1, 1, 1, 1)
const planeGeometry = new THREE.PlaneGeometry(1,1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32)

// initialize the texture
const grassTexture = textureLoader.load('/textures/whispy-grass-meadow-bl/whispy-grass-meadow-bl/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png');
grassTexture.repeat.set(2, 2);
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;

const material = new THREE.MeshStandardMaterial();
// material.color = new THREE.Color('cyan');
material.map = grassTexture;

//inicialize o grupo
const group =  new THREE.Group();

material.side = THREE.DoubleSide; //poder ser visto de ambos os lados

const cubeMesh = new THREE.Mesh( geometry, material)

const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 1.5

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5
plane.rotation.x = -(Math.PI * 0.5);
plane.scale.set(1000, 1000)

const sphere = new THREE.Mesh()
sphere.geometry = sphereGeometry;
sphere.material = material;
sphere.position.y = -1.5;

const cylinder = new THREE.Mesh()
cylinder.geometry = cylinderGeometry;
cylinder.material = material;
cylinder.position.y = 1.5;

// scene.add(mesh2);
// scene.add(cubeMesh); 
scene.add(plane);
// group.add(sphere, cylinder);
// scene.add(group);
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
  10000)  //far

camera.position.z = 10;
camera.position.y = 5;


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

//initialize the clock
const clock = new THREE.Clock()
let previousTime = 0;

//render the scene
const renderloop = () => {
  
  // //rotação em conjunto
  // scene.children.forEach((children) => {
  //   if(children instanceof THREE.Mesh){
  //     children.rotation.y += 0.01;
  //   }
  // })
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
}


renderloop();