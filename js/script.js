// Set-up
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var container = document.getElementById("container");
var data = {nodes: nodes,
           edges: edges};
var network = new vis.Network(container, data, {});

nodes.add([{id: 0, label: "Node 0"},
             {id: 1, label: "Node 1"},
             {id: 2, label: "Node 2"},
             {id: 3, label: "Node 3"}]);
edges.add([{from: 0, to: 1},
         {from: 2, to: 1}]);


// Click
network.on("select",
           function(properties) {
                addSibiling(properties.nodes);
                /*
                nodes.add({
                    id: 10,
                    label: "10"
                });
                */
            });

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
    
    network.redraw();
}