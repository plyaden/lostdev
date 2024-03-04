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
        if (index === 4) { toggleDatasourceDropdown(); }

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


// /*target 1., index 0*/   { target: '.step1', content: 'U started a Guide-Tour, to create a new Annotationpipline'  },
// /*target 2., index 1*/   { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div:nth-child(1) > div > div > div.card-body > div > div:nth-child(1) > div > button > span', content: 'U can start Annotation task with "Continue"'  },
// /*target 3., index 2*/   { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div:nth-child(2) > div > div > div.card-body > div > div.rt-table > div.rt-tbody > div:nth-child(1) > div > div:nth-child(8)', content: 'Or if u want to selct a special Annotation Task u can click on Annotate'  },
// /*target 4., index 3*/  { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main', content: 'Thats ur Anno Overlay, u can see the Pictures u need to annotate and some more, lets do a quick Tutorial, to train you and u will become a Annotationmaster! :)'  },
// /*target 5., index 4*/   { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div:nth-child(1)', content: 'In this part of the Page u can see some Informations about ur Annotask.'  },
// /*target 6., index 5*/   { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div:nth-child(1) > div.row > div:nth-child(1)', content: 'This is the Name of the Annotationtask u are working on.'  },
// /*target 7., index 6*/  { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div:nth-child(1) > div.row > div:nth-child(2)', content: 'This is the Piplinename. The Piplinename and the Annotationname often reveal information about the task.'  },
// /*target 8., index 7*/  { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div:nth-child(1) > div.row > div:nth-child(3) > div', content: 'Here u can see u Progress of the Annotationtask.'  },
// /*target 9., index 8*/  { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div:nth-child(1) > div.row > div:nth-child(4) > div', content: 'This shows you how long on average you have taken for an annotation step.'  },
// /*target 10.,index 9*/  { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div:nth-child(1) > div.row > div:nth-child(4) > div', content: 'This shows you how long on average you have taken for an annotation step.'  },

// /*target 11.,index 10*/  { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div:nth-child(2) > div.row', content: '"In this series, there are some tools that you need for annotating or that help you with annotating."'  },
// /*target 12.,index 11*/  { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div:nth-child(2) > div.row > div.col-6.col-sm-6.col-lg-6 > div > div > input', content: 'Here u can chose a Label, for example u want to Select all Pictures with Cars, u need to Select Car.'  },
// /*target 13.,index 12*/  { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div:nth-child(2) > div.row > div:nth-child(2) > div', content: 'If u did something wrong with ur last Annotation Task u can go back and forward here.'  },
// /*target 14.,index 13*/  { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div:nth-child(2) > div.row > div:nth-child(3) > div > button:nth-child(1)', content: 'Here u can Reverse ur Annotations, click on it, all'  },


// ich brauche eine ID für jedes  Teil was ich anvisieren will.