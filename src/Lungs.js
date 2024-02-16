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
  const { scene } = useGLTF("./realistic_human_lungs.glb");


  // useFrame(() => {
  //   // Rotate the model in the y-axis
  //   if (groupRef.current) {
  //     groupRef.current.rotation.y += 0.001;
  //   }
  // });

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} scale={17} />
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

export default function Lungs() {
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
          Lungs
        </div></Col>
        <Col>
          <Canvas className="mt-5" ref={canvasRef} style={{ width: '100vw', height: '60vh' }}
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
                The lungs, vital components of the respiratory system, are paired organs situated within the chest cavity. Functioning in tandem with the airway system, they facilitate the exchange of oxygen and carbon dioxide crucial for sustaining life. Air travels through the trachea, bronchi, and bronchioles, ultimately reaching the alveoli—tiny air sacs surrounded by capillaries—where gas exchange occurs. During inhalation, oxygen enters the bloodstream, while carbon dioxide is expelled during exhalation. The diaphragm, assisted by the ribcage and intercostal muscles, regulates breathing by expanding the chest during inhalation and contracting it during exhalation. Efficient lung function is paramount for maintaining optimal oxygen levels and eliminating waste gases, emphasizing the importance of a healthy lifestyle to support respiratory well-being.
              </div><br></br>
              <div style={{ textAlign: 'justify' }}><span style={{ fontWeight: 'bold', fontSize: '30 px' }}>Structure </span><br></br>

                The lungs, situated in the thoracic cavity and protected by the ribcage, are essential respiratory organs with a complex structure designed for efficient gas exchange. Comprising lobes, airways, and intricate branching bronchioles, each lung houses tiny air sacs called alveoli at its terminus. Encased in a double-layered pleura, the lungs are supported by the diaphragm and respiratory muscles, orchestrating the inhalation and exhalation process. Pulmonary arteries bring deoxygenated blood to the lungs, where oxygen is transferred to the bloodstream in the alveoli, and carbon dioxide is expelled. Surfactant, lining the alveoli, prevents collapse during exhalation. This intricate system ensures the vital function of exchanging oxygen and carbon dioxide, supporting cellular respiration and sustaining life.
              </div></Col>
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
                {currentModel === 1 ? 'Switch to Open Lung View' : 'Switch to Exterior Lung View'}
              </button>

            </Col>
          </Row>
        </Col>
      </Row>
      <Comment />
    </Container>


  );
}
