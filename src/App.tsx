import { useEffect } from "react";
import "./App.css";
import * as THREE from "three";
// import Iframe from "react-iframe";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
  let model: THREE.Group;
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };
    // scene
    const scene: THREE.Scene = new THREE.Scene();
    // camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(0, 0, 2);

    // renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 3Dモデルのインポート
    const gltfLoader = new GLTFLoader();

    let mixer: THREE.AnimationMixer;
    gltfLoader.load("./models/scene.gltf", (gltf) => {
      model = gltf.scene;
      model.scale.set(1, 1, 0.1);
      // model.rotation.y = -Math.PI / 3;
      model.position.y = -1.3;
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
      clips.forEach(function (clip) {
        const action = mixer.clipAction(clip);
        action.play();
      });
    });

    // アニメーション
    const tick = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
      if (mixer) {
        mixer.update(0.05);
      }
    };
    tick();
  }, []);

  // const URL =
  //   "https://sketchfab.com/models/68f60e7ecd7d43739ac96adf4fc59eb6/embed";

  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="mainContent">
        <h3>aqua</h3>
      </div>
      {/* <div className="App">
        <header className="App-header">
          <Iframe
            url={URL}
            width="640px"
            height="320px"
            id=""
            className=""
            display="block"
            position="relative"
          />
        </header>
      </div> */}
    </>
  );
}

export default App;
