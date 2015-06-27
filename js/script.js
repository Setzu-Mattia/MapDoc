/** Style **/
var white = "#FFFFFF";
var grey = "#333333";

var border0 = "#3B8183";
var border1 = "#ED303C";
var border2 = "#FAD089";
var background0 = "#3B8183";
var background1 = "#ED303C";
var background2 = "#FAD089";
var highlightBorder0 = border0;
var highlightBorder1 = border1;
var highlightBorder2 = border2;
var hightlightBackground0 = white;
var hightlightBackground1 = white;
var hightlightBackground2 = white;
var fontColor0 = white;
var fontColor1 = white;
var fontColor2 = white;
var radius0 = 3;
var radius1 = 3;
var radius2 = 3;

/** Scaling **/
var scale = 0.2;

/** Physics **/
var gForce = 0.7;

// Set-up
var networkNodes = new vis.DataSet();
var networkEdges = new vis.DataSet();
var data = {nodes: networkNodes,
           edges: networkEdges};
var options = {
    hover: true,
    groups: {
        interface: {
            color: {
                border: border0,
                background: background0,
                highlight: {
                    background: background0,
                    border: highlightBorder0,
                }
            },
            fontColor: white
        },
        type: {
            color: {
                border: border1,
                background: background1,
                highlight: {
                    background: background1,
                    border: highlightBorder1,
                }
            },
            fontColor: white,
        },
        annotation: {
          color: {
                border: border2,
                background: background2,
                highlight: {
                    background: background2,
                    border: highlightBorder2,
                }
            },
            fontColor: white,
        }
    },
    mass: gForce
}

// Basic code infos mock
var docMap = new Map();
var namesTable = new Map();

var network = new vis.Network(container(), data, options);


networkNodes.add([{id: 0, label: "Interface", group: "interface"},
             {id: 1, label: "Interface", group: "interface"},
             {id: 2, label: "Type", group: "type"},
             {id: 3, label: "Annotation", group: "annotation"}]);
networkEdges.add([{id: "0-1", from: 0, to: 1},
         {id: "2-1", from: 2, to: 1}]);

namesTable.set(0, "Interface 0");
namesTable.set(1, "Interface 1!");
namesTable.set(2, "Type 2");
namesTable.set(3, "Annotation 3!");

docMap.set(0, "Interesting comment 0!");
docMap.set(1, "Interesting comment 1!");
docMap.set(2, "Interesting comment 2!");
docMap.set(3, "Interesting comment 3!");