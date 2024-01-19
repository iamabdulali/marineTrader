import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './PackageCard.css';

const PackageCard = () => {
  const cardData = [
    {
      price: '£0.99',
      title: 'Standard',
      features: [
        '200 character description',
        'upto 5 photos',
        'chat, email, and call',
      ],
      color: '#1565D8',
    },
    {
      price: '£10.99',
      title: 'Premium',
      features: [
        'upto 50 photos',
        'upt 5 photos',
        'chat, email, and call',
      ],
      color: '#36B37E',
    },
    {
      price: '£19.99',
      title: 'Featured',
      features: [
        'upto 50 photos',
        'upt 5 photos',
        'chat, email, and call',
      ],
      color: '#FFB800',
    },
    // Add more objects for additional cards as needed
  ];

 
return (
  <div className="package-cards">
    {cardData.map((card, index) => (
      <div key={index} className="package-card" style={{ display: 'flex', flexDirection: 'column',minHeight:'25vh', height:'60vh', width:'55vh' }}>
        <hr style={{ borderColor: card.color, borderTopWidth: '3px' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ color: 'black', fontSize:35, fontWeight:'600' }}>
            {card.price} 
            <span style={{ color: '##8891B2', fontSize: 14 }}> /month</span>{' '}
          </h1>
          <h2 style={{ color: card.color, fontSize:20, fontWeight:'600' }}>{card.title}</h2>

          <div style={{
            display: 'flex',
            backgroundColor: '#E2E5FD',
            padding: '8px',
            borderRadius: '20px',
            border: 'none', // Remove the border
          }}>
            <button style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#E2E5FD',
              padding: '0 5px',
              fontSize: '5px',
              borderRadius: '10px',
              marginRight:'2px',
              alignSelf:'center',
              border: 'none', // Remove the border
              color:'#0D1A8B' 
            }}>
              <FontAwesomeIcon icon={faEye} style={{ marginBottom: '5px', marginRight:'5px'}} />
              
            </button>
            <p>View Display Search For Result</p>
            
           
          </div>
          
          <div style={{ height: '2px', width: '80%', background: '#CED4DA', margin: '10px auto' }}></div>

          <div style={{ justifyContent: 'space-evenly', padding: 20, listStyleType: 'none' }}>

          {card.features.map((feature, featureIndex) => (
  <div key={featureIndex} style={{ display: 'flex', flexDirection: 'row', listStyleType: 'none' }}>
    <FontAwesomeIcon
      icon={faCheck}
      style={{
        color: '#36B37E',
        borderRadius: '10px',
        padding: '5px', // Add padding for spacing
        fontSize: '10px',
      }}
    />
    <p style={{ color: '#183B56', fontSize: '18px',fontWeight:'400' }}>
      {feature}
    </p>
  </div>
))}

          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: 'auto' }}>
          <button
            style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '10px',
              color: '#0D1A8B',
              borderColor:'#0D1A8B',
              borderWidth:1,
              cursor: 'pointer',
              width: '75%',
              marginBottom: '10px', // Add margin for spacing between buttons
            }}
          >
            Get Started
            <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '10px' }} />
          </button>
        </div>
      </div>
    ))}
  </div>
);
};

export default PackageCard;
