import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CHeader, CToggler, CHeaderBrand, CHeaderNav } from '@coreui/react'
// import { useTranslation } from 'react-i18next'
// routes config

// import TheHeaderDropdownLanguageSelector from './TheHeaderDropdownLanguageSelector'
import TheHeaderDropdownAccount from './TheHeaderDropdownAccount'

import actions from '../actions'

//JoyrideSetup

import { useJoyride } from '../components/Tours/JoyrideProvider';

const TheHeader = ({ numNavItems }) => {
    const dispatch = useDispatch()
    const isNavBarVisible = useSelector((state) => state.lost.isNavBarVisible)
    const { startJoyride } = useJoyride();
    const toggleSidebar = () => {
        dispatch(actions.setNavbarVisible(!isNavBarVisible))
    }
    const toggleSidebarMobile = () => {
        dispatch(actions.setNavbarVisible(!isNavBarVisible))
    }

    const renderSidebarToggler = () => {
        if (numNavItems) {
            if (numNavItems > 1) {
                return (
                    <>
                        <CToggler
                            inHeader
                            className="ml-md-3 d-lg-none"
                            onClick={toggleSidebarMobile}
                        />
                        <CToggler
                            inHeader
                            className="ml-3 d-md-down-none"
                            onClick={toggleSidebar}
                        />
                    </>
                )
            } else {
                dispatch(actions.setNavbarVisible(false))
            }
        }
        return null
    }

    // const { t } = useTranslation()
    return (
        <CHeader withSubheader>
            {renderSidebarToggler()}
            

            
            <button
                className='step1'
                onClick={() => {
                    console.log('Button clicked!');
                   // startJoyride(Object.values(joyrideStepsConfig));
                   startJoyride([
                    { target: '.step1', content: 'U started a Guide-Tour, to create a new Annotationpipline'  },
                    { target: '.step2', content: 'If u want to create a new Pipline for annotationtaks, u need to click on Start Pipline' },
                    { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div.pipeline-start-1 > div > div.rt-table > div.rt-tbody > div:nth-child(6) > div > div:nth-child(3) > button', content: 'Here you can chose a Annotation Modus, for our example we take the sia guide. Please click on Start!'},
                    { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div.pipeline-start-2 > div:nth-child(2) > svg > g > g > g.nodes > g:nth-child(1)', content: 'Jojojo'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-body > div > div:nth-child(1) > div > div > button', content: '123s'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-footer > button > span', content: 'And to acept click on "Okay"'},
                    { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div.pipeline-start-2 > div:nth-child(2) > svg > g > g > g.nodes > g:nth-child(2) > g > g > foreignObject > div > div > div.graph-node-body > div:nth-child(2)', content: 'Here u can select some options. But it also works with defauelt settings.'},
                    { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div.pipeline-start-2 > div:nth-child(2) > svg > g > g > g.nodes > g:nth-child(3) > g > g > foreignObject > div > div', content: 'Here you need to put in some Informations. Click to continue!'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-body > div > div.row > div.col-sm-6 > form > div:nth-child(1)', content: 'Put in the Name of the Annotation Task.'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-body > div > div.row > div.col-sm-6 > form > div:nth-child(2)', content: 'If you have some Instructions for the Annotationworker, but them in. This is not essential'}, 
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-body > div > div.container-stepper-wizard > div:nth-child(2) > div.shape-stepper-wizard', content: 'Click on this Button to go on.'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-body > div > div.annotask-modal-card.card', content: 'Her u can chose a Worker for the Annotationtask'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-body > div > div.container-stepper-wizard > div:nth-child(3)', content: 'Click on the Tablebutton, to chose a Labeltree.'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-body > div > div.annotask-modal-card.card > div > div', content: 'In this List are the Labeltree`s u have added. At the Moment there are only dummytrees, you can add Trees on the left Sidebar.'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-body > div > div.annotask-modal-card.card > div > div > div.rt-table > div.rt-tbody > div:nth-child(1) > div > div:nth-child(3) > button', content: 'Click on "Choose" to select this Tree'},
                    { target: '#ff79c98c-f481-4068-af87-72e2e84aa421 > div > canvas', content: 'This is the Labeltree. U can check if it is the one u need.'},
                    { target: '#ff79c98c-f481-4068-af87-72e2e84aa421 > div > canvas', content: 'If the Tree is Correct, u need to click on the highest Element to confirm.'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-body > div > div.container-stepper-wizard > div:nth-child(5) > div.shape-stepper-wizard', content: 'Click on the gearbutton.'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-body > div', content: 'In this section u can set some options for the Annotation-surface'},
                    { target: 'body > div:nth-child(7) > div > div.modal.fade.show > div > div > div.modal-footer > button', content: 'U can continiue by clicking okay'},
                    { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div.container-stepper-wizard > div:nth-child(3) > div.shape-stepper-wizard', content: 'Click on the Infomation-button'},
                    { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div.row > div.col-sm-6 > form > div:nth-child(1)', content: 'Enter a Piplinename here'  },
                    { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div.row > div.col-sm-6 > form > div:nth-child(2)', content: 'Enter a Description here, so you can check later what you started it for.'  },
                    { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div > div > div > div.container-stepper-wizard > div:nth-child(4) > div.shape-stepper-wizard', content: 'Next click on the accept Button'  },
                    { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div', content: 'Click to Start the Pipeline.'  },
                    { target: '#root > div.c-app.c-default-layout > div.c-wrapper > div > main > div > div > div > div', content: 'If u can see ur Annotationstask in the list, everything works as expected '  },
                  ]);
                
                }}
            >Start Tour</button>

            <CHeaderBrand className="mx-auto d-lg-none" to="/dashboard">
                <img alt="" style={{ height: 40 }} className="img-avatar" />
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto" />

            <CHeaderNav className="px-3">
                {/* <div>{t('general.selectedLanguage')}</div>
                <TheHeaderDropdownLanguageSelector /> */}
                <TheHeaderDropdownAccount />
            </CHeaderNav>
        </CHeader>
    )
}

export default TheHeader

