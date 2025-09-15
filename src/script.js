import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { color, distance } from 'three/tsl';
import { Pane } from 'tweakpane';

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene()

//add the texture loader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/textures/solar/cubeMap/')

//adding Textures 
const sunTexture = textureLoader.load('/textures/solar/2k_sun.jpg')
const mercuryTexture = textureLoader.load('/textures/solar/2k_mercury.jpg')
const venusTexture = textureLoader.load('/textures/solar/2k_venus_surface.jpg')
const earthTextue = textureLoader.load('/textures/solar/2k_earth_daymap.jpg')
const moonTexture = textureLoader.load('/textures/solar/2k_moon.jpg')
const marsTexture = textureLoader.load('/textures/solar/2k_mars.jpg') 
//const backgroundTexture = textureLoader.load('/textures/solar/2k_stars_milky_way.jpg')
// scene.background =  backgroundTexture;

const cubeMap = cubeTextureLoader.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
]);

scene.background = cubeMap;
// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({map: mercuryTexture});
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTextue });
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  map:sunTexture
});

const sun = new THREE.Mesh(
  sphereGeometry, sunMaterial
)
sun.scale.setScalar(5)
scene.add(sun);

  const planets = [
    {
      name: 'Mercury',
      radius: 0.8,
      distance: 10,
      speed: 0.007, 
      material: mercuryMaterial,
      moons: [],
    },
    {
      name: 'Venus',
      radius: 0.8,
      distance: 15,
      speed: 0.007,
      material: venusMaterial,
      moons: [],
    },
    {
      name: 'Earth',
      radius: 1,
      distance: 20,
      speed: 0.005,
      material: earthMaterial,
      moons : [
        {
          name: 'Moon',
          radius: 0.3,
          distance: 3,
          speed: 0.015,
        }
      ]
    },
    {
      name: 'Mars',
      radius: 0.7, 
      distance: 25,
      speed: 0.003,
      material: marsMaterial,
      moons: [
        {
          name: 'Phobos',
          radius: 0.1,
          distance: 2,
          speed: 0.02,
        },
        {
          name: 'Deimos',
          radius: 0.2,
          distance: 3,
          speed: 0.015,
          color: 0xffffff,
        }
      ]
    },
  ];

  const planetsMeshes = planets.map((planet) =>{
    //create the mesh
    const planetMesh = new THREE.Mesh(
      sphereGeometry,
      planet.material
    )
    //set the scale
    planetMesh.scale.setScalar(planet.radius)
    planetMesh.position.x = planet.distance;

    //add it in the scene
    scene.add(planetMesh);

    //passar pelas luas e criar
    planet.moons.forEach((moon) =>{
      const moonMesh = new THREE.Mesh(
        sphereGeometry, moonMaterial
      )
      moonMesh.scale.setScalar(moon.radius)
      moonMesh.position.x = moon.distance;
      planetMesh.add(moonMesh)
    })
    return planetMesh
  })

console.log(planetsMeshes)

const axesHelper = new THREE.AxesHelper(5);
//adiciona o axes para seguir o cubo

//adiciona a luz

const ambientLight = new THREE.AmbientLight(
  0xffffff,
  0.08
)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(
  0xffff00,
  40
)
scene.add(pointLight);

//initialize the camera (perspective)
const camera = new THREE.PerspectiveCamera(
  35, //FOV - campo de visão
  window.innerWidth / window.innerHeight,
  0.5, //near
  10000)  //far

camera.position.z = 10;
camera.position.y = 5;


sun.position.distanceTo(camera.position)

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

//render the scene
const renderloop = () => {
  planetsMeshes.forEach((planet, planetIndex) => {
    planet.rotation.y += planets[planetIndex].speed
    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance
    planet.children.forEach((moon, moonIndex) =>{
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed
      moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
      moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance

    })
  })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
}


renderloop();