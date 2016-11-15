var width = 1000, height = 1000;

// prime factorization algorithm iterative
var factors = [], num = 10254;
var tree = {};
// for (var i = 2; i <= num; i+=1) {
//     tree.name = num.toString();
//     while ((num % i) === 0) {
//         var child = {};
//         factors.push(i);
//         num /= i;
//     }
// }
tree.name=num.toString();
var child1 = [], child2 = [];
for (var i = 2; i <= num; i+= 1){
  if (num%i == 0) {
    child1.push({"name":i.toString()})
    child2.push({"name":i.toString()})
  }
  num /= i;
}
tree.children = child
console.log(tree)
// console.log(factors)
// 2*2*2*(3*3)*(3*5)
var treedata = 
  {
    "name": "1080",
    "children": [
      {
        "name": "2"
      },
      {
        "name": "9",
        "children": [
          {
            "name": "3"
          },
          {
            "name": "3"
          }
        ]
      },
      {
        "name": "2"
      },
      {
        "name": "15",
        "children": [
          {
            "name": "3"
          },
          {
            "name": "5"
          }
        ]
      },
      {
        "name": "2"
      }
    ]
  };



// this builds the canvas
var svg = d3.select('#graph').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr("style", "outline: thin solid black;");
var g = svg.append("g")
    .attr("transform", "translate(40,0)");


var data = d3.hierarchy(treedata);
// console.log(data)
// console.log(data.data)
// console.log(data.name)

var tree = d3.tree()
  .size([width,height-width/10]);
tree(data);

var link = g.selectAll(".link")
    .data(data.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.y + d.parent.y) / 2 + "," + d.x
            + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
      });

  var node = g.selectAll(".node")
      .data(data.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("circle")
      .attr("r", 2.5);

  node.append("text")
      .attr("dy", 3)
      .attr("x", function(d) { d=d.data;return d.children ? -8 : 8; })
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { d=d.data; return d.name.substring(d.name.lastIndexOf(".") + 1); });

// svg.append(tree)
// console.log(tree)
    // .size([width, height])
    // .padding(10);

// var nodes = treemap(root
//     .sum(function(d) { return d.value; })
//     .sort(function(a, b) { return b.height - a.height || b.value - a.value; }))
//   .descendants();






