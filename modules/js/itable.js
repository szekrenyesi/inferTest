const letters = ['A','B','C','D'];
const romans = ['I.','II.','III.','IV.','V.'];

document.getElementsByTagName("title")[0].innerHTML = "Igazságtáblázat";

function putPC(text,id){
		document.getElementById(id).innerHTML = text;
}

function insertSymb(id,symb){
		document.getElementById(id).value = document.getElementById(id).value + symb;
}

function interpret(n) {
	if(n==0) {return [[]];}
	var prev = interpret(n-1);
	var mt = function(x) {return [true].concat(x);};
	var mf = function(x) {return [false].concat(x);};
	return prev.map(mt).concat(prev.map(mf));
}

function anChange(){
	
	var aset = document.getElementById("anum");
	var pset = document.getElementById("pnum");
	var anum = aset.options[aset.selectedIndex].value;
	var pnum = pset.options[pset.selectedIndex].value;
	var lnum = Math.pow(2,anum);
	var inum = Number(pnum) + 1;
	
	
	//Set atomic input
	
	var alist = document.getElementById("alist");
	alist.innerHTML = "";
	for (i = 0; i < anum; i++) {
			var item = document.createElement("li");
			alist.appendChild(item);
			item.innerHTML = letters[i] + ":\t\t\t";
			var p = document.createElement("input");
			p.setAttribute("type","text");
			item.appendChild(p);
	}
	
	//Set premise & conc.
	
	var plist = document.getElementById("plist");
	plist.innerHTML = "";
	for (i = 1; i <= pnum; i++) {
			var item = document.createElement("li");
			plist.appendChild(item);
			var p = document.createElement("input");
			p.setAttribute("type","text");
			p.setAttribute("id","ip" + i );
			p.setAttribute("onchange","putPC(this.value,'p" + i + "')");
			item.appendChild(p);
	}
	var conc = document.getElementById("iconc");
	conc.setAttribute("onchange","document.getElementById('conc').innerHTML = this.value");
	
	//Set header for atomic statements 2261
	
	var acol = document.getElementById("acol");
	acol.colSpan = anum;
	var itable = document.getElementById("itable");
	while (itable.rows.length > 2) {
		itable.deleteRow(2);
	}
	
	var row = document.createElement("tr");
	itable.appendChild(row);
	var cell = document.createElement("td");
	row.appendChild(cell);
	for (i = 0; i < anum; i++) {
			var cell = document.createElement("td");
			row.appendChild(cell);
			cell.innerHTML = letters[i];
	}
	
	//Set header for premises
	
	var pcol = document.getElementById("pcol");
	pcol.setAttribute("colspan",pnum);
	var prems = document.getElementById("prems");
	prems.innerHTML = "";
	for (i = 0; i < pnum; i++) {
		var cell = document.createElement("th");
		prems.appendChild(cell);
		cell.innerHTML = romans[i];
	}


	// Insert premises
	
	for (i = 1; i <= pnum; i++) {
			var cell = document.createElement("td");
			cell.setAttribute("id", "p" + i);
			//p = document.createElement("input");
			//p.setAttribute("type","text");
			//cell.appendChild(p);
			row.appendChild(cell);
			
	}
	
	// Insert Conc
	
	var cell = document.createElement("td");
	var interlist = interpret(anum);
	cell.setAttribute("id", "conc");
	row.appendChild(cell);

	
	itable.appendChild(row);
	for (i = 1; i <= lnum; i++) {
		var row = document.createElement("tr");
		itable.appendChild(row);
		var cell = document.createElement("td");
		row.appendChild(cell);
		cell.innerHTML = i + ".";
		for (c = 0; c < anum; c++) {
			var cell = document.createElement("td");
			var p = document.createElement("input");
			p.setAttribute("type","checkbox");
			cell.appendChild(p);
			row.appendChild(cell);
			if (interlist[i-1][c] == true){
				p.setAttribute("checked","true");
			}
		}
		for (c = 1; c <= inum; c++) {
				var cell = document.createElement("td");
				var p = document.createElement("input");
				p.setAttribute("type","checkbox");
				cell.appendChild(p);
				row.appendChild(cell);
		}
	}
}
