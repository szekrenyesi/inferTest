const letters = ['A','B','C','D'];
const romans = ['I.','II.','III.','IV.','V.'];
var pnum;
var inum;

document.getElementsByTagName("title")[0].innerHTML = "Analitikus táblázat";

function putPC(text,ln){
	var atable = document.getElementById("atable");
	var ln = ln - 1
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
				item.innerHTML = letters[i] + ":\t\t\t";
				var p = document.createElement("input");
				p.setAttribute("type","text");
				p.setAttribute("value","");
				item.appendChild(p);
		}
		
		//Set premise & conc.
		
		var plist = document.getElementById("plist");
		plist.innerHTML = "";
		var atable = document.getElementById("atable");
		while (atable.rows.length > 1) {
			atable.deleteRow(1);
		}

		for (let i = 1; i <= pnum; i++) {
				add(i);
				var item = document.createElement("li");
				plist.appendChild(item);
				var p = document.createElement("input");
				p.setAttribute("type","text");
				p.setAttribute("id","ip" + i );
				p.setAttribute("onchange","putPC(this.value," + i + ")");
				item.appendChild(p);
		}

}

function altern(rn,cn){
	var ncn = cn + 1;
	var row = document.getElementById("r" + rn);
	var ocell = row.getElementsByTagName("td")[cn];
	var newc = row.insertCell(ncn);
	newc.setAttribute("class","branch");
	var obr = ocell.id;
	ocell.id = obr + "A";
	var newbr = obr + "B";
	newc.setAttribute("id",newbr);
	var ctext = document.createElement("input");
	ctext.setAttribute("type","text");
	newc.appendChild(ctext);
	var splitc = document.createElement("button");		
	splitc.setAttribute("onclick","altern(" + rn + "," + ncn + ")");
	splitc.setAttribute("style","float:right");
	splitc.innerHTML = "^";
	newc.appendChild(splitc);
	for (r = 1; r < rn; r++) {
		var partr = document.getElementById("r" + r);
		var cnum = partr.childElementCount - 3;
		for (c = 1; c <= cnum; c++) {
				var cell = partr.getElementsByTagName("td")[c];
				var br = cell.id;
				if (newbr.includes(br)){
					var newcspn = cell.colSpan + 1;
					cell.setAttribute("colspan",newcspn);
				}
		}
	}
}

function remove(rown){
	if (rown < inum + 1){
			//return
	}
	document.getElementById("r" + rown).remove();
	var rn = rown - 1 ;
	var partr = document.getElementById("r" + rn);
	var cnum = partr.childElementCount - 3;
	if (rn > inum){		
		for (c = 1; c <= cnum; c++) {
			var cell = partr.getElementsByTagName("td")[c];
			var splitc = document.createElement("button");
			splitc.setAttribute("onclick","altern(" + rn + "," + c + ")");
			splitc.setAttribute("style","float:right");
			splitc.innerHTML = "^";
			cell.appendChild(splitc);
		}
	}
	if (rown > inum){
		var cell = partr.getElementsByTagName("td")[cnum + 1];
		var plus = 	document.createElement("button");
		plus.setAttribute("value","+");
		plus.setAttribute("onclick","add(" + rn + ")");
		plus.innerHTML = "+";
		cell.appendChild(plus);
	}
	if (rown > inum + 1){
		var cell = partr.getElementsByTagName("td")[cnum + 2];
		var minus = document.createElement("button");
		minus.setAttribute("value","-");
		minus.setAttribute("onclick","remove(" + rn + ")");
		minus.innerHTML = "-";
		cell.appendChild(minus);
	}
}
function add(rown){
		var tbl = document.getElementById("atable");
		var partr = document.getElementById("r" + rown);
		var cnum = partr.getElementsByTagName("td").length - 3;				
		var row = document.createElement("tr");
		var rn = rown + 1
		row.setAttribute("id","r" + rn);
		tbl.appendChild(row);
		var cell = document.createElement("td");
		cell.innerHTML = rn;
		row.appendChild(cell);
		for (c = 1; c < partr.childElementCount; c++) {
			var cell = partr.getElementsByTagName("td")[c];
			if (cell.getElementsByTagName("button")[0]){
				cell.getElementsByTagName("button")[0].remove();
			}
		}
		for (let i = 1; i <= cnum; i++) {
				var cell = document.createElement("td");
				cell.setAttribute("class","branch");
				var branch = partr.getElementsByTagName("td")[i].id;
				cell.setAttribute("id",branch);
				var colspn = partr.getElementsByTagName("td")[i].colSpan;
				cell.setAttribute("colspan",colspn);
				row.appendChild(cell);
				var ctext = document.createElement("input");
				ctext.setAttribute("type","text");
				cell.appendChild(ctext);
				if (rown > pnum){
					var splitc = document.createElement("button");
					splitc.setAttribute("onclick","altern(" + rn + "," + i + ")");
					splitc.setAttribute("style","float:right");
					splitc.innerHTML = "^";
					cell.appendChild(splitc);
				}
		}
		var cell = document.createElement("td");
		row.appendChild(cell);
		if (rown > pnum - 1){
			var plus = 	document.createElement("button");
			plus.setAttribute("value","+");
			plus.setAttribute("onclick","add(" + rn + ")");
			plus.innerHTML = "+";
			cell.appendChild(plus);
		}
		var cell = document.createElement("td");
		row.appendChild(cell);
		if (rown > pnum){
			var minus = document.createElement("button");
			minus.setAttribute("value","-");
			minus.setAttribute("onclick","remove(" + rn + ")");
			minus.innerHTML = "-";
			cell.appendChild(minus);
		}
}
