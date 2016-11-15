// this is for the cyclic group

n = 15;
var cyclicnodes = [];
for (var i = 0;i<n;i+=1){
  cyclicnodes.push({x: Math.sin(i/n*2*Math.PI) * width/3, y: Math.cos(i/n*2*Math.PI) * width/3, name:"r"+i}); 
};
var cycliclinks = []
for (var i = 0;i<n;i+=1){
  cycliclinks.push({source:cyclicnodes[i%n], target:cyclicnodes[(i+1)%n], left: false, right: true})
};

// this combines the nodes and links
var cyclicgraph = {'nodes':cyclicnodes, 'links':cycliclinks};

// this builds the canvas
var svg = d3.select('#cyclic').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr("style", "outline: thin solid black;");

// build the directed arrow.
// define arrow markers for graph links
svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 2)
    .attr('markerHeight', 2)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#FFA500');

svg.append('svg:defs').append('svg:marker')
    .attr('id', 'start-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 2)
    .attr('markerHeight', 2)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr('d', 'M10,-5L0,0L10,5')
    // .attr('d', 'M5,-5L5,0L10,5')
    .attr('fill', '#FFA500');


var cyclicsimulation = d3.forceSimulation()
    .force("link", d3.forceLink().distance(50))
    .force("charge", d3.forceManyBody().distanceMin(width/5))
    .force("center", d3.forceCenter(width / 2, height / 2));


var cycliclink = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(cyclicgraph.links)
    .enter().append("line")
    .attr("marker-end", function(d) { return d.right ? "url(#end-arrow)" : '';})
    .attr("marker-start", function(d) { return d.left ? "url(#start-arrow)" : '';});

var cyclicnode = svg.selectAll("nodes")
  .data(cyclicgraph.nodes)
  .enter().append("g")
  .attr("class", "nodes")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))

cyclicnode.append("circle")
  .attr("r", radius)
  .attr("class", "node");
cyclicnode.append("text")
  .attr("dx", 8)
  .attr("dy", ".35em")
  .text(function(d) { return d.name });


cyclicsimulation
    .nodes(cyclicgraph.nodes)
    .on("tick", ticked);

cyclicsimulation.force("link")
    .links(cyclicgraph.links);

function ticked() {
  // this makes the arrows and the link distances look better
  cycliclink
      .attr("x1", function(d) { 
        deltaX = d.target.x - d.source.x,
          deltaY = d.target.y - d.source.y,
          dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
          normX = deltaX / dist,
          normY = deltaY / dist,
          sourcePadding = d.left ? 17 : 12,
          targetPadding = d.right ? 17 : 12,
          sourceX = d.source.x + (sourcePadding * normX),
          sourceY = d.source.y + (sourcePadding * normY),
          targetX = d.target.x - (targetPadding * normX),
          targetY = d.target.y - (targetPadding * normY);
          return sourceX;
      })
      .attr("y1", function(d) { 
        deltaX = d.target.x - d.source.x,
          deltaY = d.target.y - d.source.y,
          dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
          normX = deltaX / dist,
          normY = deltaY / dist,
          sourcePadding = d.left ? 17 : 12,
          targetPadding = d.right ? 17 : 12,
          sourceX = d.source.x + (sourcePadding * normX),
          sourceY = d.source.y + (sourcePadding * normY),
          targetX = d.target.x - (targetPadding * normX),
          targetY = d.target.y - (targetPadding * normY);
          return sourceY;
      })
      .attr("x2", function(d) { 
        deltaX = d.target.x - d.source.x,
          deltaY = d.target.y - d.source.y,
          dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
          normX = deltaX / dist,
          normY = deltaY / dist,
          sourcePadding = d.left ? 17 : 12,
          targetPadding = d.right ? 17 : 12,
          sourceX = d.source.x + (sourcePadding * normX),
          sourceY = d.source.y + (sourcePadding * normY),
          targetX = d.target.x - (targetPadding * normX),
          targetY = d.target.y - (targetPadding * normY);
          return targetX;
      })

      .attr("y2", function(d) { 
        deltaX = d.target.x - d.source.x,
          deltaY = d.target.y - d.source.y,
          dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
          normX = deltaX / dist,
          normY = deltaY / dist,
          sourcePadding = d.left ? 17 : 12,
          targetPadding = d.right ? 17 : 12,
          sourceX = d.source.x + (sourcePadding * normX),
          sourceY = d.source.y + (sourcePadding * normY),
          targetX = d.target.x - (targetPadding * normX),
          targetY = d.target.y - (targetPadding * normY);
          return targetY;
      });
  //this transformation does not let the nodes go outside map 
  cyclicnode
      .attr("transform", function(d) { return "translate(" + (d.x = Math.max(radius, Math.min(width - radius, d.x))) + "," + (d.y = Math.max(radius, Math.min(height - radius, d.y))) + ")"; });
}


function dragstarted(d) {
  if (!d3.event.active) cyclicsimulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) cyclicsimulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

