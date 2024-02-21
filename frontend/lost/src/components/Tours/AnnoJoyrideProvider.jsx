import React, { createContext, useContext, useEffect, useRef } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const JoyrideContext = createContext();

export const AnnoJoyrideProvider = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  //const [isModalLoaded, setIsModalLoaded] = useState(false);
  const [state, setState] = React.useState({
    run: false,
    stepIndex: 0,
    steps: [],
  });

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  
  const startJoyride = (steps) => {
    if (isMounted.current) {
      setState(prevState => ({
        ...prevState,
        steps,
        run: true,
      }));
    }
  };

  const stopJoyride = () => {
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, run: false }));
    }
  };

  const setStepIndex = (index) => {
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, stepIndex: index }));
    }
  };

  const setSteps = (steps) => {
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, steps }));
    }
  };

  const checkTargetAvailability = (selector) => {
    console.log("SELECTOR: " + selector)
    return document.querySelector(selector) !== null;
  };

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    console.log(`Joyride callback data: action=${action}, index=${index}, status=${status}, type=${type}`);
    console.log(state.steps[index]?.target)

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setState((prevState) => ({ ...prevState, run: false, stepIndex: 0 }));
    } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      let nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      if (!checkTargetAvailability(state.steps[nextStepIndex]?.target)) {
        console.warn(`Target for step ${nextStepIndex} not found. Adjusting tour logic.`);
        // Adjust logic here, e.g., delay or skip step
      }
      if (action === ACTIONS.NEXT && [1, 2, 3, 4].includes(index)) {

        if (index === 1) { history.push("./startpipeline"); }
        if (index === 2) { dispatch(selectPipelineById(6)); }
        if (index === 3) { dispatch(handleNodeClick(0)); }
        if (index === 4) {
          console.log(index)
        }

        setTimeout(() => {
          if (isMounted.current) {
            setState((prevState) => ({
              ...prevState,
              run: true,
              stepIndex: nextStepIndex,
            }));
          }
        }, 500); // Verzögerung für spezifische Schritte
      } else {
        setTimeout(() => {
          if (isMounted.current) {
            setState((prevState) => ({
              ...prevState,
              run: true,
              stepIndex: nextStepIndex,
            }));
          }
        }, 1000); // Standardverzögerung
      }
    }
  };

  return (
    <JoyrideContext.Provider value={{ startJoyride, stopJoyride, setStepIndex, setSteps }}>
      {children}
      <Joyride
        {...state}
        continuous
        showSkipButton
        spotlightClicks
        showProgress
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 1000,
          },
        }}
      />
    </JoyrideContext.Provider>
  );
};

export const useJoyride = () => useContext(JoyrideContext);
