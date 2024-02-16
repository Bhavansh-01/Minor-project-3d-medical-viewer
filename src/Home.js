import React from 'react';
import './App.css';

const items1 = [
  { title: 'Brain', link: '/brain' },
 
];

const items2 = [
    { title: 'Heart', link: '/heart' },
  ];

  const items3 = [
    { title: 'Lungs', link: '/lungs' },
   
  ];
  
  

const Section = ({ title, items }) => (
  <div className="section">
    <div className="section-title">{title}</div>
    {items.map((item, index) => (
      <div key={index} className="item">
        <a href={item.link}>{item.title}</a>
      </div>
    ))}
  </div>
);

function App() {
  return (
    <div className="app">
      <h1 className="page-heading">3D Medical Viewer</h1>
      <div className="sections-container">
        <Section title="Nervous System" items={items1} />
        <Section title="Circulatory System" items={items2} />
        <Section title="Respiratory System" items={items3} />
      </div>
    </div>
  );
}

export default App;
