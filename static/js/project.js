function CreateProject(){

    const aname = document.getElementById('artist-name').value;
    const tname = document.getElementById('tour-name').value;


    var cp ={
        'artist':aname,
        'tour': tname,
    }

    fetch(`${window.origin}/projectcreated`, {
    	method: "POST",
    	credentials: "include",
    	body: JSON.stringify(cp),
    	cache: "no-cache",
   	 	headers: new Headers({
      		"content-type": "application/json"
    	})
   	})

    alert('project created');

    location.reload();

}