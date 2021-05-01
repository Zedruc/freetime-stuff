function InitializationError() {
    throw { name: "InitializationError", message: "Library has to be initialized first!" }
}

function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
        return request.responseText;
};
// Private variables
var colors = readJSON("/src/resources/colors.json");
colors = JSON.parse(colors);
var lineColor = "#000000";
var lineWidth = 1;
var initialized;
var lastCoordinates;
var _graphElement;
var ctx;
var dataIsSet;
var _data;
class GraphJS {
    /**
     * Initializes the library.
     * 
     * @param {HTMLElement} graphElement 
     */
    static init(graphElement) {
        if (!graphElement) throw new ReferenceError("Parameter \"graphElement\" is required!")
        if (initialized) throw "Library already initialized. Use the the update method to update parameters";
        initialized = true;
        lastCoordinates = [0, 0];
        _graphElement = graphElement;
        ctx = _graphElement.getContext('2d');
    }

    /**
     * Provide data in coordination sets
     * 
     * [ [coordinate 1, coordinate 2], . . . ]
     * @param {Array} data 
     */
    static setData(data) {
        if (!initialized) InitializationError();
        dataIsSet = true;
        _data = data;
    }

    /**
     * returns and logs all predefined colors for GraphJS.setLineColor()
     * To show them in the console leave parameters empty,
     * to show them on the page make the first parameters a div element
     * @returns Color List
     */
    static colorList(ListElement = document.getElementById('id')) {
        if (!ListElement) {
            var temp = [];
            console.log("%c[GraphJS]\n", "color: #4287f5");
            for (let i = 0; i < colors.length; i++) {
                const element = colors[i];
                temp.push(element.name);
                console.log(`%c${element.name}`, `color: ${element.hex}`);
            }
            return temp.join(", ")
        }

        var elements = [];
        for (let i = 0; i < colors.length; i++) {
            const element = colors[i];
            var node = document.createElement("span");
            node.innerHTML = element.name + ", ";
            node.style.color = element.hex;
            elements.push(node)
        }
        for (let i = 0; i < elements.length; i++) {
            ListElement.appendChild(elements[i]);
        }
    }

    /**
     * If no value is given, it will default to black
     * @param {string} color 
     * @returns color
     */
    static setLineColor(color) {
        if (!initialized) InitializationError();
        if (!color) {
            lineColor = "#00000";
            return console.error("Color must be either Hex or a predefined one!\nTo get a list of all colors call GraphJS.colorList()");
        }
        if (color.startsWith("#")) {
            lineColor = color;
            return lineColor;
        }

        var found = false;
        for (let i = 0; i < colors.length; i++) {
            const colorObject = colors[i];
            if (colorObject.name.toLowerCase() === color.toLowerCase()) {
                found = true;
                lineColor = colorObject.hex;
            }
        }
        if (found) return lineColor;
        else console.error("Color must be either Hex or a predefined one!\nTo get a list of all colors call GraphJS.colorList()");
    }
    /**
     * Sets the width of the lines. It's recommended to keep it under 6
     * @param {Number} width 
     * @returns width
     */
    static setLineWidth(width) {
        if (!initialized) InitializationError();
        if (!width) {
            lineWidth = 1;
            return console.error("Width is required!")
        }

        lineWidth = width;
        if (width > 5) console.info("%c[GraphJS]", "color: #4287f5", " It is not recommended to set the line width to anything above 5.")
    }

    /**
     * Draws given data onto graph
     * @param {Array} coordinationSet 
     */
    static drawGraph() {
        if (!initialized) InitializationError();
        if (!dataIsSet) throw new Error("No graph data provided")
        for (let i = 0; i < _data.length; i++) {
            if (_graphElement.width < _data[i][0]) {
                _graphElement.width = _data[i][0];
                lastCoordinates = [0, 0];
                this.drawGraph(_data);
                return;
            }
            if (lastCoordinates[0] > _data[i][0]) {
                ctx.clearRect(0, 0, _graphElement.width, _graphElement.height);
                ctx.font = "30px Arial";
                ctx.fillText("Illegal coordinates. Check errors.", _graphElement.height / 2, _graphElement.height / 2);
                console.log(`Current X must be greater than last X coordinate\nlast X ${lastCoordinates[0]} > current X ${_data[i][0]}`);
                throw new Error(`Illegal coordinates`)
            }
            ctx.beginPath();
            ctx.moveTo(lastCoordinates[0], lastCoordinates[1]);
            lastCoordinates = _data[i];
            ctx.lineTo(_data[i][0], _data[i][1]);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
    }
    /**
     * Removes all lines from the canvas.
     * Does not reset the data
     */
    static clearGraph() {
        if (!initialized) InitializationError();
        ctx.clearRect(0, 0, _graphElement.width, _graphElement.height);
    }

    /**
     * Allows to load your conifgurations from a JSON file
     * @param {String} filePath 
     */
    static loadFromConfigJSON(filePath = "") {
        var config = readJSON(filePath);
        config = JSON.parse(config)
        if (!config.initElementId) throw Error("Value initElementId in your config JSON must be present!");

        if (!config.coordinationSets) throw Error("Value coordinationSets in your config JSON must be present!")
        this.init(document.getElementById(config.initElementId));
        this.setData(config.coordinationSets);
        if (config.styling) {
            if (config.styling.lineColor && typeof (config.styling.lineColor) == "string") this.setLineColor(config.styling.lineColor);
            else console.info("%c[GraphJS]", "color: #4287f5", "typeof lineColors must be String");
            if (config.styling.lineWidth && typeof (config.styling.lineWidth) == "number") this.setLineWidth(config.styling.lineWidth);
            else console.info("%c[GraphJS]", "color: #4287f5", "typeof lineWidth must be Number");
        }
    }
}
export default GraphJS;