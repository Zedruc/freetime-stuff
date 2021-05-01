import GraphJS from "../../src/GraphJS.js";
var data = [
    [100, 200],
    [200, 300],
    [700, 400],
    [800, 500],
    [1500, 200]
]

var width = 5;

// Initialize GraphJS with the canvas to use as graph
GraphJS.init(document.getElementById('graph'));

// Set the data to draw (x, y pairs called coordination sets)
GraphJS.setData(data);


//#region  Optional styling
GraphJS.setLineColor("Blizzard Blue") // Defaults to black without a parameter

// setLineColor accepts HEX and names of predefined colors
// To list them call .colorList()
GraphJS.colorList(); // Accepts HTMLElement as parameter to show the colors in it

// Sets the width of the drawn lines
GraphJS.setLineWidth(width);
//#endregion


// Finally, draw the styled and set data to the graph
GraphJS.drawGraph();