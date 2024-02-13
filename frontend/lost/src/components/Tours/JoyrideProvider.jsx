//JoyrideProvider.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const JoyrideContext = createContext();


export const JoyrideProvider = ({ children }) => {
  const history = useHistory();
  const [joyrideSteps, setJoyrideSteps] = useState([]);
  const [runJoyride, setRunJoyride] = useState(false);
  const [allowJoyrideCallback, setAllowJoyrideCallback] = useState(true);


  const startJoyride = (steps) => {

    setJoyrideSteps([]);
    handleJoyrideCallback([]);
    setJoyrideSteps(steps);
    setRunJoyride(true);
    console.log("Joyride started with steps:", steps);
  };


  useEffect(() => {
    const startJoyrideWithDelay = () => {
        setTimeout(() => {
            startJoyride(Object.values(joyrideSteps));
        }, 1000); // Adjust the delay time as needed
    };

    if (joyrideSteps.length > 0 && !runJoyride) {
        startJoyrideWithDelay();
    }
}, [runJoyride, joyrideSteps]);

  var counter = 0;

  const handleJoyrideCallback = (data) => {
    const { action, index, statusType, type } = data;
    console.log("Joyride index:", index);


    if (action === "reset" && index === joyrideSteps.length - 1) {
      console.log("Resetting Joyride");
      setRunJoyride(false);
      setAllowJoyrideCallback(true);
    } else if (type === 'step:after') {

    }

    if (!allowJoyrideCallback) {
      console.log('Joyride callback is currently blocked.');
      return;
    }

    if (action === 'next' && index === 2 && window.location.href !== "./startpipeline") {
      console.log('Handling step index 2');


      setAllowJoyrideCallback(false);


      setRunJoyride(false);


      history.push("/startpipeline");





    }
    setRunJoyride(true);
    setAllowJoyrideCallback(true);
  };

  const value = {
    joyrideSteps,
    runJoyride,
    startJoyride,
    handleJoyrideCallback,
  };

  return (
    <JoyrideContext.Provider value={value}>
      {children}
    </JoyrideContext.Provider>
  );
};

export const useJoyride = () => {
  return useContext(JoyrideContext);
};

