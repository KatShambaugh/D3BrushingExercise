var width = 500;
var height = 500;

d3.csv("starbucksfoods.csv", function (csv) {
  for (var i = 0; i < csv.length; ++i) {
    csv[i].Fat = Number(csv[i].Fat);
    csv[i].Carb = Number(csv[i].Carb);
    csv[i].Fiber = Number(csv[i].Fiber);
    csv[i].Protein = Number(csv[i].Protein);
  }

  // COMPLETE THESE FUNCTIONS TO SEE THE SCATTERPLOTS +++++++++++++++
  var fatSum = 0;
  var fatExtent = d3.extent(csv, function (row) {
  	return fatSum + row.Fat;
  });
  var carbSum = 0;
  var carbExtent = d3.extent(csv, function (row) {
	  return carbSum + row.Carb;
  });
  var fiberSum = 0;
  var fiberExtent = d3.extent(csv, function (row) {
	  return fiberSum + row.Fiber;
  });
  var proteinSum = 0;
  var proteinExtent = d3.extent(csv, function (row) {
	  return proteinSum + row.Protein;
  });
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Axis setup
  var xScale = d3.scaleLinear().domain(fatExtent).range([50, 470]);
  var yScale = d3.scaleLinear().domain(carbExtent).range([470, 30]);

  var xScale2 = d3.scaleLinear().domain(fiberExtent).range([50, 470]);
  var yScale2 = d3.scaleLinear().domain(proteinExtent).range([470, 30]);

  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);

  var xAxis2 = d3.axisBottom().scale(xScale2);
  var yAxis2 = d3.axisLeft().scale(yScale2);

  //Create SVGs for charts
  var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("width", width)
    .attr("height", height);

  var chart2 = d3
    .select("#chart2")
    .append("svg:svg")
    .attr("width", width)
    .attr("height", height);

  /*************** Brushing here ***************************/
  var brushedOne = function () {
  	if (document.getElementById('brushTwo').style.display = "block") {
  		document.getElementById('brushTwo').children[1].style.display = 
  			'none';
	}
	document.getElementById('brushOne').style.display = 'block';
	document.getElementById("Fat").innerHTML = "";
   	document.getElementById("Carb").innerHTML = "";
    document.getElementById("Fiber").innerHTML = "";
    document.getElementById("Protein").innerHTML = "";

    const { selection } = d3.event;
    var circlesOne = chart1
      .selectAll("circle");
    var otherCircles = document.getElementsByClassName("cir_2");
    var highlighted = false;
    for (var i = 0; i < circlesOne._groups[0].length; i++) {
      if ((circlesOne._groups[0][i].getAttribute("cx") >= selection[0][0]) && (circlesOne._groups[0][i].getAttribute("cx") <= selection[1][0])) {
        if ((circlesOne._groups[0][i].getAttribute("cy") >= selection[0][1]) && (circlesOne._groups[0][i].getAttribute("cy") <= selection[1][1])) {
          circlesOne._groups[0][i].setAttribute("fill", "green");
          highlighted = true;
        } else {
          circlesOne._groups[0][i].setAttribute("fill", "black");
          highlighted = false;
        }
      } else {
      	circlesOne._groups[0][i].setAttribute("fill", "black");
        highlighted = false;
      }
      for (let each of otherCircles) {
        if (each.getAttribute("id") == circlesOne._groups[0][i].getAttribute("id")) {
          if (highlighted == true) {
            each.setAttribute("fill", "green");
          } else {
            each.setAttribute("fill", "black");
          }
        }
      }
    }
  }

  var brushedTwo = function () {
  	if (document.getElementById('brushOne').style.display = "block") {
  		document.getElementById('brushOne').children[1].style.display = 
  			'none';
	}
	document.getElementById('brushTwo').style.display = 'block';
	document.getElementById("Fat").innerHTML = "";
   	document.getElementById("Carb").innerHTML = "";
    document.getElementById("Fiber").innerHTML = "";
    document.getElementById("Protein").innerHTML = "";	
	
    const { selection } = d3.event;
    var circles = document.getElementsByClassName("cir_2");
    var otherCircles = chart1.selectAll("circle");
    var highlighted = false;
    for (var i = 0; i < circles.length; i++) {
      if ((circles[i].getAttribute("cx") >= selection[0][0]) && (circles[i].getAttribute("cx") <= selection[1][0])) {
        if ((circles[i].getAttribute("cy") >= selection[0][1]) && (circles[i].getAttribute("cy") <= selection[1][1])) {
          circles[i].setAttribute("fill", "yellow");
          highlighted = true;
        } else {
          circles[i].setAttribute("fill", "black");
          highlighted = false;
        }
      } else {
      	circles[i].setAttribute("fill", "black");
        highlighted = false;
      }
      for (let each of otherCircles._groups[0]) {
        if (each.getAttribute("id") == circles[i].getAttribute("id")) {
          if (highlighted == true) {
            each.setAttribute("fill", "yellow");
          } else {
            each.setAttribute("fill", "black");
          }
        }
      }
    }
  }
  
  const brushOne = d3.brush()
      .extent([[50, 20], [475, 475]])
      .on("brush", brushedOne);

  const brushTwo = d3.brush()
      .extent([[50, 20], [475, 475]])
      .on("brush", brushedTwo);
  
  const chartOneBrush = d3
      .select("#chart1")
      .select("svg")
      .append('g')
      .attr('class', 'brush')
      .attr('id', 'brushOne')
      .call(brushOne);

  const chartTwoBrush = d3
      .select("#chart2")
      .select("svg")
      .append('g')
      .attr('class', 'brush')
      .attr('id', 'brushTwo')
      .call(brushTwo);

	/******************************************/

  //add scatterplot points
  var circles1 = chart1
    .selectAll("circle")
    .data(csv)
    .enter()
    .append("circle")
    .attr("id", function (d, i) {
      return i;
    })
    .attr("stroke", "black")
    .attr("cx", function (d) {
      return xScale(d.Fat);
    })
    .attr("cy", function (d) {
      return yScale(d.Carb);
    })
    .attr("r", 5)
    .on("click", function (d, i) {
    	var thisCircles = chart1.selectAll("circle");
    	for (let each of thisCircles._groups[0]) {
    		if (each.getAttribute('id') == i) {
    			each.setAttribute("fill", "pink");
    		} else {
    			each.setAttribute("fill", "black");
    		}
    	}
    	var otherCircles = document.getElementsByClassName("cir_2");
    	for (let each of otherCircles) {
    		if (each.getAttribute("id") == i) {
    			each.setAttribute("fill", "pink");
    		} else {
    			each.setAttribute("fill", "black");
    		}
    	}
    	document.getElementById("Fat").innerHTML = d.Fat;
    	document.getElementById("Carb").innerHTML = d.Carb;
    	document.getElementById("Fiber").innerHTML = d.Fiber;
    	document.getElementById("Protein").innerHTML = d.Protein;
    	if (document.getElementById('brushOne').style.display = "block") {
  		document.getElementById('brushOne').children[1].style.display = 
  			'none';
  		}
  		if (document.getElementById('brushTwo').style.display = "block") {
  		document.getElementById('brushTwo').children[1].style.display = 
  			'none';
  		}
    })
    .on("focusout", function () {
    	document.getElementById("Fat").innerHTML = "";
    	document.getElementById("Carb").innerHTML = "";
    	document.getElementById("Fiber").innerHTML = "";
    	document.getElementById("Protein").innerHTML = "";
    });

  var circles2 = chart2
    .selectAll("circle")
    .data(csv)
    .enter()
    .append("circle")
    .attr("id", function (d, i) {
      return i;
    })
    .attr("class", "cir_2")
    .attr("stroke", "black")
    .attr("cx", function (d) {
      return xScale2(d.Fiber);
    })
    .attr("cy", function (d) {
      return yScale2(d.Protein);
    })
    .attr("r", 5)
    .on("click", function (d, i) {
    	var thisCircles = chart1.selectAll("circle");
    	for (let each of thisCircles._groups[0]) {
    		if (each.getAttribute('id') == i) {
    			each.setAttribute("fill", "pink");
    		} else {
    			each.setAttribute("fill", "black");
    		}
    	}
    	var otherCircles = document.getElementsByClassName("cir_2");
    	for (let each of otherCircles) {
    		if (each.getAttribute("id") == i) {
    			each.setAttribute("fill", "pink");
    		} else {
    			each.setAttribute("fill", "black");
    		}
    	}
    	document.getElementById("Fat").innerHTML = d.Fat;
    	document.getElementById("Carb").innerHTML = d.Carb;
    	document.getElementById("Fiber").innerHTML = d.Fiber;
    	document.getElementById("Protein").innerHTML = d.Protein;
    	if (document.getElementById('brushOne').style.display = "block") {
  		document.getElementById('brushOne').children[1].style.display = 
  			'none';
  		}
  		if (document.getElementById('brushTwo').style.display = "block") {
  		document.getElementById('brushTwo').children[1].style.display = 
  			'none';
  		}
    });

  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis) // call the axis generator
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end");

  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  chart2 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis2)
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end");

  chart2 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis2)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");
});
