const letters = ['F','G','H'];
const romans = ['I.','II.','III.','IV.','V.'];
var pnum;
var inum;

document.getElementsByTagName("title")[0].innerHTML = "Venn diagram";

function putPC(text,ln){
	var atable = document.getElementById("atable");
	ln = ln - 1
	var row = atable.getElementsByTagName("tr")[ln];
	var cell = row.getElementsByTagName("td")[1];
	cell.getElementsByTagName("input")[0].value = text;
}

function anChange(){
		
		var aset = document.getElementById("anum");
		var pset = document.getElementById("pnum");
		var anum = aset.options[aset.selectedIndex].value;
		pnum = pset.options[pset.selectedIndex].value;
		inum = Number(pnum) + 1;
		
		
		//Set atomic input
		
		var alist = document.getElementById("alist");
		alist.innerHTML = "";
		for (i = 0; i < anum; i++) {
				var item = document.createElement("li");
				alist.appendChild(item);
				item.innerHTML = "<span class='letter'>" + letters[i] + ": </span>";
				var p = document.createElement("input");
				p.setAttribute("type","text");
				item.appendChild(p);
		}
		
		//Set premise & conc.
		
		var plist = document.getElementById("plist");
		plist.innerHTML = "";
		//var pcheck = document.getElementById("pcheck");
		//pcheck.innerHTML = "";

		for (let i = 1; i <= pnum; i++) {
				var item = document.createElement("li");
				plist.appendChild(item);
				var p = document.createElement("input");
				p.setAttribute("type","text");
				p.setAttribute("id","ip" + i );
				item.appendChild(p);
				/*var p = document.createElement("input");
				p.setAttribute("type","checkbox");
				p.setAttribute("id","cp" + i );
				pcheck.appendChild(p);
				var l = document.createElement("label");
				l.setAttribute("for","cp" + i );
				pcheck.appendChild(l);
				l.innerHTML = romans[i-1] + " ";*/
		}
		var conc = document.getElementById("conc");

}

function markTarget(t,target,color){
	var current = document.getElementById("s" + target).status;
	if (t.checked){
		if (current != undefined && current != color){
			alert ("A tartományra már ellentétes érték van beállítva");
			t.checked = false;
		} else {
			document.getElementById("s" + target).status = color;
			d3.select("#s" + target)
			.attr("fill", color)
		}
	} else {
		document.getElementById("s" + target).status = undefined;
		d3.select("#s" + target)
		.attr("fill", "#6699cc")
	}
		
}

function forceTarget(target,color){
	d3.select("#s" + target).attr("fill", color);
}

const svg = d3.select("svg")

const margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
}
const width = +svg.attr("width") - margin.left - margin.right
const height = +svg.attr("height") - margin.top - margin.bottom


// piece of paper
const g = svg.append("g")
  .attr("transform",
    "translate(" +
    margin.left + "," +
    margin.top + ")");

//specs for Circle 1
const xCenter1 = 150
const yCenter1 = 150
const circleRad = 100

//draw Circle 1
const circle1 = g.append("circle")
  .attr("r", circleRad)
  .attr('transform',
    "translate(" +
    xCenter1 + "," +
    yCenter1 + ")");

//add'l specs for Circle 2
const offsetFactor = 1.2
const offset = offsetFactor * circleRad
const xCenter2 = xCenter1 + offset
const yCenter2 = yCenter1 //creating new var for clarity

//draw Circle 2
const circle2 = g.append("circle")
  .attr("r", circleRad)
  .attr('transform',
    "translate(" +
    xCenter2 + "," +
    yCenter2 + ")");

//add'l specs for Circle 3
const xCenter3 = xCenter1 + offset / 2
const yCenter3 = yCenter1 + Math.sqrt(3) * offset / 2

//draw Circle 3
const circle3 = g.append("circle")
  .attr("r", circleRad)
  .attr('transform',
    "translate(" +
    xCenter3 + "," +
    yCenter3 + ")");

//compute first points of intersection
const triHeight = Math.sqrt(circleRad ** 2  -  (offset / 2) ** 2)
//outer intersection of Circles 1 and 2
const xIsect1 = xCenter3
const yIsect1 = yCenter1 - triHeight
//inner intersection of Circles 1 and 2
const xIsect4 = xCenter3
const yIsect4 = yCenter1 + triHeight

//treat "triHeight" as the hypoteneuse of a 30.60.90 triangle.
//this tells us the shift from the midpoint of a leg of the triangle
//to the point of intersection
const xDelta = triHeight * Math.sqrt(3) / 2
const yDelta = triHeight / 2

const xMidpointC1C3 = (xCenter1 + xCenter3) / 2
const xMidpointC2C3 = (xCenter2 + xCenter3) / 2
const yMidpointBoth = (yCenter1 + yCenter3) / 2

//find the rest of the points of intersection
const xIsect2 = xMidpointC1C3 - xDelta
const yIsect2 = yMidpointBoth + yDelta
const xIsect3 = xMidpointC2C3 + xDelta
const yIsect3 = yMidpointBoth + yDelta

const xIsect5 = xMidpointC1C3 + xDelta
const yIsect5 = yMidpointBoth - yDelta
const xIsect6 = xMidpointC2C3 - xDelta
const yIsect6 = yMidpointBoth - yDelta

xPoints = [xIsect1, xIsect2, xIsect3, xIsect4, xIsect5, xIsect6]
yPoints = [yIsect1, yIsect2, yIsect3, yIsect4, yIsect5, yIsect6]

const makeIronShapes = ([x1, x2, x3, y1, y2, y3]) => {
  path = `M ${x1} ${y1}
             A ${circleRad} ${circleRad} 0 0 1 ${x2} ${y2}
             A ${circleRad} ${circleRad} 0 0 0 ${x3} ${y3}
             A ${circleRad} ${circleRad} 0 0 1 ${x1} ${y1}`
  return path
}


const makeSunShapes = ([x1, x2, x3, y1, y2, y3]) => {
  path = `M ${x1} ${y1}
             A ${circleRad} ${circleRad} 0 0 0 ${x2} ${y2}
             A ${circleRad} ${circleRad} 0 0 0 ${x3} ${y3}
             A ${circleRad} ${circleRad} 0 1 1 ${x1} ${y1}`
  return path
}


const makeRoundedTri = ([x1, x2, x3, y1, y2, y3]) => {
  path = `M ${x1} ${y1}
             A ${circleRad} ${circleRad} 0 0 1 ${x2} ${y2}
             A ${circleRad} ${circleRad} 0 0 1 ${x3} ${y3}
             A ${circleRad} ${circleRad} 0 0 1 ${x1} ${y1}`
  return path
}


ironPoints = [
  [1, 5, 6],
  [3, 4, 5],
  [2, 6, 4]
]
sunPoints = [
  [3, 5, 1],
  [2, 4, 3],
  [1, 6, 2]
]
roundedTriPoints = [
  [5, 4, 6]
]

id=1;



for (const points of sunPoints) {
  const ptCycle = points.map(i => xPoints[i - 1]).concat(
    points.map(i => yPoints[i - 1])
  )
  const shape = makeSunShapes(ptCycle)

  g.append("path")
    .attr("d", shape)
    .attr("id","s" + id)
    .attr("class", "segment")
    .attr("fill", "#6699cc")
    .attr("opacity", 0.4)
    
  id++
}

for (const points of ironPoints) {
  const ptCycle = points.map(i => xPoints[i - 1]).concat(
    points.map(i => yPoints[i - 1])
  )
  const shape = makeIronShapes(ptCycle)

  g.append("path")
    .attr("d", shape)
    .attr("id","s" + id)
    .attr("class", "segment")
    .attr("fill", "#6699cc")
    .attr("opacity", 0.4)
   
  id++
}

for (const points of roundedTriPoints) {
  const ptCycle = points.map(i => xPoints[i - 1]).concat(
    points.map(i => yPoints[i - 1])
  )
  const shape = makeRoundedTri(ptCycle)

  g.append("path")
    .attr("d", shape)
    .attr("id","s" + id)
    .attr("class", "segment")
    .attr("fill", "#6699cc")
    .attr("opacity", 0.4)
}


g.selectAll("path.segment")
    .on("mouseover", function () {
        d3.select(this)
        	.transition()
        	//.attr("opacity", 0.4)
          .duration(500)
    })
    .on("mouseout", function () {
        d3.select(this)
        	.transition()
        	//.attr("opacity", 0.4)
          .duration(500)
    })

g.append("text")
  .text("F")
  .style("font-weight","bold")
  .attr("x", xIsect1 - 180)
  .attr("y", yIsect1 + 70)
  
g.append("text")
  .text("G")
  .style("font-weight","bold")
  .attr("x", xIsect3 + 70)
  .attr("y", yIsect3 - 100)

g.append("text")
  .text("H")
  .style("font-weight","bold")
  .attr("x", xIsect4 - 5)
  .attr("y", yIsect4 + 150)

g.append("text")
  .text("3")
  .attr("x", xIsect1 - 90)
  .attr("y", yIsect1 + 70)

g.append("text")
  .text("6")
  .attr("x", xIsect2 + 40)
  .attr("y", yIsect2 - 20)

g.append("text")
  .text("1")
  .attr("x", xIsect3)
  .attr("y", yIsect3 - 100)

g.append("text")
  .text("7")
  .attr("x", xIsect4 - 5)
  .attr("y", yIsect4 - 35)

g.append("text")
  .text("5")
  .attr("x", xIsect5 + 10)
  .attr("y", yIsect5 + 60)

g.append("text")
  .text("4")
  .attr("x", xIsect6 + 35)
  .attr("y", yIsect6 - 40)
  
g.append("text")
  .text("2")
  .attr("x", xIsect4 - 5)
  .attr("y", yIsect4 + 60)

