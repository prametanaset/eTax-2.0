<template>
  <div>
    <canvas id="canvas"></canvas>
    <p class="collection"></p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import chroma from 'chroma-js'

let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera
let animationId: number
const clock = new THREE.Clock()
const conf = {
  nx: 40,
  ny: 100,
  cscale: chroma.scale(['#A577FF', '#C5A3FF', '#A577FF', '#A577FF', '#A577FF', '#9038FF']).mode('lch'),
  darken: -1,
  angle: Math.PI / 3,
  timeCoef: 0.05
}
const uTimeCoef = { value: conf.timeCoef }
const uTime = { value: 0 }
const polylines: any[] = []

onMounted(() => {
  initApp()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', updateSize)
  disposeScene()
})

function initApp() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  camera = new THREE.PerspectiveCamera()
  scene = new THREE.Scene()
  updateSize()
  window.addEventListener('resize', debounce(updateSize, 200))
  initScene()
  animate()
}

function updateSize() {
  const width = window.innerWidth
  const height = window.innerHeight
  renderer.setSize(width, height)
}

function initScene() {
  const dx = 2 / conf.nx
  const dy = -2 / (conf.ny - 1)
  const ox = -1 + dx / 2
  const oy = 1
  const mat2 = new Float32Array([
    Math.cos(conf.angle), -Math.sin(conf.angle),
    Math.sin(conf.angle), Math.cos(conf.angle)
  ])
  const rnd = THREE.MathUtils.randFloat

  for (let i = 0; i < conf.nx; i++) {
    const points = []
    for (let j = 0; j < conf.ny; j++) {
      const x = ox + i * dx
      const y = oy + j * dy
      points.push(new THREE.Vector3(x, y, 0))
    }

    const polyline = new Polyline({ points })
    polylines.push(polyline)

    const shaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime,
        uTimeCoef,
        uMat2: { value: mat2 },
        uSize: { value: 1.5 / conf.nx },
        uRnd1: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
        uRnd2: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
        uRnd3: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
        uRnd4: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
        uRnd5: { value: new THREE.Vector3(rnd(0.2, 0.5), rnd(0.3, 0.6), rnd(0.4, 0.7)) },
        uColor1: { value: new THREE.Color(conf.cscale(i / conf.nx).hex()) },
        uColor2: { value: new THREE.Color(conf.cscale(i / conf.nx).darken(conf.darken).hex()) }
      },
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader()
    })

    const mesh = new THREE.Mesh(polyline.geometry, shaderMat)
    scene.add(mesh)
  }
}

function animate() {
  uTime.value = clock.getElapsedTime()
  renderer.render(scene, camera)
  animationId = requestAnimationFrame(animate)
}

function disposeScene() {
  polylines.length = 0
  while (scene.children.length > 0) {
    const mesh = scene.children[0] as THREE.Mesh
    scene.remove(mesh)
    mesh.geometry.dispose()
    ;(mesh.material as THREE.Material).dispose()
  }
}

function debounce(func: () => void, wait: number) {
  let timeout: number
  return () => {
    clearTimeout(timeout)
    timeout = window.setTimeout(func, wait)
  }
}

// GLSL shader
function vertexShader(): string {
  return `
    uniform float uTime, uTimeCoef;
    uniform float uSize;
    uniform mat2 uMat2;
    uniform vec3 uRnd1, uRnd2, uRnd3, uRnd4, uRnd5;
    attribute vec3 next, prev; 
    attribute float side;
    varying vec2 vUv;
    vec2 dp(vec2 sv) {
      return (1.5 * sv * uMat2);
    }
    void main() {
      vUv = uv;
      vec2 pos = dp(position.xy);
      vec2 normal = dp(vec2(1, 0)) * uSize;

      float t = uTime * uTimeCoef;
      vec3 r1 = vec3(cos(t * uRnd1.x + uRnd3.x), cos(t * uRnd1.y + uRnd3.y), cos(t * uRnd1.z + uRnd3.z));
      vec3 r2 = vec3(cos(t * uRnd2.x + uRnd4.x), cos(t * uRnd2.y + uRnd4.y), cos(t * uRnd2.z + uRnd4.z));

      normal *= 1.0
        + uRnd5.x * (cos((position.y + r1.x) * 20.0 * r1.y) + 1.0)
        + uRnd5.y * (sin((position.y + r2.x) * 20.0 * r2.y) + 1.0)
        + uRnd5.z * (cos((position.y + r1.z) * 20.0 * r2.z) + 1.0);
      pos -= normal * side;
      gl_Position = vec4(pos, 0.0, 1.0);
    }
  `
}

function fragmentShader(): string {
  return `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(mix(uColor1, uColor2, vUv.x), 1.0);
    }
  `
}

class Polyline {
    geometry: THREE.BufferGeometry
    position: Float32Array
    prev: Float32Array
    next: Float32Array
    points: THREE.Vector3[]
    count: number

    constructor(params: { points: THREE.Vector3[] }) {
      this.points = params.points
      this.count = this.points.length
      this.geometry = new THREE.BufferGeometry()
      this.position = new Float32Array(this.count * 3 * 2)
      this.prev = new Float32Array(this.count * 3 * 2)
      this.next = new Float32Array(this.count * 3 * 2)
      const side = new Float32Array(this.count * 2)
      const uv = new Float32Array(this.count * 4)
      const index = new Uint16Array((this.count - 1) * 6)

      for (let i = 0; i < this.count; i++) {
        const i2 = i * 2
        side.set([-1, 1], i2)
        const v = i / (this.count - 1)
        uv.set([0, v, 1, v], i * 4)
        if (i === this.count - 1) continue
        index.set([i2, i2 + 1, i2 + 2, i2 + 2, i2 + 1, i2 + 3], i * 6)
      }

      this.geometry.setAttribute('position', new THREE.BufferAttribute(this.position, 3))
      this.geometry.setAttribute('prev', new THREE.BufferAttribute(this.prev, 3))
      this.geometry.setAttribute('next', new THREE.BufferAttribute(this.next, 3))
      this.geometry.setAttribute('side', new THREE.BufferAttribute(side, 1))
      this.geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
      this.geometry.setIndex(new THREE.BufferAttribute(index, 1))

      this.updateGeometry()
    }

    updateGeometry() {
      const tmp = new THREE.Vector3()
      this.points.forEach((p, i) => {
        p.toArray(this.position, i * 6)
        p.toArray(this.position, i * 6 + 3)

        if (!i) {
          tmp.copy(p).sub(this.points[i + 1]).add(p)
          tmp.toArray(this.prev, i * 6)
          tmp.toArray(this.prev, i * 6 + 3)
        } else {
          p.toArray(this.next, (i - 1) * 6)
          p.toArray(this.next, (i - 1) * 6 + 3)
        }

        if (i === this.points.length - 1) {
          tmp.copy(p).sub(this.points[i - 1]).add(p)
          tmp.toArray(this.next, i * 6)
          tmp.toArray(this.next, i * 6 + 3)
        } else {
          p.toArray(this.prev, (i + 1) * 6)
          p.toArray(this.prev, (i + 1) * 6 + 3)
        }
      })

      this.geometry.attributes.position.needsUpdate = true
      this.geometry.attributes.prev.needsUpdate = true
      this.geometry.attributes.next.needsUpdate = true
    }
  }
</script>



<style scoped>
body {
  margin: 0;
}
canvas {
  display: block;
  width: 100%;
  height: 100vh;
}
</style>
