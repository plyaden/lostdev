import $ from "cash-dom"

import appModel from "../../appModel"

import "./toolbar.styles.scss"
import * as toolbarView from "./toolbarView"

import * as imagePresenter from "components/image/imagePresenter"

import { enableBBoxCreation, disableBBoxCreation } from "./tool-bbox"
import { enablePointCreation, disablePointCreation } from "./tool-point"
import { disableLineCreation, enableLineCreation } from "./tool-line"
import { enablePolygonCreation, disablePolygonCreation } from "./tool-polygon"

// // no other element should be selected when creating a drawable, for
// // example the label field could be selected.
// $(imageInterface.getSVG()).on("mousedown", $event => {
// 	if(mouse.button.isRight($event.button)){
// 		document.activeElement.blur()
// 	}
// })
/* model binding */
appModel.controls.tool.on("update", () => {
	imagePresenter.resetSelection()
})
appModel.config.on("update", config => {
    if(config.actions.drawing){
        show()
        toolbarView.initTools(config.tools)

        // enable tool on selection, if no drawable is selected.
        appModel.controls.tool.on("update", (toolId) => {
            enableDrawableCreation(toolId)
        })
        // disable tool before unselection selection, if no drawable is selected.
        appModel.controls.tool.on("before-update", (toolId) => {
            if(toolId){
                disableDrawableCreation(toolId)
            }
        })

        // set handler depending on tool id string.
        function enableDrawableCreation(toolId: String){
            switch(toolId){
                case "sia-tool-point":
					enablePointCreation()
                    break
                case "sia-tool-line":
                    enableLineCreation()
                    break
                case "sia-tool-polygon":
					enablePolygonCreation()
                    break
                case "sia-tool-bbox":
					enableBBoxCreation()
                    break
                default: throw new Error("unknown tool id:", toolId)
            }
        }
        // unset handler depending on tool id string.
        function disableDrawableCreation(toolId: String){
            console.log("disable:", toolId)
            switch(toolId){
                case "sia-tool-point":
                    disablePointCreation()
                    break
                case "sia-tool-line":
                    disableLineCreation()
                    break
                case "sia-tool-polygon":
					disablePolygonCreation()
                    break
                case "sia-tool-bbox":
					disableBBoxCreation()
                    break
                default: console.warn("unknown tool id.")
            }
        }
    
        appModel.controls.tool.on("update", (id) => toolbarView.activateTool(id))
        appModel.controls.tool.on("before-update", (prevId) => toolbarView.deactivateTool(prevId))
    }
    else {
        hide()
    }
})

/* view binding */
$(toolbarView.html.ids["sia-toolbar-container"]).on("click", "button", ($event) => {
    appModel.controls.tool.update($event.target.closest("button").id)
})


/* export */
export function setLayout(layout: String){
    toolbarView.setLayout(layout)
}
export function show(){
    toolbarView.show()
}
export function hide(){
    toolbarView.hide()
}
export function getWidth(){
    return toolbarView.getWidth()
}
export function getHeight(){
    return toolbarView.getHeight()
}

