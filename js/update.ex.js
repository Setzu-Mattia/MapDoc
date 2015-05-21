var nodes, edges, network;

    // convenience method to stringify a JSON object
    function toJSON (obj) {
      return JSON.stringify(obj, null, 4);
    }

    $(window).load(function () {
      // attach actions to the node buttons
      $('#node-add').click(function () {
        try {
          nodes.add({
            id: $('#node-id').val(),
            label: $('#node-label').val()
          });
        }
        catch (err) {
          alert(err);
        }
      });
      $('#node-update').click(function () {
        try {
          nodes.update({
            id: $('#node-id').val(),
            label: $('#node-label').val()
          });
        }
        catch (err) {
          alert(err);
        }
      });
      $('#node-remove').click(function () {
        try {
          var id = $('#node-id').val();
          nodes.remove(id);
        }
        catch (err) {
          alert(err);
        }
      });

      // attach actions to the edge buttons
      $('#edge-add').click(function () {
        try {
          edges.add({
            id: $('#edge-id').val(),
            from: $('#edge-from').val(),
            to: $('#edge-to').val()
          });
        }
        catch (err) {
          alert(err);
        }
      });
      $('#edge-update').click(function () {
        try {
          edges.update({
            id: $('#edge-id').val(),
            from: $('#edge-from').val(),
            to: $('#edge-to').val()
          });
        }
        catch (err) {
          alert(err);
        }
      });
      $('#edge-remove').click(function () {
        try {
          var id = $('#edge-id').val();
          edges.remove(id);
        }
        catch (err) {
          alert(err);
        }
      });

      // create an array with nodes
      nodes = new vis.DataSet();
      nodes.subscribe('*', function () {
        $('#nodes').html(toJSON(nodes.get()));
      });
      nodes.add([
        {id: '1', label: 'Node 1'},
        {id: '2', label: 'Node 2'},
        {id: '3', label: 'Node 3'},
        {id: '4', label: 'Node 4'},
        {id: '5', label: 'Node 5'}
      ]);

      // create an array with edges
      edges = new vis.DataSet();
      edges.subscribe('*', function () {
        $('#edges').html(toJSON(edges.get()));
      });
      edges.add([
        {id: '1', from: '1', to: '2'},
        {id: '2', from: '1', to: '3'},
        {id: '3', from: '2', to: '4'},
        {id: '4', from: '2', to: '5'}
      ]);

      // create a network
      var container = $('#network').get(0);
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {};
      network = new vis.Network(container, data, options);
    });