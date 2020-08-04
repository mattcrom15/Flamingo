
function openTrackSettings(){
	document.querySelector('.edit_track_modal').style.display = 'flex';
	document.querySelector('.edit_track_modal').style.opacity = '1';

	
	
}

document.getElementById('close_etd_btn').addEventListener('click',
function() {
    document.querySelector('.edit_track_modal').style.display = 'none';
	document.querySelector('.edit_track_modal').style.opacity = '0';
});

