2// Click
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
                    removeNodeFromTitle();
                    return;
                }
    
                // Show html
                show(controllers());
                show(documentation());
                show(nodeTitle());
                show(nodeType());
                show(nodeComment());
                show(actionsBar());
                showBarFor(properties.nodes[0]);
                floatTo(container, -1);
                floatTo(controllers, +1);
    
                // Show docs
                showDocsForNode(parseInt(properties.nodes[0]));
                addNodeToTitle(parseInt(properties.nodes[0]));
            });


// Hide everything and show editor
function showEditor() {
    $("body").css("overflow", "hidden");
    $("#shadow").show();
}


// Change given dom element to textarea
function switchToTextarea(id) {
    var domElement = $('#' + id).parent();
    var editorHTML = domElement.html();
    
    if (editorHTML.search(/div/g) === -1)
        return;
    
    editorHTML = editorHTML.replace(/div/g, "textarea");
    editorHTML = editorHTML.replace(/>/g, " onchange='updateSaveButton()'>");
    
    domElement.html(editorHTML);
}


// Update the save button
function updateSaveButton() {
    var button = $("#save button");
    
    button.removeClass("active");
    button.addClass("not_active");
}

// Hide docs panel on click
function hideDocs() {
    // Animations
    $(controllers()).hide("drop");
    $(actionsBar()).hide("drop");
    
    // Actual hide
    $(controllers()).addClass("hidden");
    $(actionsBar()).addClass("hidden");
    $(container()).removeClass("left");
    
    // Center network
    network.moveTo(
            {position: network.getCenterCoordinates()});
}

// Show
function show(element) {
    $(element).show("puff");
    $(element).removeClass("hidden");    
}


// Show action bar accordingly
// to the node's group.
function showBarFor(nodeId) {
    var group = networkNodes.get(nodeId).group;
    console.log("group: " + group + " type: " + typeof group);
    if (group === "interface") {
        console.log("in interface");
        $(".implements").show();
        $(".extends").show();
        $(".annotate").show();
    }
    if (group === "type") {
        console.log("in type");
        $(".implements").hide();
        $(".extends").show();
        $(".annotate").show();
    }
    if (group === "annotation") {
        console.log("in annotation");
        $(".implements").hide();
        $(".extends").hide();
        $(".annotate").hide();
    }
    
    $(".edit").show();
}


// Make the given element float to the
// given direction
function floatTo(element, direction) {
    if (direction === -1) {
        $(element()).addClass("left");
    } else {
        $(element()).addClass("right");
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
    
    $(nodeTitle()).html(node.label);
    $(nodeType()).html(node.group);
    $(nodeComment()).html(docMap.get(nodeId));
    
    colorDocs(nodeId);
}

// Edit title, add current node name
function addNodeToTitle(nodeId) {
    var node = networkNodes.get(nodeId);
    
    $(title()).html("Title " + node.label);
}


// Reset title
function removeNodeFromTitle() {
    $(title()).html("Title");
}


// Color docs panel for the
// given node.
function colorDocs(nodeId) {
    var group = networkNodes.get(nodeId).group;

    nodeTitle().className = group;
    actionsBar().className = group;
}