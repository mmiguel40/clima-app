import React, { useEffect, useState } from 'react';
import './AnimatedBackground.css';

const IMAGES = [
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop', // City city
    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=2544&auto=format&fit=crop', // Weather/Clouds
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', // Tech/Map abstract
    'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2551&auto=format&fit=crop'  // Nature/Rain
];

const AnimatedBackground: React.FC = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % IMAGES.length);
        }, 6000); // Change every 6 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animated-background">
            {IMAGES.map((img, index) => (
                <div
                    key={img}
                    className={`bg-slide ${index === currentImage ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}
            <div className="bg-overlay" />
        </div>
    );
};

export default AnimatedBackground;
