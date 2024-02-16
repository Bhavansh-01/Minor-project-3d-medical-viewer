import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, PresentationControls, OrbitControls } from "@react-three/drei";
import { useGLTF } from '@react-three/drei/core/useGLTF';
import Comment from './comment_section.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function Annotation(props) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsPopupVisible(true);
    setIsActive(true);

  };

  const handleMouseLeave = () => {
    setIsPopupVisible(false);
    setIsActive(false);
  };
  return (
    <Html position={props.position} style={{ display: props.showAnnotations ? 'block' : 'none' }}>
      <div onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} className={`annot ${isActive ? 'active' : ''}`} style={{ background: 'white', padding: '10px', borderRadius: '95px', position: 'relative' }}>
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
            zIndex: 100,
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
  const { scene } = useGLTF("./realistic_human_heart.glb");


  // useFrame(() => {
  //   // Rotate the model in the y-axis
  //   if (groupRef.current) {
  //     groupRef.current.rotation.y += 0.001;
  //   }
  // });

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} scale={3} />
      <Annotation position={[-1., 1.5, 0]} className="annot" content="Aortic Arch" additionalInfo="The aortic arch is a vital structure in the circulatory system, originating from the heart's left ventricle. It forms a curved arch over the heart, serving as the main channel for oxygen-rich blood distribution. Three primary branches, the brachiocephalic artery, left common carotid artery, and left subclavian artery, emerge from the aortic arch to supply blood to the head, neck, and upper extremities. The arch regulates blood pressure and plays a critical role in maintaining proper circulation throughout the body. Any abnormalities or issues with the aortic arch can significantly impact cardiovascular health." showAnnotations={props.showAnnotations} />
      <Annotation position={[-2, -0.5, 0]} className="annot" content="Right Atrium" showAnnotations={props.showAnnotations} />
      <Annotation position={[-1.2, -1.5, 0]} className="annot" content="Right Ventricle" showAnnotations={props.showAnnotations} additionalInfo="
The right ventricle is one of the four chambers of the human heart, situated in the lower part of the organ. It plays a crucial role in the circulatory system by receiving deoxygenated blood from the right atrium and pumping it into the pulmonary artery. From the pulmonary artery, the blood is directed to the lungs for oxygenation." />
      <Annotation position={[1, -0.3, 0]} className="annot" content="Left Atrium" additionalInfo="The left atrium is a chamber in the heart that receives oxygenated blood from the lungs and pumps it into the left ventricle, ensuring the continuous circulation of oxygen-rich blood throughout the body. It's an essential component of the cardiovascular system, contributing to the efficient functioning of the heart and overall circulation. The left atrium plays a crucial role in maintaining healthy cardiac function and effective blood supply to the body's tissues and organs." showAnnotations={props.showAnnotations} />
      <Annotation position={[0.8, -1.3, 0]} className="annot" content="Left Ventricle" showAnnotations={props.showAnnotations} additionalInfo="The left ventricle is the main chamber of your heart. It is responsible for pumping oxygen-rich blood into your aorta (the largest artery in the body). If the heart has to work too hard to pump blood, the muscles in the walls of the left ventricle thicken." />
    </group>
  );
}
function Model2(props) {
  const groupRef = useRef();
  const { scene } = useGLTF("./open_heart.glb");
  const [rotationY, setRotationY] = useState(-Math.PI / 8); // Replace with the path to the second model

  useFrame(() => {
    groupRef.current.rotation.y = rotationY;
  });
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={scene} scale={0.9} />
      <Annotation position={[0.5, 1.5, 2]} content="Aortic Arch" showAnnotations={props.showAnnotations} />
      <Annotation position={[-0.5, 0.5, 2]} content="Right Atrium" showAnnotations={props.showAnnotations} />
      <Annotation position={[0, -0.8, 2]} content="Right Ventricle" showAnnotations={props.showAnnotations} />
      <Annotation position={[2, 0.3, 1]} content="Left Atrium" showAnnotations={props.showAnnotations} />
      <Annotation position={[2.2, -0.4, 1]} content="Left Ventricle" showAnnotations={props.showAnnotations} />
    </group>
  );
}

export default function Heart() {
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
          Heart
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
                The heart is a vital organ in the human body that functions as the central component of the circulatory system. It is a muscular organ located in the chest, primarily on the left side, and is responsible for pumping blood throughout the body. The human heart is divided into four chambers: the left and right atria (upper chambers) and the left and right ventricles (lower chambers). The heart's main function is to pump oxygenated blood from the lungs to the rest of the body and return deoxygenated blood to the lungs for oxygenation.

                The heart operates through a coordinated rhythm of contractions and relaxations, facilitated by a specialized electrical conduction system. The cardiac cycle involves systole (contraction) and diastole (relaxation) phases, ensuring the continuous flow of blood to meet the body's oxygen and nutrient needs.
              </div><br></br>
              <div style={{ textAlign: 'justify' }}><span style={{ fontWeight: 'bold', fontSize: '30 px' }}>Structure </span><br></br> The heart is a muscular organ located in the chest, slightly to the left of the center. It is a vital component of the circulatory system, responsible for pumping blood throughout the body to deliver oxygen and nutrients to cells and remove waste products. The human heart is roughly the size of a fist and is comprised of four chambers: two atria (upper chambers) and two ventricles (lower chambers).

                The right atrium receives deoxygenated blood from the body and pumps it into the right ventricle. The right ventricle then sends the blood to the lungs for oxygenation. Oxygenated blood returns to the left atrium from the lungs and is pumped into the left ventricle. The left ventricle then propels the oxygen-rich blood throughout the body.

                The heart's contractions are controlled by a specialized electrical conduction system, ensuring a coordinated rhythm known as the cardiac cycle. The heart's continuous pumping action maintains blood circulation, supporting various physiological processes and sustaining life. Regular exercise, a balanced diet, and other healthy lifestyle choices contribute to overall heart health and reduce the risk of cardiovascular diseases.</div></Col>
          </Row>
          <Row className="mt-5 mb-5">
            <Col className="text-end mt-3">
              <button class="button-24" onClick={toggleAnnotations}>
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
                {currentModel === 1 ? 'Switch to Open Heart View' : 'Switch to Exterior Heart View'}
              </button>

            </Col>
          </Row>
        </Col>
      </Row>
      <Comment />
    </Container>


  );
}
