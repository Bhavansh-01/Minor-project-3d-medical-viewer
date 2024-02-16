import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
const QuestionAnswering = () => {
  // const {user,isAuthenticated}=useAuth0();
  const [paragraph, setParagraph] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleGetAnswer = async () => {
    try {
        const response = await axios.post(
          'http://localhost:5000/',
          {
            paragraph: "The heart is a muscular organ in most animals. This organ pumps blood through the blood vessels of the circulatory system.[1] The pumped blood carries oxygen and nutrients to the body, while carrying metabolic waste such as carbon dioxide to the lungs.[2] In humans, the heart is approximately the size of a closed fist and is located between the lungs, in the middle compartment of the chest, called the mediastinum. In humans, other mammals, and birds, the heart is divided into four chambers: upper left and right atria and lower left and right ventricles.[4][5] Commonly the right atrium and ventricle are referred together as the right heart and their left counterparts as the left heart.[6] Fish, in contrast, have two chambers, an atrium and a ventricle, while most reptiles have three chambers.[5] In a healthy heart blood flows one way through the heart due to heart valves, which prevent backflow.[3] The heart is enclosed in a protective sac, the pericardium, which also contains a small amount of fluid. The wall of the heart is made up of three layers: epicardium, myocardium, and endocardium.[7] In all vertebrates the heart has an asymmetric orientation, almost always on the left side. According to one theory this is caused by a developmental axial twist in the early embryo. The heart pumps blood with a rhythm determined by a group of pacemaker cells in the sinoatrial node. These generate an electric current that causes the heart to contract, traveling through the atrioventricular node and along the conduction system of the heart. In humans, deoxygenated blood enters the heart through the right atrium from the superior and inferior venae cavae and passes to the right ventricle. From here it is pumped into pulmonary circulation to the lungs, where it receives oxygen and gives off carbon dioxide. Oxygenated blood then returns to the left atrium, passes through the left ventricle and is pumped out through the aorta into systemic circulation, traveling through arteries, arterioles, and capillaries—where nutrients and other substances are exchanged between blood vessels and cells, losing oxygen and gaining carbon dioxide—before being returned to the heart through venules and veins.[10] The heart beats at a resting rate close to 72 beats per minute.[11] Exercise temporarily increases the rate, but lowers it in the long term, and is good for heart health. The cardiac cycle is the sequence of events in which the heart contracts and relaxes with every heartbeat. Each atrium is connected to its ventricle by a one-way valve. The valve on the right side of the heart is called the tricuspid valve, while the valve on the left side is called the mitral valve. The familiar 'lub-dub' sound of the heartbeat is caused by the rhythmic closing of the heart valves as blood is pumped in and out of the chambers. The heart rate is regulated by a special cluster of cells in the right atrium, called the sinus node. The sinus node prompts the upper chambers to contract first. Then, an electrical impulse is sent to a second cluster of cells (the atrioventricular node), which is found between the upper and lower chambers of the heart. The electrical impulse causes the lower chambers to contract. At rest, your heart beats approximately 60 to 100 times a minute.",
            question: question
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

    setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error getting answer:', error);
    }
  };

  return (
    // !isAuthenticated &&(
    //   <div> Please Log In</div>
    // )
    (
    <div className="QnContainer">

      <h1 className="Qnh1">Got Questions?</h1>
      {/* <label htmlFor="paragraph">Enter a paragraph:</label><br />
      <textarea
        id="paragraph"
        rows="5"
        cols="50"
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        placeholder="Enter a paragraph"
      ></textarea>
      <br /><br /> */}

      <label className="lqn" htmlFor="question">Enter a question:</label><br />
      <input
        type="text"
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter a question"
      />
      <br /><br />

      <button className="bnQn" onClick={handleGetAnswer}>Get Answer</button>

      {answer && (
        <div className="answer">
          <h2 className="Qnh2">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
    )
  );
};

export default QuestionAnswering;
