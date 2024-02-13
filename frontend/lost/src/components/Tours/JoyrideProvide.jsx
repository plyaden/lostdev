// JoyrideProvider.js
import React, { createContext, useContext, useEffect } from 'react';
import Joyride from 'react-joyride';

const JoyrideContext = createContext();

export const JoyrideProvider = ({ children }) => {
  const [state, setState] = React.useState({
    run: false,
    stepIndex: 0,
    steps: [],
  });

  const startJoyride = () => {
    setState((prevState) => ({ ...prevState, run: true }));
  };

  const stopJoyride = () => {
    setState((prevState) => ({ ...prevState, run: false }));
  };

  const setStepIndex = (index) => {
    setState((prevState) => ({ ...prevState, stepIndex: index }));
  };

  const setSteps = (steps) => {
    setState((prevState) => ({ ...prevState, steps }));
  };

  useEffect(() => {
    
    startJoyride();

    return () => {
      stopJoyride();
    };
  }, []); 

  return (
    <JoyrideContext.Provider
      value={{ startJoyride, stopJoyride, setStepIndex, setSteps }}
    >
      {children}
      <Joyride
        {...state}
        continuous
        showSkipButton
        spotlightClicks={true}
        callback={({ action, index, type }) => {
          // Handle Joyride events if needed
        }}
      />
    </JoyrideContext.Provider>
  );
};

export const useJoyride = () => {
  const context = useContext(JoyrideContext);
  if (!context) {
    throw new Error('useJoyride must be used within a JoyrideProvider');
  }
  return context;
};