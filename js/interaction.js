// Click
network.on("doubleClick",
            function(properties) {
                zoom(properties, +1);
            });
// View documentation on hover
network.on("hoverNode",
            function(node) {
                // Show html
                toggleVisibility(controllers);
                toggleVisibility(nodeTitle);
                toggleVisibility(nodeType);
                toggleVisibility(nodeComment);
                floatTo(container, -1);
                floatTo(controllers, +1);
    
                // Show docs
                showDocsForNode(node);
                addNodeToTitle(node);
            });
// Hide documentation on leave
/*
network.on("blurNode",
            function(node) {
                // Hide html
                toggleVisibility(controllers);
                toggleVisibility(nodeTitle);
                toggleVisibility(nodeType);
                toggleVisibility(nodeComment);
            });
*/

// Toggle visibility for the given element.
function toggleVisibility(element) {
    x = element;
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

// Add sibiling to node.
function addSibiling(node) {
    var sibilingNodeId = nodes.length;
    var newEdge = {from: node, to: sibilingNodeId};
    
    nodes.add({
        id: sibilingNodeId,
        label: sibilingNodeId.toString()
    });
    edges.add({
        from: sibilingNodeId -1,
        to: sibilingNodeId
    });
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
function showDocsForNode (properties) {
    console.log(properties.node);
    var node = nodes.get(properties.node);
    /*
    var title = document.getElementById("node_title");
    var type = document.getElementById("node_type");
    var comment = document.getElementById("node_comment");
    */
    
    console.log("lb: " + node.label);
    console.log("grp: " + node.group);
    console.log("id: " + node.id);
    
    nodeTitle().innerHTML = node.label;
    nodeType().innerHTML = node.group;
    nodeComment().innerHTML = docMap.get(node.id);
}

// Edit title, add current node name
function addNodeToTitle(properties) {
    var node = properties.node;
    
    title.innerHTML += node.label;
}