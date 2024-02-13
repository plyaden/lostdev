import React, { useEffect } from 'react';
import { useJoyride } from './JoyrideProvider';
import Joyride from 'react-joyride';

const JoyrideComponent = () => {
    const { joyrideSteps, runJoyride, startJoyride, handleJoyrideCallback } = useJoyride();

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

    return (
        <div>
            {console.log("render")}
            <Joyride
                disableOverlayClose={true}
                hideCloseButton={true}
                steps={joyrideSteps}
                run={runJoyride}
                scrollToFirstStep
                showProgress
                showSkipButton
                continuous
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
                }}
            />
        </div>
    );
};

export default JoyrideComponent;