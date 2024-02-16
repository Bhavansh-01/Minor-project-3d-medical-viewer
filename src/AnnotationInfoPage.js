import React from 'react';
import './App.css';
const AnnotationInfoPage = ({ annotation }) => {
  return (
    <div className="annot" style={{ padding: '20px' }}>
      <h2>{annotation.title}</h2>
      <p>{annotation.additionalInfo}</p>
    </div>
  );
};

export default AnnotationInfoPage;
