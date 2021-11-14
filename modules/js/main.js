function sendData(task,type,html,json,isfinal) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mes = document.getElementById("message");
			mes.setAttribute("style","color:lime");
	                mes.innerHTML = this.responseText;
			if (isfinal){
				window.location = "index.php";
			}
		} else {

		}
  	};
  	xhttp.open("POST", "save.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send('task=' + task + '&type=' + type + '&html=' + html + '&json=' + json + '&final=' + isfinal);
}


function saveTask(task,type,isfinal){
	var mes = document.getElementById("message");
	mes.setAttribute("style","color:red");
	mes.innerHTML = "Mentés...";
	var res = document.createElement('div');
	res.setAttribute("id","cont");
	var json = {};

	// Save header
	
	var hed = document.createElement("div");
        hed.setAttribute("id","hed");
        var title = document.createElement("h4");
	title.innerHTML = "Alapadatok";
	res.appendChild(title);
	res.appendChild(hed)


	// Save  atomic statements or monadic predicates
	
	json.atoms = [];
	var apdiv = document.createElement("div");
	apdiv.setAttribute("id","apdiv");
	var title = document.createElement("h4");
	if (type == "venn"){
		title.innerHTML = "Monadikus predikátumok";
	} else {
		title.innerHTML = "Atomi mondatok";
	}
	res.appendChild(title);

	var list = document.getElementById("alist").cloneNode(true);
	var items = list.getElementsByTagName("li");
	for (var i = 0; i < items.length; ++i) {
		var ap = document.createElement("p");
		ap.innerHTML = letters[i] + ": " + items[i].getElementsByTagName("input")[0].value;
		json.atoms.push({"text": items[i].getElementsByTagName("input")[0].value});
		apdiv.appendChild(ap);
	}
	res.appendChild(apdiv);

	// Save formulas

	json.prems = [];
	var pdiv = document.createElement("div");
        pdiv.setAttribute("id","pdiv");
	var title = document.createElement("h4");
	title.innerHTML = "Formalizált premisszák és konklúzió";
	res.appendChild(title);
	var p = document.createElement("p");
	p.innerHTML = "Premisszák:";
	pdiv.appendChild(p);
        var plist = document.createElement("ol");
        pdiv.appendChild(plist);
        var list = document.getElementById("plist");
        var items = list.getElementsByTagName("li");
        for (var i = 0; i < items.length; ++i) {
                var p = document.createElement("li");
                plist.appendChild(p);
                var ptext = items[i].getElementsByTagName("input")[0].value;
		json.prems.push({"form":ptext})
		//ptext.replace(/u2261/g, "&#8801;");
		//ptext.replace(/u2283/g, "&#8835;");
		p.innerHTML = ptext;
        }
	var conc = document.createElement("p");
	conc.innerHTML = "Konklúzió: " + document.getElementById("iconc").value;
	json.conc = document.getElementById("iconc").value;
	pdiv.appendChild(conc);
	res.appendChild(pdiv);

	//Save analytic table
	
	
	if (type == "atable"){
		json.atable = [];
		var atdiv = title = document.createElement("div")
		var title = document.createElement("h4");
                title.innerHTML = "Analitikus táblázat";
		res.appendChild(title);
		var table = document.createElement("table");
		table.setAttribute("class","atable");
		var atable = document.getElementById("atable");
		var rows = atable.getElementsByTagName("tr");
		for (var r = 0; r < rows.length; ++r) {
			var arow = {}
			arow.id = rows[r].id;
			arow.cells = [];
			json.atable.push(arow);
			var row = document.createElement("tr");
			table.appendChild(row);
			var cells = rows[r].getElementsByTagName("td");
			for (var c = 0; c < cells.length; ++c){
				var acell = {}
				acell.id = cells[c].id;
				if (cells[c].getElementsByTagName("input").length > 0){
					acell.input = {};
					acell.input.text = cells[c].getElementsByTagName("input")[0].value;
				}
				if (cells[c].getElementsByTagName("button").length > 0){
					acell.button = {}
					acell.button.text = cells[c].getElementsByTagName("button")[0].innerHTML.replace(/\\/g,"\\\\");
					acell.button.onclick = cells[c].getElementsByTagName("button")[0].getAttribute('onclick');
				}
				if (c == 0){
					acell.text = cells[0].innerHTML;
					cc = document.createElement("td");
					cc.innerHTML = cells[c].innerHTML;
					row.appendChild(cc);
				}
				if (cells[c].className == "branch"){
					acell.class = "branch";
					acell.colspan = cells[c].colSpan;
					cc = document.createElement("td");
					cc.innerHTML = cells[c].getElementsByTagName("input")[0].value;
					cc.setAttribute("colspan",cells[c].colSpan);
					cc.setAttribute("class","branch");
					row.appendChild(cc);
				}
				json.atable[r].cells.push(acell);
			}
		}
		atdiv.appendChild(table);
		res.appendChild(atdiv);

	}

	// Save itable

	if (type == "itable"){
		json.itable = [];
                var itdiv = document.createElement("div")
                var title = document.createElement("h4");
                title.innerHTML = "Igazságtáblázat";
                res.appendChild(title);
                var itable = document.getElementById("itable");
		var table = itable.cloneNode(true);
		table.setAttribute("id","itable");
		var rows = table.getElementsByTagName("tr");
		for (var r = 3; r < rows.length; r++){
			json.itable.push({cells:[]});
			cells = rows[r].getElementsByTagName("td");
			for (var c = 1; c < cells.length; c++){
				if (rows[r].cells[c].getElementsByTagName("input")[0].checked){
					rows[r].cells[c].innerHTML = "1";
					json.itable[r - 3].cells.push({"value":true});
				} else {
					rows[r].cells[c].innerHTML = "0";
					json.itable[r - 3].cells.push({"value":false});
				}
			}
		}

		itdiv.appendChild(table);
		res.appendChild(itdiv);
	}

	// Save Venn
	
	if (type == "venn"){
		json.venn = {};
		json.venn.empty = [];
		json.venn.exist = [];
		var vdiv = document.createElement("div")
                var title = document.createElement("h4");
                title.innerHTML = "Venn diagram";
                res.appendChild(title);
		var diares = document.getElementById("dia").cloneNode(true);
		diares.getElementsByTagName("svg")[0].innerHTML = "";
		vdiv.appendChild(diares);
		res.appendChild(vdiv);

		for (t = 1;t <= 7;t++){
			json.venn.empty.push(document.getElementById("tr" + t).checked);
			json.venn.exist.push(document.getElementById("tg" + t).checked); 
		}
		var script = document.createElement("script");
		script.src = "https://altnyelv.unideb.hu/szekrenyes/e-learning-2021/Logika/exam/test/modules/js/venn.js";
		res.appendChild(script);
		var script = document.createElement("script");
		for (t = 1;t <= 7;t++){
			script.innerHTML = script.innerHTML + 'd3.select("#s' + t + '").attr("opacity", "0.8");\n';
                        if (json.venn.empty[t - 1]){
                                script.innerHTML = script.innerHTML + 'forceTarget(' + t + ', "red");\n';
                        } else {
                                script.innerHTML = script.innerHTML + 'forceTarget(' + t + ',"#6699cc");\n';
                        }
                        if (json.venn.exist[t - 1]){
                                var c = document.getElementById("tg" + t).checked = true;
                                script.innerHTML = script.innerHTML + 'forceTarget(' + t + ',"lime")\n';
                        }

                }
		res.appendChild(script);

	}
	
	// Save answer
	
	var ansdiv = document.createElement("div");
	var title = document.createElement("h4");
	title.innerHTML = "Helyes a következtetés?";
	res.appendChild(title);
	var p =  document.createElement("p");
	if (document.getElementById("yes").checked){
		p.innerHTML = "Igen";
		json.answer = true;
	} else {
		if (document.getElementById("no").checked){
			p.innerHTML = "Nem";
			json.answer = false;
		} else {
			p.innerHTML = "Nincs válasz";
		}
	}
	ansdiv.appendChild(p);
	res.appendChild(ansdiv);
	
	sendData(task,type,res.outerHTML,encodeURIComponent(JSON.stringify(json)),isfinal);

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
