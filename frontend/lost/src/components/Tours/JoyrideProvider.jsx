//JoyrideProvider.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import { useMount, useSetState} from 'react-use'
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
    
  };
  // useMount(() => {
  //   // setState
  // })

  useEffect(() => {
    console.log("RunJoyride: " + runJoyride);
  
    const startJoyrideWithDelay = () => {
      setTimeout(() => {
        startJoyride(Object.values(joyrideSteps));
      }, 1000);
    };
  
    if (joyrideSteps.length > 0 && !runJoyride) {
      startJoyrideWithDelay();
    }
  }, [runJoyride, joyrideSteps]);

  

  const handleJoyrideCallback = (data) => {
    const { action, index, type } = data;
    const currentStepTarget = joyrideSteps[index]?.target;
   console.log(index)
    if (action === "reset" && index === joyrideSteps.length - 1) {
      setRunJoyride((prevRunJoyride) => !prevRunJoyride);
      setAllowJoyrideCallback(true);
    } else if (type === 'step:after') {
      const nextStepTarget = document.querySelector(joyrideSteps[index + 1]?.target);
      if (nextStepTarget) {
        console.log("Allowed");
        setAllowJoyrideCallback(true);
      }
    }
  
    if (!allowJoyrideCallback) {
      console.log('Joyride callback is currently blocked.');
      return;
    }
  
    if (action === 'next' && index === 2 && window.location.href !== "./startpipeline") {
      setAllowJoyrideCallback(false);
      setRunJoyride((prevRunJoyride) => !prevRunJoyride);
  
      history.push("/startpipeline");
  
      // Delay before continuing the joyride
      // setTimeout(() => {
        setRunJoyride((prevRunJoyride) => !prevRunJoyride);
        
      // }, 1000); 
    }
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

