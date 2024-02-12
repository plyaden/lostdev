import { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const JoyrideContext = createContext();

export const JoyrideProvider = ({ children }) => {
  const history = useHistory();
  const [joyrideSteps, setJoyrideSteps] = useState([]);
  const [runJoyride, setRunJoyride] = useState(false);

  const startJoyride = (steps) => {
    setJoyrideSteps(steps);
    setRunJoyride(true);
    console.log("Joyride started with steps:", steps);
  };

  useEffect(() => {
    if (!runJoyride && joyrideSteps.length > 0) {
      startJoyride(Object.values(joyrideSteps));
    }
  }, [runJoyride, joyrideSteps, startJoyride]);


  var counter = 0;

  const handleJoyrideCallback = (data) => {
    const { action, index } = data;
    
    counter +=1;
    console.log("counter :" + counter);

    if (action === 'next' && index === 1 && !window.location.href.includes("/startpipeline")) {
      console.log('Handling step index 1');
  
      
      setTimeout(() => {
        console.log('Starting Joyride again for step 1...');
        
      }, 2000); 
    }
  
    if (action === 'next' && index === 2 && window.location.href !== "./startpipeline") {
      console.log('Handling step index 2');
  
        setRunJoyride(false);
        history.push("/startpipeline");
      
        
        setTimeout(() => {
          console.log('Starting Joyride again for step 2...');
          setRunJoyride(true);
        }, 10000); // Adjust the delay time as needed
       
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
// geht das hier?
