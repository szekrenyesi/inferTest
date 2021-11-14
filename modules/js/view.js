function displayData(data){
	
	json = JSON.parse(data);
	if (json.venn){
		 var letters = ['F','G','H'];
	} else {
		var letters = ['A','B','C','D'];
	}
	const romans = ['I.','II.','III.','IV.','V.'];

	var res = document.getElementById('cont');


	// Load atomic statements or monadic predicates
	
	var apdiv = document.getElementById("apdiv");
	var title = document.getElementById("aptitle");
	if (json.venn){
		title.innerHTML = "Monadikus predikátumok";
	} else {
		title.innerHTML = "Atomi mondatok";
	}

	for (var i = 0; i < json.atoms.length; ++i) {
		var ap = document.createElement("p");
		ap.innerHTML = letters[i] + ": " + json.atoms[i].text;
		apdiv.appendChild(ap);
	}

	// Save formulas

	var pdiv = document.getElementById("pdiv");
	var p = document.createElement("p");
	p.innerHTML = "Premisszák:";
	pdiv.appendChild(p);
        var plist = document.createElement("ol");
        pdiv.appendChild(plist);
        for (var i = 0; i < json.prems.length; ++i) {
                var p = document.createElement("li");
                plist.appendChild(p);
                var ptext = json.prems[i].form;
		p.innerHTML = ptext;
        }
	var conc = document.createElement("p");
	conc.innerHTML = "Konklúzió: " + json.conc;
	pdiv.appendChild(conc);

	//Save analytic table
	
	
	if (json.atable){

		var atdiv =  document.getElementById("method");
		var title = document.getElementById("mtitle");
                title.innerHTML = "Analitikus táblázat";
		var table = document.createElement("table");
		table.setAttribute("class","atable");
		for (var r = 0; r < json.atable.length; ++r) {
			var row = document.createElement("tr");
			table.appendChild(row);
			for (var c = 0; c < json.atable[r].cells.length; ++c){
				if (c == 0){
					cc = document.createElement("td");
					cc.innerHTML = json.atable[r].cells[c].text;
					row.appendChild(cc);
				}
				if (json.atable[r].cells[c].class == "branch"){
					cc = document.createElement("td");
					cc.innerHTML = json.atable[r].cells[c].input.text;
					cc.setAttribute("colspan",json.atable[r].cells[c].colspan);
					cc.setAttribute("class","branch");
					row.appendChild(cc);
				}
			}
		}
		atdiv.appendChild(table);

	}

	// Save itable

	if (json.itable){
                var itdiv = document.getElementById("method");
                var title = document.getElementById("mtitle");
                title.innerHTML = "Igazságtáblázat";
                var table = document.createElement("itable");
		table.setAttribute("id","itable");
		row = document.createElement("tr");
		cell = document.createElement("th");
		cell.setAttribute("rowspan",2);
		row.appendChild(cell);
		cell = document.createElement("th");
		cell.setAttribute("rowspan",2);
                cell.setAttribute("colspan",json.atoms.length);
		cell.setAttribute("id","acol");
		cell.innerHTML = "Atomi mondatok";
		row.appendChild(cell);
		cell = document.createElement("th");
                cell.setAttribute("rowspan",1);
                cell.setAttribute("colspan",json.prems.length);
                cell.setAttribute("id","pcol");
		cell.innerHTML = "Premisszák";
                row.appendChild(cell);
		cell = document.createElement("th");
                cell.setAttribute("rowspan",2);
                cell.setAttribute("colspan",1);
		cell.innerHTML = "Konklúzió";
                row.appendChild(cell);
		table.appendChild(row);
		row = document.createElement("tr");
		for (var i = 0; i < json.prems.length; i++){
			cell = document.createElement("th");
			cell.innerHTML = romans[i];
			row.appendChild(cell);
		}
		table.appendChild(row);
		coln = json.atoms.length + json.prems.length + 2;
		row = document.createElement("tr");
		cell = document.createElement("td");
		row.appendChild(cell);
		for (var i = 0; i < json.atoms.length; i++){
			cell = document.createElement("td");
			cell.innerHTML = letters[i];
			row.appendChild(cell);
		}
		for (var i = 0; i < json.prems.length; i++){
                        cell = document.createElement("td");
                        cell.innerHTML = json.prems[i].form;
                        row.appendChild(cell);
                }
		cell = document.createElement("td");
		cell.innerHTML = json.conc;
		row.appendChild(cell);
		table.appendChild(row);
		for (var r = 0; r < json.itable.length; r++){
			row = document.createElement("tr");
			cell = document.createElement("td");
			var intnum = r + 1;
			cell.innerHTML = intnum;
			row.appendChild(cell);
			for (var c = 0; c < json.itable[r].cells.length; c++){
				cell = document.createElement("td");
				if (json.itable[r].cells[c].value ==  true){
					cell.innerHTML = "1";
				} else {
					cell.innerHTML = "0";
				}
				row.appendChild(cell);
			}
			table.appendChild(row)
		}
		itdiv.appendChild(table);
	}

	// Save Venn
	
	if (json.venn){
		/*var vdiv = document.createElement("svg");
		vdiv.setAttribute("width","500px");
		vdiv.setAttribute("height","500px");
		var mdiv = document.getElementById("method");
		mdiv.setAttribute("id","dia");
		mdiv.appendChild(vdiv)*/
                var title = document.getElementById("mtitle");
                title.innerHTML = "Venn diagram";

		/*var vs = document.createElement("script");
		vs.setAttribute("src","../modules/js/venn.js");
		document.getElementsByTagName("body")[0].appendChild(vs);*/

		//var script = document.createElement("script");
		//
		for (t = 1;t < 8;t++){
			d3.select('#s' + t).attr("opacity", "0.8");
			//script.innerHTML = script.innerHTML + 'd3.select("#s' + t + '").attr("opacity", "0.8");\n';
                        if (json.venn.empty[t - 1]){
                                //script.innerHTML = script.innerHTML + 'd3.select("#s' + t + ').attr("fill", "red");\n';
				d3.select('#s' + t).attr("fill", "red");
                        } else {
                                //script.innerHTML = script.innerHTML + 'd3.select("#s' + t + ').attr("fill", "#6699cc");\n';
				d3.select('#s' + t).attr("fill", "#6699cc");
                        }
                        if (json.venn.exist[t - 1]){
                                //script.innerHTML = script.innerHTML + 'd3.select("#s' + t + ').attr("fill", "lime");\n';
				d3.select('#s' + t).attr("fill", "lime");
                        }

                }
		//alert(document.getElementsByTagName("body")[0].outerHTML);
		//document.getElementsByTagName("body")[0].appendChild(script);

	}
	
	// Save answer
	
	var ansdiv = document.getElementById("answer");
	var p =  document.createElement("p");
	if (json.answer != undefined){
		if (json.answer == true){
			p.innerHTML = "Igen";
		} else {
			p.innerHTML = "Nem";
		}
	} else {
		p.innerHTML = "Nincs válasz";
	}
	ansdiv.appendChild(p);
	

}

function loadData(json,type){

	var json = JSON.parse(json);
	
	// Set numbers
	
	var alist = document.getElementById("alist");
        var aset = document.getElementById("anum");
	if (type == "venn"){
		aset.selectedIndex = 0;
	} else {
		aset.selectedIndex = json.atoms.length - 2;
	}

	var plist = document.getElementById("plist");
        var pset = document.getElementById("pnum");
        pset.selectedIndex = json.prems.length - 2;

	anChange();

	// Set atomic
	
	var atoms = alist.getElementsByTagName("li");
        for (let a = 0; a < atoms.length; a++) {
                atoms[a].getElementsByTagName("input")[0].value = json.atoms[a].text;
        }

	// Set prems & conc
	
	var prems = plist.getElementsByTagName("li");
	for (let p = 0; p < prems.length; p++) {
		prems[p].getElementsByTagName("input")[0].value = json.prems[p].form;
	}
	if (json.conc){
		document.getElementById("iconc").value = json.conc;
	}

	// Load atable
	
	if (type == "atable"){
		var atable = document.getElementById("atable");
		atable.innerHTML = "";
		atable.setAttribute("id","atable");
		for (let r = 0; r < json.atable.length; r++){
			var tr = document.createElement("tr");
			tr.setAttribute("id",json.atable[r].id);
			for (let c = 0; c < json.atable[r].cells.length; c++){
				var td = document.createElement("td");
				if (json.atable[r].cells[c].text){
					td.innerHTML = json.atable[r].cells[c].text;
				}
				if (json.atable[r].cells[c].id){
					td.setAttribute("id",json.atable[r].cells[c].id);
				}
				if (json.atable[r].cells[c].class){
					td.setAttribute("class",json.atable[r].cells[c].class);
				}
				if (json.atable[r].cells[c].colspan){
                                        td.setAttribute("colspan",json.atable[r].cells[c].colspan);
                                }
				if (json.atable[r].cells[c].input){
					var input = document.createElement("input");
					input.setAttribute("type","text");
                                        input.setAttribute("value",json.atable[r].cells[c].input.text);
					td.appendChild(input)
                                }
				if (json.atable[r].cells[c].button){
					var button = document.createElement("button");
					button.setAttribute("onclick",json.atable[r].cells[c].button.onclick);
					if (json.atable[r].cells[c].class == "branch"){
						button.setAttribute("style","float:right");
					}
					button.innerHTML = json.atable[r].cells[c].button.text;
					td.appendChild(button);
				}
				tr.appendChild(td);
			}
			atable.appendChild(tr);
		}
	}

	// Load itable

	if (type == "itable"){
		for (let p = 0; p < json.prems.length;p++){
			var pindex = p + 1;
			document.getElementById("p" + pindex).innerHTML = json.prems[p].form;
		}
		document.getElementById("conc").innerHTML = json.conc;
		var rows = document.getElementById("itable").getElementsByTagName("tr");
		for (let r = 0; r < json.itable.length;r++){
			var tr = r + 3;
			for (let c = 0; c < json.itable[r].cells.length;c++){
				var td = c + 1;
				var value = rows[tr].getElementsByTagName("td")[td].getElementsByTagName("input")[0];
				value.checked = json.itable[r].cells[c].value;
			}
		}
	}

	//Load Venn
	
	if (type == "venn"){
		for (t = 1;t <= 7;t++){
			if (json.venn.empty[t - 1]){
				var c =	document.getElementById("tr" + t).checked = true;
				//forceTarget(t,'red');
				forceTarget(t, "red");
				document.getElementById("s" + t).status = "red";
			} else {
				forceTarget(t,'#6699cc')
			}
			if (json.venn.exist[t - 1]){
                                var c = document.getElementById("tg" + t).checked = true;
                                forceTarget(t,'lime');
				document.getElementById("s" + t).status = "green";
                        }

		}
	}
	//Load answer
	

	if (json.answer != undefined){
		if (json.answer == true){
			document.getElementById("yes").checked = true;
		} else {
			document.getElementById("no").checked = true;
		}

	} else {
		document.getElementById("yes").checked = false;
		document.getElementById("no").checked = false;
	}


}
