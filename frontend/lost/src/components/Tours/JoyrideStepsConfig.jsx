// JoyrideStepsConfig.jsx
import React from "react"; 
import { useJoyride } from "./JoyrideProvider";
import joyrideStepsConfig from "./JoyrideStepsConfig"; 

const JoyrideStepsConfig = () => {
  const { runJoyride, startJoyride } = useJoyride();

  React.useEffect(() => {
    if (!runJoyride) {
      console.log("Starting Joyride...");
      // startJoyride(Object.values(joyrideStepsConfig));
    }
  }, [runJoyride, startJoyride]);

  return null;
};

export default JoyrideStepsConfig;