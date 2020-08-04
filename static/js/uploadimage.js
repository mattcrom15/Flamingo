//cover photo modal
function createCoverPhoto(){
    document.querySelector('.edit-track-menu').style.display = 'none';

	document.querySelector('.upload-cover-photo-modal').style.display = 'flex';
	document.querySelector('.upload-cover-photo-modal').style.opacity = '1';


}

function uploadImage(){
	event.preventDefault();
	const myform = document.getElementById('myform');
	const img = document.getElementById('image');
	const tname = document.getElementById('tracktitle');
	const tid = document.getElementById('trackid').getAttribute('trackid');
	console.log(tid)
	


	const formData = new FormData();
	formData.append("image", img.files[0]);


	formData.append("trackid",tid);
	formData.append("trackname",tname.innerHTML);
	console.log(formData.entries());

	fetch(`${window.origin}/track/upload-image`, {
		method: "POST",
    	body: formData
    	
	})

    .then(response => (response.json()))
    
    alert('Image successfully uploaded');
    location.reload()

	   
	document.querySelector('.upload-cover-photo-modal').style.display = 'none';
	document.querySelector('.upload-cover-photo-modal').style.opacity = '0';
	
	
}




// closes upload cover photo modal // 
document.getElementById('close_btn_ucp_modal').addEventListener('click',
function() {
    document.querySelector('.upload-cover-photo-modal').style.display = 'none';
	document.querySelector('.upload-cover-photo-modal').style.opacity = '0';
});