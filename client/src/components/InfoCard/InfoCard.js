import React from 'react';
import './InfoCard.css';

const InfoCard = ({city}) => {
  return (
    <div className="courses-container">
        <div className="course">
            <div className="course-preview">
                <h6>VISIT</h6>
                <h2>{city.name}</h2>
                <a href="#">{city.state}<i className="fas fa-chevron-right"></i></a>
            </div>
            <div className="course-info">
                <div className="progress-container">
                    <div className="progress"></div>
                </div>
                <h2>{city.tag}</h2>
                <p>{city.desc}</p>
            </div>
        </div>
    </div>
  )
}

export default InfoCard