import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from './Animation - 1702507922656.json';
const LoginLoader = () => {
    const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0 });
  /**
   * useEffect to update screen dimensions on window resize.
   */
    useEffect(() => {
        const updateDimensions = () => {
            setScreenDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions(); // Initialize with current dimensions

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);
  /**
   * Render the LoginLoader component with Lottie animation.
   */
    return (
        <div className='lottieContainer flex justify-center align-middle' style={{ height: 0.9 * screenDimensions.height, width: '100%', margin: "auto 0px" }} >
            <Lottie animationData={animationData} />
        </div>
    );
}

export default LoginLoader