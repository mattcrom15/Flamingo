// open new track section modal // 

function NewTrackSectionModal(){
	document.querySelector('.new_track_section_dialog_modal').style.display = 'flex';
	document.querySelector('.new_track_section_dialog_modal').style.opacity = '1';
}

// close new track section modal // 
document.getElementById('close_btn_nts_modal').addEventListener('click',
function() {
    document.querySelector('.new_track_section_dialog_modal').style.display = 'none';
	document.querySelector('.new_track_section_dialog_modal').style.opacity = '0';
});

// close new track section modal // 
document.getElementById('close_btn_et_modal').addEventListener('click',
function() {
    document.querySelector('.edit-track-dialog-modal').style.display = 'none';
	document.querySelector('.edit-track-dialog-modal').style.opacity = '0';
});



// add new track section // 


function add_track_section(){
	var ttotal = ""
	var list = document.getElementById("section-inputs");
	var chil = (list.children);
	if (chil.length > 9){
		console.log("more than 10");
		alert("maximum tracks added!")
	} else{
			//select ul list
		var list = document.getElementById("section-inputs");
		//create input box
		var inputbox = document.createElement('input');
		//assign params to input box
		inputbox.className = 'nt-input';
		inputbox.type="text";
		inputbox.name="section-name" ;
		inputbox.id="tsname";
		inputbox.autocomplete="off";
		inputbox.placeholder = 'Track section ';
		//add input box
		list.appendChild(inputbox);
		//update text
		p = document.getElementById("total-sections-added");
		c = ttotal.concat(chil.length + "/10")
		t = p.innerHTML = c;
		

	}

}

// delete new track element
function delete_new_track_section(){
	var ttotal = ""
	var list = document.getElementById("section-inputs");
	var chil = (list.children);
	//remove child
	list.lastChild.remove();
	//update text
	p = document.getElementById("total-sections-added");
	c = ttotal.concat(chil.length + "/10")
	t = p.innerHTML = c;
	

}

function create_track_section(){
	//get aid, artist, tour
	var tid = document.getElementById('trackid');
	var tidnum = tid.getAttribute('trackid');
	console.log(tidnum);
	//artist name //
	var t_name = tidnum.innerHTML;
	console.log(t_name);


	//list setup
	var tracks = {
		total: 0,
		tid: tidnum,
		trackname: t_name,
	}
	//basic setup
	var index;
	var names = 'track-section';
	var list = document.getElementById("section-inputs");
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
    	var tsname = (chil[index].value);
    	tracks[nv] = tsname;
    	tracks['total'] = index + 1;
    	console.log(tsname);
    }

       	//POST JSON
   	fetch(`${window.origin}/track/new-track-section`, {
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

function BuildComment(id,user,read,msg){
	const comdiv = document.querySelector('.comment-items');
	const delIco = window.origin;
	const dicoPath = delIco  +'/static/icon/trash.svg';
	const eicoPath = delIco  +'/static/icon/edit.svg';
	let citem = document.createElement('div');

	var buildhtml = '<div class="comment-item" commentid="'+id+'">' +
						'<p class="comment-message">'+ msg+'</p>' + 
						'<img src="'+ eicoPath +'" height="24" width="24" class="section-ico" title="Edit Comment" id="ce-ico" status="update" onclick="NewCommentDialog(this);" >' +
						'<img src="'+dicoPath  +'" height="24" width="24" class="section-ico" title="Delete Comment" id="cd-ico" kind="comment" onclick="DeleteModal(this);">' +
					'</div>'

	citem.innerHTML = buildhtml;
	comdiv.appendChild(citem);
}

function BuildSectionLayer(elem,slid,t,a,v,e){
	
	const lidiv =document.getElementById('layer-items');
	let litem = document.createElement('div');
	const delIco = window.origin;
	const dicoPath = delIco  +'/static/icon/trash.svg';
	const eicoPath = delIco  +'/static/icon/edit.svg';
	// litem.classList.add('sl');
	litem.setAttribute("layerid",slid);
	litem.setAttribute("onclick","EditLayer(this);")
	if (a === 0){
		a = 'NO Alpha'	
	} else{
		a = 'Alpha'
	}
	if (t === 'Background'){
		tclass = 'bg-dot';
	} else if(t ==='Mask'){
		tclass = 'mask-dot';
	}else if(t ==='Overlay'){
		tclass = 'overlay-dot';
	}else if(t==='uv'){
		tclass = 'Uv-dot';
	}else{
		tclass = 'ao-dot';
	}
	var buildhtml = 
    	'<div class="layer-item">' +
            '<div class="'+ tclass +'"></div>' +
			'<p class="layer-type">'+t+'</p> ' +
			'<p class="layer-type">'+e+'</p> ' +
			'<p class="alpha-true">'+a+'</p>' + 
			'<p>V<p>'+
			'<p class="version-num">'+v+'</p>' +
			'<img src="'+ eicoPath +'" height="24" width="24" class="section-ico" title="Edit Section" id="le-ico" kind="update" onclick="NewLayerModal(this);" >' +
			'<img src="'+dicoPath  +'" height="24" width="24" class="section-ico" title="Delete Section" id="ld-ico" kind="layer" onclick="DeleteModal(this);">' +
        '</div>'
        
	
	litem.innerHTML = buildhtml;
	lidiv.appendChild(litem);
	
	
	
	return console.log('section built')	


}

// get track section 
var track_section_id = ''
function tsproperties(elem){
	var lidiv = document.getElementById('layer-items');
	var ciddiv =document.querySelector('.comment-items');
	lidiv.innerHTML = '';
	ciddiv.innerHTML = '';
	var allts = document.querySelectorAll('.track-section-item');
	var tsc = document.querySelectorAll('.track-section-item-complete');
	allts.forEach(ts => {
		ts.style.border = '';
		
	});
	tsc.forEach(ts => {
		ts.style.border = '';
		
	});
	elem.style.border = '2px solid black';
	// var box = elem.parentElement.childNodes[3].style.display = 'flex';
	//gets selected track
	var tsid = elem.getAttribute('tracksecid');
	track_section_id = tsid;
	//gets its id
	var eid = elem.getAttribute('id');
	// gets the track specific id
	var did = document.getElementById(eid);
	//gets trackid
	var tid = document.getElementById('trackid');
	tid.getAttribute('trackid');

	document.getElementById('dkind').setAttribute('tsid',tsid);

	var tsname = did.querySelector('.ts-name').innerHTML;
	var tsstatus = elem.parentElement;

	const prog = elem.childNodes[5].innerHTML;
	let lcSlider = document.querySelector('.slider-lc');
	lcSlider.style.width = prog;

	const lctsid = document.getElementById('lc-name');
	lctsid.innerHTML = tsname;
	lctsid.setAttribute('tsid',track_section_id);
	

	if(prog === '0%'){
		lcSlider.style.background = '#F97068';
	}else if(prog === '25%'){
		lcSlider.style.background = '#F4D35E';
	}else if(prog === '50%'){
		lcSlider.style.background = '#8B80F9';
	}else if(prog === '75%'){
		lcSlider.style.background = '#77B6EA';
	}else{
		lcSlider.style.background = '#80ffda';
	}


	
	// sets the placeholder text to whatever the status is
	e = {
		'tid': track_section_id,
	}

	const lbtn = document.getElementById('newlayer');
	const cbtn = document.getElementById('newcomment');
	cbtn.setAttribute('class','new_project');
	lbtn.setAttribute('class','new_project');


	   	//POST JSON
   	fetch(`${window.origin}/track/section-layer-info`, {
    	method: "POST",
    	credentials: "include",
    	body: JSON.stringify(e),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
	   })

	.then(response => {
		if (response.status === 204){
			console.log('error');
			lidiv.innerHTML = '<div class="no-layers">' + '<p>No layers Created. Click on "New Layer" to create a layer.</p>'+ '</div>';
		} else{
			 return response.json();
		}})
		
	.then(data =>{
		console.log(data)
		// console.log(data);
		// <p>No layers added.</p>
		const l = data.reply.Layers;		
		const c = data.reply.Comments;
		if (l === 'No section-layers assigned'){
			const emptylayer = '<div class="no-layers">' + '<p>No layers Created. Click on "New Layer" to create a layer.</p>'+ '</div>';
			lidiv.innerHTML = emptylayer;

		}else{
			for (const layer in l){
				let sl = l[layer];
				let lid = sl[0].layerid;
				let type = sl[0].type;
				let alpha = sl[0].alpha;
				let version = sl[0].version;
				let extension = sl[0].ext;
				
				BuildSectionLayer(elem,lid,type,alpha,version,extension);
						
			}

		}

		if (c === 'No Comments assigned'){
			console.log('no comments');
			const emptycomment = '<div class="no-layers">' + '<p>No comments Created. Click on "New Comment" to create a comment.</p>'+ '</div>';
			ciddiv.innerHTML = emptycomment;

		}else{
			for (const comment in c){
				let sc = c[comment];
				let cid = sc[0].commentid;
				let cmsg = sc[0].msg;
				let cuser = sc[0].user;
				let cunread = sc[0].unread;
	
				BuildComment(cid,cuser,cunread,cmsg);
			
			}
		}


	


	})

	

	
	
	// // opens edit track modal

	// document.querySelector('.update-track-section-modal').style.display = 'flex';
	// document.querySelector('.update-track-section-modal').style.opacity = '1';


}


	//open dropdown 

function openDropdown(){
	document.querySelector('.dropdown-content').style.opacity = '1';
	document.querySelector('.dropdown-chevron').style.transform = 'rotate(180deg)';


}

	//get status name and close dropdown

function getname(elem){
	newStatus = elem.innerHTML;
	document.getElementById('edit-status').innerHTML = newStatus;

	//closes dropdown //
	document.querySelector('.dropdown-content').style.opacity = '0';
	document.querySelector('.dropdown-chevron').style.transform = 'rotate(0deg)';

}

// submit new status //

function NewStatus(){
	var ns = document.getElementById('edit-status').innerHTML;
	tracksid = track_section_id;



	var updateTrackSection = {

		sectionid: tracksid,
		status: ns,
	}


	fetch(`${window.origin}/track/edit-track-section`, {
    	method: "POST",
    	credentials: "include",
    	body: JSON.stringify(updateTrackSection),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
   	})

   	var msg = "status updated!"
   	//alert(msg)
   	location.reload()

}


// closes edit track section modal // 
document.getElementById('close_btn_ets_modal').addEventListener('click',
function() {
    document.querySelector('.update-track-section-modal').style.display = 'none';
	document.querySelector('.update-track-section-modal').style.opacity = '0';
});

//priority modal

//open dropdown 

function openPDropdown(){
	var pd = document.querySelector('.pdropdown-chevron')
	var set = pd.getAttribute('menu');
	if (set === 'closed'){
		document.querySelector('.p-dropdown').style.opacity = '1';
		document.querySelector('.p-dropdown').style.height = 'auto';
		document.querySelector('.pdropdown-chevron').style.transform = 'rotate(180deg)';
		document.querySelector('.p-dropdown-item-1').style.pointerEvents =  'auto';
		document.querySelector('.p-dropdown-item-2').style.pointerEvents =  'auto';
		document.querySelector('.p-dropdown-item-3').style.pointerEvents =  'auto';
		
		pd.setAttribute('menu','open');
	} else {
		document.querySelector('.p-dropdown').style.opacity = '0';
		document.querySelector('.p-dropdown').style.height = '0';
		document.querySelector('.pdropdown-chevron').style.transform = 'rotate(0deg)';
		document.querySelector('.p-dropdown-item-1').style.pointerEvents =  'none';
		document.querySelector('.p-dropdown-item-2').style.pointerEvents =  'none';
		document.querySelector('.p-dropdown-item-3').style.pointerEvents =  'none';
		pd.setAttribute('menu','closed');

	}
	

}



 // submit priority // 

function priname(elem){
	newp = elem.innerHTML;
	document.getElementById('pstatus').innerHTML = newp;

	np = document.getElementById('pstatus').innerHTML;

	var tid = document.getElementById('trackid');
	var tidnum = tid.getAttribute('trackid');

	var updatePriority = {

		
		tid: tidnum,
		priority: np,
	}

	fetch(`${window.origin}/track/update-priority`, {
    	method: "POST",
    	credentials: "include",
    	body: JSON.stringify(updatePriority),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
   	})

   	alert('priority updated');

	//closes dropdown //
	document.querySelector('.p-dropdown').style.opacity = '0';
	document.querySelector('.pdropdown-chevron').style.transform = 'rotate(0deg)';
	document.querySelector('.p-dropdown-item-1').style.pointerEvents =  'none';
	document.querySelector('.p-dropdown-item-2').style.pointerEvents =  'none';
	document.querySelector('.p-dropdown-item-3').style.pointerEvents =  'none';


	location.reload();

}


function trackEditMenu(){
	var menu = document.querySelector('.edit-track-menu');
	var menuToggle = menu.getAttribute('menu');
	if (menuToggle == 'closed'){
		var mi = document.querySelectorAll('.edit-track-menu-item');
		// menu.style.display = 'flex';
		menu.style.height = 'auto';
		menu.style.opacity = '1';
		menu.setAttribute('menu','open');
		mi.forEach(m => {
			m.style.pointerEvents = 'auto';
			
		});

		 
	}else{
		var mi = document.querySelectorAll('.edit-track-menu-item');
		// menu.style.display = 'none';
		menu.style.height = '0';
		menu.style.opacity = '0';
		menu.setAttribute('menu','closed');
		mi.forEach(m => {
			m.style.pointerEvents = 'none';
			
		});
	}
	

}
modal = document.querySelector('.edit-track-menu')



// create new layer section modal //

function openNTLdropdown(){
	document.querySelector('.new-track-layer-modal').style.display = 'none';
	document.querySelector('.new-track-layer-modal').style.opacity = '0';
}


function SectionInfo(elem){
	
	const m = elem.parentElement.childNodes[3];
	m.style.display = 'flex';
	m.style.opacity = '1';
	m.style.height = 'auto';
	m.childNodes[1].childNodes[1].style.pointerEvents = 'auto';
	m.childNodes[1].childNodes[5].style.pointerEvents = 'auto';
	m.childNodes[1].childNodes[3].style.pointerEvents = 'auto';
}

function EditLayer(){
	console.log('edit layer modal');
}

function EditSectionModal(elem){
	document.querySelector('.edit_section_dialog_modal').style.display = 'flex';
	console.log(elem.parentElement.parentElement);
	const sname =elem.parentElement.parentElement.childNodes[1].outerText;
	const status = elem.parentElement.parentElement.childNodes[7].outerText;
	const sid = elem.parentElement.parentElement;
	document.querySelector('.st-chevron').style.pointerEvents = 'auto';
	document.getElementById('sectionname').innerHTML = sname;
	document.getElementById('sectionname').setAttribute('sid',sid.getAttribute('tracksecid'));
	document.getElementById('sectiontype').innerHTML = status;
	document.getElementById('renamesection').value = sname;
}

function closeEditSectionModal(){
	document.querySelector('.st-chevron').style.pointerEvents = 'none';
	document.querySelector('.edit_section_dialog_modal').style.display = 'none';
	//pass
}



function deleteSectionModal(elem){
	document.querySelector('.delete_dialog_modal').style.display= 'flex';
	const p = elem.parentElement.parentElement.childNodes;
	console.log(p);
	const tsid =elem.parentElement.parentElement.getAttribute('tracksecid');
	const n = p[1].outerText;
	console.log(n);
	document.querySelector('.delete_msg_ts').innerHTML ="do you wish to delete this section and all it's elements?"
	document.getElementById('sname').setAttribute('tsid',tsid);
	document.getElementById('sname').innerHTML = n;

	
}

function deleteSection(){
	const p = document.getElementById('sname');
	const tsid = p.getAttribute('tsid');
	const tname = p.innerHTML;
	console.log(tname);
	console.log(tsid);

	var delsec = {
		'tsid': tsid,
		'tsname': tname,
	}

	fetch(`${window.origin}/track/delete-track-section`, {
    	method: "DELETE",
    	credentials: "include",
    	body: JSON.stringify(delsec),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
   	}).then (response => console.log(response.json()))

	alert('track deleted');

	location.reload();
	
}

function SectionTypeDropdown(){
	var d = document.querySelector('.st-chevron');
	if(d.getAttribute('menu') == 'closed'){
		document.querySelector('.st-chevron').style.transform = 'rotate(180deg)';
		document.querySelector('.section-selections').style.opacity = '1';
		document.querySelector('.section-selections').style.height = 'auto';
		d.setAttribute('menu','open'); 

	} else{
		document.querySelector('.st-chevron').style.transform = 'rotate(0deg)';
		document.querySelector('.section-selections').style.opacity = '0';
		document.querySelector('.section-selections').style.height = '0'; 
		d.setAttribute('menu','closed');

	}

}
function SectionType(elem){
	document.querySelector('.section-selections').style.opacity = '0';
	const st = document.querySelectorAll('.section-type');
	st.forEach(type => {
		type.pointerEvents = 'none';
		
	});
	var d = document.querySelector('.st-chevron');
	d.setAttribute('menu','closed');
	d.style.transform = 'rotate(0deg)';
	document.querySelector('.section-selections').style.height = '0'; 
	document.getElementById('sectiontype').innerHTML = elem.innerHTML;
}

function EditSection(){
	const sid = document.getElementById('sectionname').getAttribute('sid');
	const name = document.getElementById('renamesection').value;
	const stype = document.getElementById('sectiontype').innerHTML;
	console.log(name);
	console.log(sid);
	console.log(stype);

	var editsection = {
		'sid':sid,
		'sname':name,
		'sstatus':stype,
	}

	fetch(`${window.origin}/track/edit-track-section`, {
    	method: "POST",
    	credentials: "include",
    	body: JSON.stringify(editsection),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
   	}).then (response => console.log(response.json()))

	alert(name + ' edited');

	location.reload();

}

function layerCommentSwitch(elem){
	const s = elem.getAttribute('select');
	const layer = document.getElementById('l');
	const com = document.getElementById('c');
	const slide = document.querySelector('.lc-selector');
	const boxMove = document.getElementById('lc-section');

	if (elem.id ==='l'){
		console.log('this is layer');
		if(s ==='true'){
			console.log('layer is selected');
		}else{
			elem.setAttribute('class','sl-active');
			com.setAttribute('class','sl-inactive');
			elem.setAttribute('select','true');
			com.setAttribute('select','false');
			slide.style.transform = 'translateX(253px)';
			slide.style.width = '50px';
			boxMove.style.transform = 'translateX(0px)';
		}

	}else{
		if(s ==='true'){
			console.log('Comment is selected');
		}else{
			elem.setAttribute('class','sl-active');
			layer.setAttribute('class','sl-inactive');
			elem.setAttribute('select','true');
			layer.setAttribute('select','false');
			slide.style.transform = 'translateX(335px)';
			slide.style.width = '90px';
			boxMove.style.transform = 'translateX(-50%)';
		}
		console.log('this is comment');
	}

}

function ExportSection(elem){
	const tsid = elem.parentElement.parentElement.getAttribute('tracksecid');
	const tname = document.getElementById('trackid').innerHTML;
	const tsec = elem.parentElement.parentElement.childNodes[1].innerHTML;

	var entry = {
		'tracksecid':tsid,
		'trackname':tname,
		'tracksection':tsec

	}
	
	fetch(`${window.origin}/track/export-section`, {
    	method: "POST",
    	credentials: "include",
    	body: JSON.stringify(entry),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
	   }).then (response => 
		document.location = response.url
		);
	   
}


function DeleteCommentModal(elem){
	console.log(elem);

}

function EditTrackModal(){
	document.querySelector('.edit-track-dialog-modal').style.display = 'flex';
	document.querySelector('.edit-track-dialog-modal').style.opacity = '1';

	const tid = document.getElementById('trackid');
	const tidd = tid.getAttribute('trackid');
	const tname = tid.innerHTML;

	const desc = document.getElementById('desc').innerHTML;
	const tlength = document.getElementById('tlength').innerHTML;
	const assigned = document.getElementById('assign').innerHTML;

	document.getElementById('et-track-title').value = tname;
	document.getElementById('et-ttitle').innerHTML = tname;
	document.getElementById('desc-box').value = desc;
	document.getElementById('Tracklength').value = tlength;
	document.getElementById('Assigned').value = assigned;

	//pass

}

function SubmitTrackEdits(){
	console.log('track edits submitted.');

	const t= document.getElementById('et-track-title').value;
	const d= document.getElementById('desc-box').value;
	const tid = document.getElementById('et-ttitle').getAttribute('etid');
	const tl= document.getElementById('Tracklength').value;
	const a= document.getElementById('Assigned').value;

	var entry = {
		'trackid':tid,
		'trackname': t,
		'description':d,
		'tracklength':tl,
		'assigned':a
	}


	fetch(`${window.origin}/track/edit-track`, {
    	method: "PUT",
    	credentials: "include",
    	body: JSON.stringify(entry),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
	   })

	   alert('track edited.');

	   location.reload();

}