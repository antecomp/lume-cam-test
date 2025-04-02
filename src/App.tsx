import Camera from "./Camera"

function App() {

  return (
    <div id="container" style={{width: "600px", height: "500px"}}>
      <lume-scene webgl physically-correct-lights perspective="800">
  {/* <lume-camera-rig align-point="0.5 0.5" distance="800"></lume-camera-rig> */}
  <Camera />

  <lume-point-light intensity="1200" align-point="0.5 0.5" position="300 -300 300" color="#ff006e">
    <lume-sphere size="20" cast-shadow="false" receive-shadow="false" color="#ff006e" has="basic-material"></lume-sphere>
  </lume-point-light>

  <lume-point-light intensity="1200" align-point="0.5 0.5" position="-300 300 -300" color="#3a86ff">
    <lume-sphere size="20" cast-shadow="false" receive-shadow="false" color="#3a86ff" has="basic-material"></lume-sphere>
  </lume-point-light>

  <lume-point-light intensity="1200" align-point="0.5 0.5" position="-300 300 300" color="#3a86ff">
    <lume-sphere size="20" cast-shadow="false" receive-shadow="false" color="#3a86ff" has="basic-material"></lume-sphere>
  </lume-point-light>

  <lume-point-light intensity="1200" align-point="0.5 0.5" position="300 -300 -300" color="#ff006e">
    <lume-sphere size="20" cast-shadow="false" receive-shadow="false" color="#ff006e" has="basic-material"></lume-sphere>
  </lume-point-light>

  <lume-box id="box" cast-shadow="false" receive-shadow="false" has="physical-material" roughness="0.8" align-point="0.5 0.5" mount-point="0.5 0.5 0.5" size="200 200 200" color="white" position="0 0 -200"></lume-box>
  <lume-box id="box" cast-shadow="false" receive-shadow="false" has="physical-material" roughness="0.8" align-point="0.5 0.5" mount-point="0.5 0.5 0.5" size="200 200 200" color="green" position="0 0 200"></lume-box>
</lume-scene>
    </div>
  )
}

export default App
