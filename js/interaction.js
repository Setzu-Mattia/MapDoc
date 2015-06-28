var saveButtonTarget;

// Click
network.on("doubleClick",
    function(properties) {
        zoom(properties, +1);
    });

// View documentation on hover
network.on("select",
    function(properties) {
        onSelect(properties.nodes);
    });

function onSelect(nodes) {

    // Check for click on empty
    if (typeof nodes == 'undefined'|| nodes.length === 0) {
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
    showBarFor(nodes[0]);
    floatTo(container, -1);
    floatTo(controllers, +1);

    // Put id
    $("#node_id").html(nodes[0]);

    // Show docs
    showDocsForNode(parseInt(nodes[0]));
    addNodeToTitle(parseInt(nodes[0]));
};

// Hide everything and show editor
function showEditor() {
    var nodeId = parseInt($("#node_id").html());
    var group = networkNodes.get(nodeId).group;
    
    $("body").css("overflow", "hidden");
    
    $("#category").removeClass();
    $("#category").addClass(group);
    $("#editor #name").val(namesTable.get(nodeId).label);
    $("#editor #comment").val(docMap.get(nodeId));
    $("#shadow").show();
    
    saveButtonTarget = "edit";
}

// Show form to add an "implements" link
function showImplementClass() {
    switchToTextarea('name');
    switchToTextarea('comment');
    showEditor();
    saveButtonTarget = "implements";
}

// Show form to add an "extends" link
function showExtendClass() {
    switchToTextarea('name');
    switchToTextarea('comment');
    showEditor();
    saveButtonTarget = "extends";
}

// Show form to add an "implements" link
function showAnnotate() {
    switchToTextarea('name');
    switchToTextarea('comment');
    showEditor();
    $("#category").removeClass();
    $("#category").addClass("annotation");
    saveButtonTarget = "annotate";
}

function hideEditor() {
    $("body").css("overflow", "auto");
    $("#shadow").hide();
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
    
    if (group === "interface") {
        $(".implements").show();
        $(".extends").show();
        $(".annotate").show();
    }
    if (group === "type") {
        $(".implements").hide();
        $(".extends").show();
        $(".annotate").show();
    }
    if (group === "annotation") {
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
    
    $(nodeTitle()).html(namesTable.get(parseInt(nodeId)));
    $(nodeType()).html(node.group);
    $(nodeComment()).html(docMap.get(nodeId));
    
    colorDocs(nodeId);
}

// Edit title, add current node name
function addNodeToTitle(nodeId) {    
    $(title()).html(namesTable.get(parseInt(nodeId)));
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

// Remove node
function removeNode(nodeId) {
    networkNodes.remove(nodeId);
}

// Update node values
function updateNode() {
    var nodeId = networkNodes.length;
    
    switchToTextarea('name');
    switchToTextarea('comment');
    
    switch (saveButtonTarget) {
        case "edit":
            editNode();
        break;
        case "implements":
            implementNode(nodeId);
        break;
        case "extends":
            extendNode(nodeId);
        break;
        case "annotate":
            annotate(nodeId);
        break;
    }
    
    hideEditor();
    onSelect([nodeId]);
}

function editNode() {
    node.label = $("#name").val();
    
    docMap.delete(nodeId);
    docMap.set(nodeId, $("#comment").val());
}

// Add a new node. Return the node id.
function addTypeNode(nodeId) {
    var node;
    var implementsEdge;
    var nodeLabel = $("#name").val();
    var nodeGroup = "type";

    node = {
        id: nodeId,
        label: nodeLabel,
        group: nodeGroup
    };
    networkNodes.add(node);
}

function implementNode(nodeId) {
    var implementsEdge;

    addTypeNode(nodeId);
    implementsEdge = {
        id: String($("#node_id").html()) + "-" + String(nodeId),
        from: parseInt($("#node_id").html()),
        to: parseInt(nodeId)
    };

    docMap.set(nodeId, $("#comment").val());
    networkEdges.add(implementsEdge);
    namesTable.set(nodeId,
        $("#name").val());
}

function extendNode(nodeId) {
    var node;
    var extendsEdge;
    var nodeLabel = $("#name").val();
    var nodeGroup = networkNodes.get($("#node_id").html()).group;

    node = {
        id: nodeId,
        label: nodeLabel,
        group: nodeGroup
    };
    extendsEdge = {
        id: String($("#node_id").html()) + "-" + String(nodeId),
        from: $("#node_id").html(),
        to: nodeId
    };

    networkNodes.add(node);
    networkEdges.add(extendsEdge);
    namesTable.set(nodeId,
                $("#name").val());
    docMap.set(nodeId, $("#comment").val());
}

function annotate(nodeId) {
    var node;
    var annotatesEdge;
    var nodeLabel = $("#name").val();
    var nodeGroup = "annotation";

    node = {
        id: nodeId,
        label: nodeLabel,
        group: nodeGroup
    };   
    annotatesEdge = {
        id: String($("#node_id").html()) + "-" + String(nodeId),
        from:$("#node_id").html(),
        to: nodeId
    };

    networkNodes.add(node);
    networkEdges.add(annotatesEdge);
    namesTable.set(nodeId,
                    $("#name").val());
    docMap.set(nodeId, $("#comment").val());
}