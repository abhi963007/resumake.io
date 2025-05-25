import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';

// Import animation data directly
import animationData from '../../../public/animations/resume-animation-data';

const AnimationContainer = styled.div`
  width: 320px;
  max-width: 100%;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.15));
`;

const ResumeAnimation = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render during SSR to prevent hydration issues
  }

  return (
    <AnimationContainer>
      <Lottie 
        animationData={animationData}
        loop={true}
        autoplay={true}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </AnimationContainer>
  );
};

export default ResumeAnimation;
