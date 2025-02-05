import React, { useState } from 'react';
import individualTherapyImage from './assets/individual.jpg';
import groupTherapyImage from './assets/group-therapy.jpg';
import medicationManagementImage from './assets/medication-management.jpg';
import stressManagementImage from './assets/stress-management.jpg';
import familyCounselingImage from './assets/family-counseling.jpg';

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            name: "Individual Therapy",
            info: "Individual therapy involves one-on-one sessions with a therapist to explore your thoughts, feelings, and behaviors.",
            image: individualTherapyImage,
        },
        {
            name: "Group Therapy",
            info: "Group therapy involves sessions with multiple participants led by a therapist, providing shared support and perspectives.",
            image: groupTherapyImage,
        },
        {
            name: "Medication Management",
            info: "Medication management ensures safe and effective use of psychiatric medications as part of your treatment plan.",
            image: medicationManagementImage,
        },
        {
            name: "Stress Management Techniques",
            info: "Learn effective techniques to manage and reduce stress for a healthier and more balanced life.",
            image: stressManagementImage,
        },
        {
            name: "Family Counseling",
            info: "Family counseling focuses on improving communication and resolving conflicts within families.",
            image: familyCounselingImage,
        }
    ];

    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    return (
        <div className="services">
            <h1>Our Services</h1>
            <ul>
                {services.map((service, index) => (
                    <li
                        key={index}
                        onClick={() => handleServiceClick(service)}
                        style={{ cursor: 'pointer', marginBottom: '10px', fontWeight: 'bold' }}
                    >
                        {service.name}
                    </li>
                ))}
            </ul>
            {selectedService && (
                <div className="service-info-container" style={{ display: 'flex', marginTop: '20px' }}>
                    <div className="service-info" style={{ flex: '1', paddingRight: '20px' }}>
                        <h2>{selectedService.name}</h2>
                        <p>{selectedService.info}</p>
                    </div>
                    <div className="service-image" style={{ flex: '1' }}>
                        <img 
                            src={selectedService.image} 
                            alt={selectedService.name} 
                            style={{ width: '100%', height: 'auto', borderRadius: '10px' }} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;
