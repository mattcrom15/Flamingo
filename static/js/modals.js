/// delete track modal


//open deletetrackmodal

function deleteTrackModal(elem){
    document.querySelector('.delete_track_dialog_modal').style.display = 'flex';
    document.querySelector('.edit-track-menu').style.opacity = '0';
    const box = elem.parentElement;
    const tid = box.parentElement.parentElement.getAttribute('trackid');
    const tname = document.getElementById('tracktitle').innerHTML;
    console.log(tname);
    const msgptag = document.querySelector('.delete_msg_t');
    document.getElementById('trackname').innerHTML = tname;
    msgptag.setAttribute('id',tid);
    msgptag.innerHTML = "Do you wish to delete this track and all it's contents?";
    

}

//deleteTrackonTrackpage

function deleteTrack(){
    const msgptag = document.querySelector('.delete_msg_t')
    const tid = msgptag.getAttribute('id');
    msgptag.innerHTML = '';
    msgptag.setAttribute('id','');
    console.log(tid);
    const aid = document.querySelector('.track-info-track-dash').getAttribute('artistid');
    const aname = document.querySelector('.track-info-track-dash').getAttribute('aname');
    const tname = document.getElementById('trackname').innerHTML;
    document.querySelector('.delete_track_dialog_modal').style.display = 'none';
    var resPost = {
            "aid": aid,
            "tid": tid,
            "trackname":tname,
            "artistname":aname,
    }
    
    fetch(`${window.origin}/trackdeleted`, {
    	method: "DELETE",
    	credentials: "include",
    	body: JSON.stringify(resPost),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
   	});

}

//deleteProjectModal

function deleteProjectModal(elem){
    document.querySelector('.delete_project_dialog_modal').style.display= 'flex';
    const box = elem.parentElement;
    const aid = box.getAttribute('projectid');
    const aname = elem.parentElement.childNodes[3].childNodes[1].outerText;
    const tname = elem.parentElement.childNodes[3].nextSibling.nextSibling.outerText;
    const msgptag = document.querySelector('.delete_msg_p');
    document.getElementById('anamedel').innerHTML = aname;
    document.getElementById('tnamedel').innerHTML = tname;
    msgptag.innerHTML = "Do you wish to delete this project and all it's contents?";
    msgptag.setAttribute('id',aid);

    
}

//deleteProjectModalD

function deleteProjectModalD(elem){
    document.querySelector('.delete_project_dialog_modal').style.display= 'flex';
    const box = document.getElementById('Projectid');
    const aid = box.getAttribute('projectid');
    const aname = document.getElementById('atitle').innerHTML;
    console.log(aname);
    const tname = document.getElementById('ttitle').innerHTML;
    const msgptag = document.querySelector('.delete_msg_p');
    document.getElementById('anamedel').innerHTML = aname;
    document.getElementById('tnamedel').innerHTML = tname;
    msgptag.innerHTML = "Do you wish to delete this project and all it's contents?";
    msgptag.setAttribute('id',aid);

    
}

//deleteProject

function deleteProject(){
    const msgptag = document.querySelector('.delete_msg_p')
    const aid = msgptag.getAttribute('id');
    msgptag.innerHTML = '';
    msgptag.setAttribute('id','');
    console.log(aid);
    const aname = document.getElementById('anamedel').innerHTML;
    const tname = document.getElementById('tnamedel').innerHTML;

	console.log('track deleted');
    document.querySelector('.delete_project_dialog_modal').style.display = 'none';
    
    var resPost = {
            "aid": aid,
            "Artistname":aname,
            "tourname":tname
    }
    fetch(`${window.origin}/projectdeleted`, {
    	method: "DELETE",
    	credentials: "include",
    	body: JSON.stringify(resPost),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
       })
       
}

//pdashboard delete track

function deleteTrackModalD(elem){
    document.querySelector('.delete_track_dialog_modal').style.display= 'flex';
    const box = elem.parentElement;
    const aid = box.parentElement.getAttribute('projectid');
    const tname = box.childNodes[0].nextSibling.outerText
    const msgptag = document.querySelector('.delete_msg_t');
    const ttag = document.getElementById('trackname').innerHTML = tname;
    msgptag.innerHTML = "Do you wish to delete this track and all it's contents?";
    msgptag.setAttribute('id',aid);
    // console.log();

    
}

function deleteTrackD(){
    const msgptag = document.querySelector('.delete_msg_t')
    const tid = msgptag.getAttribute('id');
    msgptag.innerHTML = '';
    msgptag.setAttribute('id','');
    console.log(tid);
    const aname = document.querySelector('.title-dash').innerHTML;
    const tname = document.querySelector('.subtitle-dash').innerHTML;
    const trackname = document.getElementById('trackname').innerHTML;

	console.log('track deleted');
    document.querySelector('.delete_track_dialog_modal').style.display = 'none';
    
    var resPost = {
            "tid": tid,
            "trackname": trackname,
            "artistname":aname,
            "tourname":tname
    }
    
    fetch(`${window.origin}/trackdeleted`, {
    	method: "DELETE",
    	credentials: "include",
    	body: JSON.stringify(resPost),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
   	})

}


//close via cancel btn

function delcancelbtn() {
    document.querySelector('.delete_dialog_modal').style.display = 'none';
    document.querySelector('.delete_dialog_modal').style.display = 'none';
    const msgptag = document.querySelector('.delete_msg')
    msgptag.innerHTML = '';
    msgptag.setAttribute('id','');
	
}

//open comment dialog

function NewCommentDialog(elem){
    const s = elem.getAttribute('status');
    if (s === 'new'){
        document.getElementById('commentbox').value = '';
        document.querySelector('.comment-header').innerHTML = 'New Comment';
        document.querySelector('.new-comment-dialog-modal').style.display = 'flex';
        document.querySelector('.new-comment-dialog').setAttribute('status','new');
        var txtarea = document.getElementById("commentbox");
        const commentHeader = document.querySelector('.comment-subheader');
        const sectionName = document.getElementById('lc-name');
        commentHeader.innerHTML = sectionName.innerHTML;
        commentHeader.setAttribute('sectionid',sectionName.getAttribute('tsid'));
        document.querySelector('.comment_btn').innerHTML = 'send';
        document.querySelector('.comment-subheader').setAttribute('commentid','');
        txtarea.focus()
    }else {
        const cid = elem.parentElement.getAttribute('commentid');
        document.querySelector('.comment-subheader').setAttribute('commentid',cid);
        document.querySelector('.comment-header').innerHTML = 'Edit Comment';
        document.querySelector('.new-comment-dialog').setAttribute('status','update');
        const commentHeader = document.querySelector('.comment-subheader');
        const sectionName = document.getElementById('lc-name');
        commentHeader.innerHTML = sectionName.innerHTML;
        commentHeader.setAttribute('sectionid',sectionName.getAttribute('tsid'));
        document.querySelector('.new-comment-dialog-modal').style.display = 'flex';
        var txtarea = document.getElementById("commentbox");
        const ctext = elem.parentElement.childNodes[0].outerText;
        document.querySelector('.comment_btn').innerHTML = 'Update';
        txtarea.value = ctext;
        txtarea.focus()
    }


}

// get text input count

document.getElementById('commentbox').onkeyup = function () {
    const maxCount = this.getAttribute('maxlength');
    if (this.value.length <= maxCount){
        document.querySelector('.totalchar').innerHTML = (this.value.length) + "/" + maxCount;
    } else{
        this.setAttribute('disabled');
    }
    
  };

// submit new comment

function submitNewComment(){
    const status = document.querySelector('.new-comment-dialog').getAttribute('status');
    const cb = document.getElementById('commentbox');
    const commentHeader = document.querySelector('.comment-subheader');
    const sid  = commentHeader.getAttribute('sectionid');
    const sname = commentHeader.innerHTML;
    const comment = cb.value;
    const cid = commentHeader.getAttribute('commentid');


    if (status === 'new'){

        var postdata = {
        
            "sectionid":sid,
            "sectionname":sname,
            "Comment": comment,
        }

        fetch(`${window.origin}/track/new-comment`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(postdata),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
           }) .then (response => console.log(response.json()))
        
    
        document.querySelector('.new-comment-dialog-modal').style.display = 'none';
        alert('new comment submitted.');
        location.reload()

    } else{

        var postdata = {
        
            "sectionid":sid,
            "sectionname":sname,
            "Comment": comment,
            "commentid":cid,
            "user":'matt'
        }

        fetch(`${window.origin}/track/edit-comment`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(postdata),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
           }) .then (response => console.log(response.json()))
        
    
        document.querySelector('.new-comment-dialog-modal').style.display = 'none';
        alert('comment Edited.');
        location.reload()




    }


}


// close new comment dialog via cross
document.getElementById('close_btn_nc_modal').addEventListener('click',
function() {
    document.querySelector('.new-comment-dialog-modal').style.display = 'none';
	
});


function projectEditMenu(){
    var menu = document.querySelector('.edit-project-menu');
	var menuToggle = menu.getAttribute('menu');
	if (menuToggle == 'closed'){
		var mi = document.querySelectorAll('.edit-project-menu-item');
		// menu.style.display = 'flex';
		menu.style.height = 'auto';
		menu.style.opacity = '1';
		menu.setAttribute('menu','open');
		mi.forEach(m => {
			m.style.pointerEvents = 'auto';
			
		});

		 
	}else{
		var mi = document.querySelectorAll('.edit-project-menu-item');
		// menu.style.display = 'none';
		menu.style.height = '0';
		menu.style.opacity = '0';
		menu.setAttribute('menu','closed');
		mi.forEach(m => {
			m.style.pointerEvents = 'none';
			
		});
	}

}


// new layer modal

function NewLayerModal(elem){
    document.querySelector('.section-layer-dialog-modal').style.display = 'flex';
    document.querySelector('.section-layer-dialog-modal').style.opacity = '1';
    const e = elem.getAttribute('kind');
    if (e =='create'){
        document.getElementById('sectionLayer').setAttribute('kind','create');
        const n = document.getElementById('lc-name');
        const name = n.innerHTML;
        document.getElementById('layer-sectionname').innerHTML = name;
        var sid = n.getAttribute('tsid');
        document.getElementById('layer-sectionname').setAttribute('sectionid',sid);
        document.getElementById('sl-title').innerHTML = 'New Layer Type';
        document.querySelector('.createupdatelayerbtn').innerHTML = 'Create Layer';
        document.getElementById('vnum').value = '';
        document.getElementById('layertype').innerHTML = 'Background';
        document.getElementById('exttype').innerHTML = '.Mov';


    } else{
        console.log('update layer');
        document.getElementById('sectionLayer').setAttribute('kind','update');
        const n = document.getElementById('lc-name');
        const name = n.innerHTML;
        document.getElementById('layer-sectionname').innerHTML = name;
        var lid =elem.parentElement.parentElement.getAttribute('layerid');
        document.querySelector('.createupdatelayerbtn').innerHTML = 'Update Layer';
        
        document.getElementById('layer-sectionname').setAttribute('layerid',lid);
        document.getElementById('sl-title').innerHTML = 'Update Layer';
        const ltype = elem.parentElement.childNodes[1].innerHTML;
        const lext =  elem.parentElement.childNodes[3].innerHTML;
        const lalpha = elem.parentElement.childNodes[5].innerHTML;
        const lversion = elem.parentElement.childNodes[8].innerHTML;
        document.getElementById('layertype').innerHTML = ltype;
        document.getElementById('exttype').innerHTML = lext;
        document.getElementById('vnum').value = lversion;

    }

    
}


function openLayerDropdown(){
    const chev = document.querySelector('.ldropdown-chevron');
    const lts = document.querySelector('.layer-selections');
    if (chev.getAttribute('menu') === 'closed'){
        const lt = document.querySelectorAll('.layer-type');
        lt.forEach(l => {
            l.style.pointerEvents = 'auto';
            
        });
        chev.style.transform = 'rotate(180deg)';
        chev.setAttribute('menu','open');
        lts.style.opacity = '1';
        lts.style.height = 'auto';
    }else{
        const lt = document.querySelectorAll('.layer-type');
        lts.style.opacity = '0';
        lts.style.height = '0';
        lt.forEach(l => {
            l.style.pointerEvents = 'none';
            
        });
        chev.style.transform = 'rotate(0deg)';
        chev.setAttribute('menu','closed');
    }



}

function openExtDropdown(){
    const chev = document.querySelector('.extdropdown-chevron');
    const lts = document.querySelector('.ext-selections');
    if (chev.getAttribute('menu') === 'closed'){
        const lt = document.querySelectorAll('.ext-type');
        lt.forEach(l => {
            l.style.pointerEvents = 'auto';
            
        });
        chev.style.transform = 'rotate(180deg)';
        chev.setAttribute('menu','open');
        lts.style.opacity = '1';
        lts.style.height = 'auto';
    }else{
        const lt = document.querySelectorAll('.ext-type');
        lts.style.opacity = '0';
        lts.style.height = '0';
        lt.forEach(l => {
            l.style.pointerEvents = 'none';
            
        });
        chev.style.transform = 'rotate(0deg)';
        chev.setAttribute('menu','closed');
    }



}

// create section layer

function createSectionLayer(){
    //get version number
    const vnum = document.getElementById('vnum');
    var vvalue = vnum.value;
    //get alpha checkbox
    const alpha = document.getElementById('alpha');
    var avalue = alpha.checked;
    //get layer type
    const sl = document.getElementById('layertype');
    var slvalue = sl.innerHTML;

    const extvalue = document.getElementById('exttype').innerHTML;


    //getsectionid
    var sid = document.getElementById('layer-sectionname').getAttribute('sectionid');
    var lid = document.getElementById('layer-sectionname').getAttribute('layerid');



    const sld = document.getElementById('sectionLayer').getAttribute('kind');
    console.log(sld);
    

    if ( sld === 'create'){
        var entry = {
            'sectionid': sid,
            'layer': slvalue,
            'version': vvalue,
            'extension':extvalue,
            'alpha': avalue,
        }
        fetch(`${window.origin}/track/new-layer`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(entry),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
           })
    
        alert('track Created!');
        location.reload();


    } else{
        var entry = {
            'layerid': lid,
            'layer': slvalue,
            'version': vvalue,
            'extension':extvalue,
            'alpha': avalue,
        }
        fetch(`${window.origin}/track/update-layer`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(entry),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
           })
    
        alert('track updated!');
        location.reload();
    }

    console.log(entry); 

}

// set layer type

function layerType(elem){
    const lts = document.querySelector('.layer-selections');
    var lt = elem.innerHTML;
    var sl = document.getElementById('layertype');
    sl.innerHTML = lt;
    document.querySelector('.ldropdown-chevron').style.transform = 'rotate(0deg)';
    const ltypes = document.querySelectorAll('.layer-type');
        lts.style.opacity = '0';
        lts.style.height = '0';
        ltypes.forEach(l => {
            l.style.pointerEvents = 'none';
            
        });

    


}

function ExtType(elem){
    const lts = document.querySelector('.ext-selections');
    var lt = elem.innerHTML;
    var sl = document.getElementById('exttype');
    sl.innerHTML = lt;
    document.querySelector('.extdropdown-chevron').style.transform = 'rotate(0deg)';
    const ltypes = document.querySelectorAll('.ext-type');
        lts.style.opacity = '0';
        lts.style.height = '0';
        ltypes.forEach(l => {
            l.style.pointerEvents = 'none';
            
        });

    


}

// close new track layer modal // 
function closeSL() {
    document.querySelector('.section-layer-dialog-modal').style.display = 'none';
	document.querySelector('.section-layer-dialog-modal').style.opacity = '0';
}


function PendingReview(){
    const pr = document.querySelector('.pr-box');
    const p = pr.getAttribute('pending');
    const tid = document.getElementById('trackid');
    const trackid = tid.getAttribute('trackid');
    const tname = tid.innerHTML;
    
    if (p === 'false'){
        prc = document.querySelector('.pr-circle');
        pr.style.background = '#F61067';
        prc.style.transform = 'translateX(30px)';
        pr.setAttribute('pending','true');

        entry = {
            'trackid':trackid,
            'trackname':tname,
            'pr':'true'
        }

        fetch(`${window.origin}/track/review-pending`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(entry),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
        })

    }else{
        prc = document.querySelector('.pr-circle');
        prc.style.transform = 'translateX(0)';
        pr.style.background = 'grey';
        pr.setAttribute('pending','false');

        entry = {
            'trackid':trackid,
            'trackname':tname,
            'pr':'false'
        }

        fetch(`${window.origin}/track/review-pending`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(entry),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
        })

    }
    
}

function DeleteModal(elem){
    const k = elem.getAttribute('kind');
    document.querySelector('.delete_dialog_modal').style.display = 'flex';
    const dtitle = document.querySelector('.delete_title');
    const dkind = document.getElementById('dkind');
    const msg = document.querySelector('.delete_msg');
    if (k =='trackd'){
        const p = elem.parentElement.parentElement.parentElement;
        const aid = p.getAttribute('artistid');
        const tname = p.childNodes[1].childNodes[1].outerText;
        const tid = p.childNodes[1].childNodes[1].getAttribute('trackid');
        
        dtitle.innerHTML = 'Delete Track';
        dkind.setAttribute('kind','trackd');
        dkind.innerHTML = tname;
        dkind.setAttribute('tid',tid);
        dkind.setAttribute('aid',aid);
        msg.innerHTML = 'Do you wish to delete this track and all its elements?';


    } else if (k ==='section'){
        const p = elem.parentElement.parentElement;
        const tsid = p.getAttribute('tracksecid');
        const tsname = p.childNodes[1].outerText;
        console.log(tsname);
        dkind.innerHTML = tsname;
        dkind.setAttribute('tsid',tsid);
        dtitle.innerHTML = 'Delete Section';
        dkind.setAttribute('kind','section');
        msg.innerHTML = 'Do you wish to delete this section and all its elements?';

    } else if(k ==='layer'){
        const p = elem.parentElement.parentElement;
        const lid = p.getAttribute('layerid');
        const lname = p.childNodes[0].childNodes[1].outerText;
        dkind.innerHTML = lname;
        dkind.setAttribute('lid',lid)
        dtitle.innerHTML = 'Delete Layer';
        dkind.setAttribute('kind','layer');
        msg.innerHTML = 'Do you wish to delete this layer?';


    }else if(k=='comment'){
        const p = elem.parentElement;
        const cid = p.getAttribute('commentid');

        dtitle.innerHTML = 'Delete Comment';
        dkind.setAttribute('kind','comment');
        dkind.setAttribute('cid',cid);
        msg.innerHTML = 'Do you wish to delete this Comment?';
        
    }else if (k=='trackpd'){
        const p = elem.parentElement.parentElement;
        const tid = p.getAttribute('trackid');
        const aid = document.getElementById('artistid').getAttribute('artistid');
        const tname = elem.parentElement.childNodes[1].outerText;
        console.log(tname);
        
        dkind.innerHTML = tname;
        dkind.setAttribute('tid',tid)
        dkind.setAttribute('aid',aid)
        dtitle.innerHTML = 'Delete Track';
        dkind.setAttribute('kind','trackd');
        msg.innerHTML = 'Do you wish to delete this track and all its elements?';


    } else if (k=='projectp'){
        const p = elem.parentElement.parentElement;
        const aid = p.getAttribute('artistid');
        const aname = p.childNodes[3].childNodes[1].outerText;
        const tname = p.childNodes[5].outerText;
        console.log(tname);

        dkind.innerHTML = aname + ' - ' + tname;
        dkind.setAttribute('aid',aid)
        dtitle.innerHTML = 'Delete Project';
        dkind.setAttribute('kind','Project');
        msg.innerHTML = 'Do you wish to delete this Project and all its elements?';
        
        
        
    }
    
    
    else{

        const p = elem.parentElement.parentElement.parentElement;
        const aid = p.getAttribute('artistid');
        const aname = p.childNodes[1].childNodes[1].outerText;
        const tname = p.childNodes[1].childNodes[3].outerText;
        console.log(aname);
        console.log(tname);
        dkind.innerHTML = aname + ' - ' + tname;
        dkind.setAttribute('aid',aid)
        dtitle.innerHTML = 'Delete Project';
        dkind.setAttribute('kind','Project');
        msg.innerHTML = 'Do you wish to delete this Project and all its elements?';
        
    }
    
}

function DeleteElements(){
    const kind = document.getElementById('dkind');
    const k = kind.getAttribute('kind');
    if (k ==='trackd'){
        const aid = kind.getAttribute('aid');
        const tid = kind.getAttribute('tid');
        const tname =  kind.innerHTML;
         
        var entry = {
            'aid':aid,
            'tid':tid,
            'trackname':tname,
        }

        fetch(`${window.origin}/track/trackdeleted`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify(entry),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
        })
        alert('delete track');
        document.location = window.origin + '/dashboard/?artistid=' + aid;

        //close modal

    }else if (k==='section'){
        const tsid = kind.getAttribute('tsid');
        const tid = kind.getAttribute('tid');
        const tsname =  kind.innerHTML;

        var entry = {
            'tsid':tsid,
            'tid':tid,
            'tsname':tsname,
        }

        fetch(`${window.origin}/track/delete-track-section`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify(entry),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
        })

        alert('delete section')
        location.reload()


    }else if(k ==='layer'){
        const tsid = kind.getAttribute('tsid');
        const lid = kind.getAttribute('lid');
        const lname =  kind.innerHTML;

        var entry = {
            'tsid':tsid,
            'lid':lid,
            'lname':lname,
        }

        fetch(`${window.origin}/track/delete-layer`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify(entry),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
        })

        alert('delete layer')
        location.reload()


    }else if (k ==='comment'){

        const tsid = kind.getAttribute('tsid');
        const cid = kind.getAttribute('cid');

        var entry = {
            'tsid':tsid,
            'cid':cid,
        }

        fetch(`${window.origin}/track/delete-comment`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify(entry),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
        })


        alert('delete comment')
        location.reload()

    }else {
        const aid = kind.getAttribute('aid');
        const t = kind.innerHTML.split('-');
        const aname = t[0];
        const tname = t[1];

        var entry = {
            'aid':aid,
            'artist':aname,
            'tour':tname
        }

        fetch(`${window.origin}/projectdeleted`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify(entry),
            cache: "no-cache",
                headers: new Headers({
                  "content-type": "application/json"
            })
        })

        alert('project deleted');
        document.location = window.origin + '/projects';
        
    }
}

function closeDelSecModal(){
	document.querySelector('.delete_dialog_modal').style.display = 'none';
}



// open Edit Project modal

function EditProjectModal(){

    var months = {
        'January' : '01',
        'February' : '02',
        'March' : '03',
        'April' : '04',
        'May' : '05',
        'June' : '06',
        'July' : '07',
        'August' : '08',
        'September' : '09',
        'October' : '10',
        'November' : '11',
        'December' : '12'
    }
    document.querySelector('.edit-project-dialog-modal').style.display = 'flex';
    document.querySelector('.edit-project-dialog-modal').style.opacity = '1';

    //inputs
    const ainput = document.getElementById('ainput');
    const tinput = document.getElementById('tinput');
    const dinput = document.getElementById('Deadline');
    const rwidth = document.getElementById('Width');
    const rheight = document.getElementById('height');
    const finput = document.getElementById('Framerate');

    //artist info

    const aid =document.getElementById('artistid').getAttribute('artistid');
    const aname=document.getElementById('atitle').innerHTML;
    const tname=document.getElementById('ttitle').innerHTML;
    const dline=document.getElementById('dline').innerHTML.split(' ');
    const res = document.getElementById('res').innerHTML.split('x');
    const framrate = document.getElementById('framerate').innerHTML;

    //input info
    const m = months[dline[1]];
    const y = dline[2];
    const d =  dline[0];

    var dline_build = y + '-' + m + '-' + d;
    console.log(dline_build);

    ainput.value = aname;
    tinput.value = tname;
    finput.value = framrate;
    rwidth.value = res[0];
    rheight.value =res[1];
    dinput.setAttribute('value',dline_build);

}

// close EditProject modal // 
function CEPM() {
    document.querySelector('.edit-project-dialog-modal').style.display = 'none';
	document.querySelector('.edit-project-dialog-modal').style.opacity = '0';
}


function SubmitProjectEdits(){


    const aid = document.getElementById('ep-ttitle').getAttribute('epid');
    const aname = document.getElementById('ainput').value;
    const tname = document.getElementById('tinput').value;
    const deadline = document.getElementById('Deadline').value;
    const rw = document.getElementById('Width').value;
    const rh = document.getElementById('height').value;
    const frame = document.getElementById('Framerate').value;

    var entry = {
        'aid':aid,
        'artist':aname,
        'tour':tname,
        'deadline':deadline,
        'rwidth': rw,
        'rheight': rh,
        'framerate':frame,
    }

    fetch(`${window.origin}/edit-project`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(entry),
        cache: "no-cache",
            headers: new Headers({
              "content-type": "application/json"
        })
    })

    alert('project updated');
    location.reload();
}



function closeUCPModal(){
    document.querySelector('.upload-cover-photo-modal').style.display = 'none';
    document.querySelector('.upload-cover-photo-modal').style.opacity = '0';
    document.querySelector('.cr-image').setAttribute('src','');
}

function CoverPhotoModal(){
    document.querySelector('.upload-cover-photo-modal').style.display = 'flex';
    document.querySelector('.upload-cover-photo-modal').style.opacity = '1';

}