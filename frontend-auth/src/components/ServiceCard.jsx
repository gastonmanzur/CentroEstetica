
import React from 'react';
// import './ServiceCard.css';

const ServiceCard = ({ image, title, subtitle, description }) => {
  return (
    <div className="service-card">
      <img src={image} alt={title} className="service-image" />
      <div className="service-content">
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
