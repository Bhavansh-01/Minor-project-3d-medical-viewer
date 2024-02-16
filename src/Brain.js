import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, PresentationControls, OrbitControls } from "@react-three/drei";
import { useGLTF } from '@react-three/drei/core/useGLTF';
import Comment from './comment_section.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function Annotation(props) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAnnotationClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  return (
    <Html position={props.position} style={{ display: props.showAnnotations ? 'block' : 'none' }}>
      <div onClick={handleAnnotationClick} className="annot" style={{ background: 'white', padding: '8px', borderRadius: '4px' }}>
        {props.content}
      </div>
      {isPopupVisible && (
        <div
          style={{
            position: 'absolute',
            left: props.position[0] + 'rem',
            // top: props.position[1] + 'rem',
            background: 'black',
            color: 'white',
            width: '600%',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 10,
            textAlign: 'justify',
          }}
        >
          {props.additionalInfo}
        </div>
      )}
    </Html>
  );
}
function Model(props) {
  const groupRef = useRef();
  const { scene } = useGLTF("./human_brain.glb");


  // useFrame(() => {
  //   // Rotate the model in the y-axis
  //   if (groupRef.current) {
  //     groupRef.current.rotation.y += 0.001;
  //   }
  // });

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} scale={4} />
      {/* <Annotation position={[0,1.5,2]} id="annot" content="Aortic Arch" additionalInfo="The aortic arch is a vital structure in the circulatory system, originating from the heart's left ventricle. It forms a curved arch over the heart, serving as the main channel for oxygen-rich blood distribution. Three primary branches, the brachiocephalic artery, left common carotid artery, and left subclavian artery, emerge from the aortic arch to supply blood to the head, neck, and upper extremities. The arch regulates blood pressure and plays a critical role in maintaining proper circulation throughout the body. Any abnormalities or issues with the aortic arch can significantly impact cardiovascular health." showAnnotations={props.showAnnotations}  />
      <Annotation position={[-0.5,-0.2,2]} content="Right Atrium" showAnnotations={props.showAnnotations}  />
      <Annotation position={[-0.2,-1,2]} content="Right Ventricle" showAnnotations={props.showAnnotations} />
      <Annotation position={[1.20,-0.09,2]} content="Left Atrium" additionalInfo="The left atrium is a chamber in the heart that receives oxygenated blood from the lungs and pumps it into the left ventricle, ensuring the continuous circulation of oxygen-rich blood throughout the body. It's an essential component of the cardiovascular system, contributing to the efficient functioning of the heart and overall circulation. The left atrium plays a crucial role in maintaining healthy cardiac function and effective blood supply to the body's tissues and organs." showAnnotations={props.showAnnotations}  />
      <Annotation position={[1.2,-0.8,2]} content="Left Ventricle"  showAnnotations={props.showAnnotations} additionalInfo="The left ventricle is the main chamber of your heart. It is responsible for pumping oxygen-rich blood into your aorta (the largest artery in the body). If the heart has to work too hard to pump blood, the muscles in the walls of the left ventricle thicken."/> */}
    </group>
  );
}
function Model2(props) {
  const groupRef = useRef();
  const { scene } = useGLTF("./hemisected_brain.glb");
  const [rotationY, setRotationY] = useState(-Math.PI / 8); // Replace with the path to the second model

  useFrame(() => {
    groupRef.current.rotation.y = rotationY;
  });
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={scene} scale={0.03} />
      {/* <Annotation position={[0.5,1.5,2]} content="Aortic Arch" showAnnotations={props.showAnnotations}  />
      <Annotation position={[-0.5,0.5,2]} content="Right Atrium" showAnnotations={props.showAnnotations}  />
      <Annotation position={[0,-0.8,2]} content="Right Ventricle" showAnnotations={props.showAnnotations}  />
      <Annotation position={[2,0.3,1]} content="Left Atrium" showAnnotations={props.showAnnotations}  />
      <Annotation position={[2.2,-0.4,1]} content="Left Ventricle" showAnnotations={props.showAnnotations} /> */}
    </group>
  );
}

export default function Brain() {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [isBeating, setIsBeating] = useState(false);
  const [currentModel, setCurrentModel] = useState(1);
  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '18px',
    background: '#AA4A44',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
    width: '25vh',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'background 0.3s ease-in-out',
  };

  const toggleModel = () => {
    setCurrentModel(currentModel === 1 ? 2 : 1);
  };

  const toggleAnnotations = () => {
    setShowAnnotations(prevShowAnnotations => !prevShowAnnotations);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBeating(prevIsBeating => !prevIsBeating);
    }, 1000); // 1 second interval for the heartbeat animation

    return () => clearInterval(interval);
  }, []);

  const canvasRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      const { current: canvas } = canvasRef;
      if (canvas && canvas.camera && canvas.gl) {
        const { camera, gl } = canvas;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        gl.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const containerStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    overflowY: 'scroll', // Enable scrolling for the entire content
    display: 'flex',
    flexDirection: 'column', // Ensure content flows vertically
    alignItems: 'center', // Center content horizontally
  };

  const mcqSectionStyle = {
    color: 'white',
    fontSize: '24px',
    width: '100vw',
    textAlign: 'left',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };




  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#101010' }}>
      <Row style={{ style: "margin: auto" }}>
        <Col className="mt-5 text-center"> <div style={{ color: 'white', fontSize: '40px', fontFamily: 'Courier', fontWeight: 'bold' }}>
          Brain
        </div></Col>
        <Col>
          <Canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }}
            camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={4} />
            <directionalLight position={[0, 10, 0]} intensity={2} />
            <directionalLight position={[0, -10, 0]} intensity={5} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <PresentationControls>
              <group position={[0, 0, 0]}>
                {currentModel === 1 ? <Model showAnnotations={showAnnotations} /> : <Model2 showAnnotations={showAnnotations} />}
              </group>
            </PresentationControls>
            {/* ... (your existing HTML components) ... */}
          </Canvas>
        </Col>
        <Col className="text-center text-white">
          <Row style={{ margin: '0' }}>
            <Col>
              <div style={{ textAlign: 'justify' }}><span style={{ fontWeight: 'bold', fontSize: '30 px', textAlign: 'justify' }}>About </span><br></br>
                The brain is a complex and crucial organ that serves as the command center of the central nervous system in humans and many other animals. It is located within the skull and consists of various regions with distinct functions. The brain is responsible for coordinating and controlling a wide range of bodily functions, as well as processing and interpreting sensory information.

                Key components of the brain include the cerebrum, cerebellum, and brainstem. The cerebrum, divided into two hemispheres, is the largest part and is associated with higher cognitive functions such as thinking, memory, perception, and voluntary muscle movements. The cerebellum is responsible for coordinating motor activities and maintaining balance, while the brainstem controls basic life functions such as breathing, heartbeat, and digestion.

                Neurons, the basic units of the nervous system, form intricate networks in the brain. These neurons communicate through electrical and chemical signals, enabling the transmission of information. The brain's incredible plasticity allows it to adapt to experiences and learn from them throughout life.
              </div><br></br>
              <div style={{ textAlign: 'justify' }}><span style={{ fontWeight: 'bold', fontSize: '30 px' }}>Structure </span><br></br>
                The brain, the central organ of the nervous system, is a highly complex structure responsible for orchestrating a multitude of functions. Comprising the cerebrum, cerebellum, and brainstem, it is housed within the protective skull. The cerebrum, divided into hemispheres and lobes, governs higher cognitive functions, sensory perception, and motor control. The cerebellum coordinates voluntary muscle movements and maintains balance, while the brainstem regulates essential life functions. Additional structures, such as the thalamus, hypothalamus, hippocampus, amygdala, pineal gland, and pituitary gland, contribute to various physiological and psychological processes, including sensory relay, emotional responses, memory formation, and hormone regulation. The brain's complexity is further emphasized by its intricate network of neurons, gyri, sulci, and specialized regions that collectively enable consciousness, learning, and adaptation throughout life.</div></Col>
          </Row>
          <Row className="mt-5 mb-5">
            <Col className="text-end mt-3">
              <button class="button-24">
                {showAnnotations ? 'Hide Annotations' : 'Show Annotations'}
              </button>
            </Col>
            <Col className="text-center mt-3">
              <a href="/chatbot">
                <button class="button-24">
                  Questions?
                </button>
              </a>

            </Col>
            <Col className="text-start mt-3">
              <button class="button-24" onClick={toggleModel}>
                {currentModel === 1 ? 'Switch to Open Brain View' : 'Switch to Exterior Brain View'}
              </button>

            </Col>
          </Row>
        </Col>
      </Row>
      <Comment />
    </Container>


  );
}
