
//newproject dialog open
document.getElementById('cpbtn').addEventListener('click',
function() {
	document.querySelector('.new_project_dialog_modal').style.display = 'flex';
	document.querySelector('.new_project_dialog_modal').style.opacity = '1';
});

//newproject dialog close
document.getElementById('close_btn').addEventListener('click',
function() {
    document.querySelector('.new_project_dialog_modal').style.display = 'none';
	document.querySelector('.new_project_dialog_modal').style.opacity = '0';
});




// add new track element


function add_track(){
	var ttotal = ""
	var list = document.getElementById("track-inputs");
	var chil = (list.children);
	if (chil.length > 9){
		console.log("more than 10");
	} else{
			//select ul list
		var list = document.getElementById("track-inputs");
		//create input box
		var inputbox = document.createElement('input');
		//assign params to input box
		inputbox.className = 'nt-input';
		inputbox.type="text";
		inputbox.name="track-name" ;
		inputbox.id="tname";
		inputbox.autocomplete="off";
		inputbox.placeholder = 'Trackname';
		//add input box
		list.appendChild(inputbox);
		//update text
		p = document.getElementById("total-tracks-added");
		c = ttotal.concat(chil.length + "/10")
		t = p.innerHTML = c;
		

	}

}


// delete new track element
function delete_new_track(){
	var ttotal = ""
	var list = document.getElementById("track-inputs");
	var chil = (list.children);
	//remove child
	list.lastChild.remove();
	//update text
	p = document.getElementById("total-tracks-added");
	c = ttotal.concat(chil.length + "/10")
	t = p.innerHTML = c;
	

}

function create_track(){
	//get aid, artist, tour
	var aid = document.getElementById('artistid');
	var aidnum = aid.getAttribute('artistid');
	console.log(aidnum);
	//artist name //
	var a_name = document.getElementById('atitle').innerHTML;
	//console.log(a_name);
	//tour name //
	var tour_name = document.getElementById('ttitle').innerHTML;
	//console.log(tour_name);

	//list setup
	var tracks = {
		total: 0,
		aid: aidnum,
		aname: a_name,
		tour_name: tour_name,
	}
	//basic setup
	var index;
	var names = 'track';
	var list = document.getElementById("track-inputs");
	var chil = (list.children);
	//loop through track inputs

	for (index = 0; index < chil.length; ++index) {
		console.log(chil[index]);
		if (chil[index].value === ""){
			console.log("entry is empty");
			ct = false;
			break;
		}else {
			console.log("entry has words in it");
		}

	
	}

	for (index = 0; index < chil.length; ++index) {
		let nv = names.concat(index);
    	var tname = (chil[index].value);
    	tracks[nv] = tname;
    	tracks['total'] = index + 1;
    	//console.log(tname);
    }

       	//POST JSON
   	fetch(`${window.origin}/track/new-track`, {
    	method: "POST",
    	credentials: "include",
    	body: JSON.stringify(tracks),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
   	})

   	var msg = "tracks created!"
   	alert(msg)
   	location.reload()

}


