// JoyrideComponent.jsx
import React, { useEffect } from 'react';
import { useJoyride } from './JoyrideProvider';
import Joyride from 'react-joyride';

const JoyrideComponent = () => {
    const { joyrideSteps, runJoyride, startJoyride, handleJoyrideCallback } = useJoyride();

    useEffect(() => {
        if (joyrideSteps.length > 0 && !runJoyride) {
            startJoyride(Object.values(joyrideSteps));
        }
    }, [runJoyride, joyrideSteps]);

    return (
        <div>
            {console.log("render")}
            <Joyride
                steps={joyrideSteps}
                run={runJoyride}
                continuous
                scrollToFirstStep
                showSkipButton
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        arrowColor: '#e3ffeb',
                        backgroundColor: '#415f66',
                        overlayColor: '#525235',
                        primaryColor: '#838B8B',
                        textColor: '#b3e6c3',
                        width: 200,
                        zIndex: 1200,
                    }
                }
                }
            />
        </div>
    );
};

export default JoyrideComponent;
