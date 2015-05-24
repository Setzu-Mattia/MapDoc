// Click
network.on("doubleClick",
            function(properties) {
                zoom(properties, +1);
            });

// View documentation on hover
network.on("select",
            function(properties) {
                // Check for click on empty
                if (properties.nodes.length === 0) {
                    hideDocs();
                    return;
                }
    
                // Show html
                show(controllers);
                show(documentation);
                show(nodeTitle);
                show(nodeType);
                show(nodeComment);
                show(actionsBar);
                floatTo(container, -1);
                floatTo(controllers, +1);
    
                // Show docs
                showDocsForNode(parseInt(properties.nodes[0]));
                addNodeToTitle(parseInt(properties.nodes[0]));
            });


// Hide docs panel on click
function hideDocs() {
    controllers().classList.remove("right");
    controllers().classList.add("hidden");
    actionsBar().classList.add("hidden");
    
    container().classList.remove("left");
    network.moveTo(
        {position: network.getCenterCoordinates()});
}

// Show
function show(element) {
    element().classList.remove("hidden");
}


// Toggle visibility for the given element.
function toggleVisibility(element) {
    element().classList.toggle("hidden");
}


// Make the given element float to the
// given direction
function floatTo(element, direction) {
    if (direction === -1) {
        element().classList.add("left");
    }
    if (direction === +1) {
        element().classList.add("right");
    }
}


// Zoom either in or out
function zoom (properties, direction) {
    var currentScale = network.getScale();
    
    if (direction === +1) {
        network.moveTo({scale: currentScale + scale});
    } else {
        network.moveTo({scale: currentScale + scale});
    }
}


// Show docs
function showDocsForNode (nodeId) {    
    var node = networkNodes.get(nodeId);
    
    nodeTitle().innerHTML = node.label;
    nodeType().innerHTML = node.group;
    nodeComment().innerHTML = docMap.get(nodeId);
    
    colorDocs(nodeId);
}

// Edit title, add current node name
function addNodeToTitle(nodeId) {
    var node = networkNodes.get(nodeId);
    
    title()[0].innerHTML = "Title " + node.label;
}


// Color docs panel for the
// given node.
function colorDocs(nodeId) {
    var group = networkNodes.get(nodeId).group;

    //nodeTitle().classList.add(group);
    //actionsBar().classList.add(group);
    nodeTitle().className = group;
    actionsBar().className = group;
}