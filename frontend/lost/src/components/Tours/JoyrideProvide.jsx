
import React, { createContext, useContext, useEffect, useRef } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { selectPipelineById } from '../../actions/Joyride/joyRideActions';
const JoyrideContext = createContext();

export const JoyrideProvider = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = React.useState({
    run: false,
    stepIndex: 0,
    steps: [],
  });
  
  // Ref, um zu verfolgen, ob die Komponente gemountet ist
  const isMounted = useRef(true);

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

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    // Logik zur Handhabung des Abschlusses oder Überspringens der Tour
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      console.log("1.")
      setState((prevState) => ({ ...prevState, run: false, stepIndex: 0 }));
    } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Bestimmen des nächsten Schrittindex basierend auf der Aktion
      let nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      console.log("2.")
      // Anpassung des Zustands basierend auf spezifischen Bedingungen
      if (action === ACTIONS.NEXT && index === 1 || 2) {
        // Beispiel: Navigation durchführen, wenn notwendig
        console.log("3.")
        if (index === 1) { history.push("./startpipeline") }
        if (index === 2) { dispatch(selectPipelineById(6)) }

        setTimeout(() => {
          console.log("4.")
          //if (isMounted.current) {
          setState((prevState) => ({
            ...prevState,
            run: true,
            stepIndex: nextStepIndex,
          }));
          //}
        }, 1000);
      }
      else {
        setTimeout(() => {
          console.log("4.")
          if (isMounted.current) {
            setState((prevState) => ({
              ...prevState,
              run: true,
              stepIndex: nextStepIndex,
            }));
          }
        }, 300);
        // Normaler Delay und Rendereffekte abzufangen

      }



    } else {


      // Hier können zusätzliche Fälle behandelt werden
    }
  };

  // Beispiel für eine Funktion, um die Tour zu starten oder fortzusetzen
  const startOrContinueTour = (stepIndex = 0) => {
    setState((prevState) => ({
      ...prevState,
      run: true,
      stepIndex,
    }));
  };

  // Beim Start oder Neustart der Tour
  useEffect(() => {
    startOrContinueTour(); // Beginnen Sie die Tour von vorne
    // Aufräumen
    return () => {
      if (isMounted.current) {
        stopJoyride();
      }
    };
  }, []);


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
            zIndex: 1000
          }
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