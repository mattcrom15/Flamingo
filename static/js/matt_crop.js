

const i = document.getElementById('imagefile');


i.addEventListener("change", function(){
    const file = this.files[0];
    if (file){
        const reader = new FileReader();
        const btnExist = document.getElementById('ucp-btn');
        if (btnExist){
            btnExist.remove();
            document.querySelector('.croppy-container').remove();
            const c = document.createElement('div');
            c.setAttribute('class','croppie-container');
            c.setAttribute('id','cbox');
            document.getElementById('ucp').appendChild(c);


        }else{
            //pass
        }
        document.getElementById('ucp').style.height = '500px';

        const btn = document.createElement('button');
        btn.setAttribute('class','create_track_btn');
        btn.setAttribute('type','submit');
        btn.setAttribute('id','ucp-btn');
        //btn.setAttribute('onclick','uploadImage();');
        btn.innerHTML = 'Submit'
        imgres = ''
        reader.addEventListener("load", function(){
             imgres  = this.result;
             vanilla.bind({
                url: imgres
    
            });
        });

        var el = document.getElementById('cbox');
            var vanilla = new Croppie(el, {
                viewport: { width: 247, height: 203 },
                boundary: { width: 300, height: 300 }


            });

        

        reader.readAsDataURL(file);
        document.getElementById('ucp').appendChild(btn);

        const sbtn = document.getElementById('ucp-btn');

        sbtn.addEventListener('click', function(){

            const img64 = vanilla.result({type: "base64"})
            .then(response =>{
                const formData = new FormData();
                const tid = document.getElementById('trackid').getAttribute('trackid');
                const trackname = document.getElementById('trackid').innerHTML;
                formData.append('trackid',tid);
                formData.append('trackname',trackname);
                formData.append('image',response);
                fetch(`${window.origin}/track/upload-image`, {
                    method: "POST",
                    body: formData
                    
                }).then(res =>{
                    res.json();
                    alert('image Successfully uploaded');
                    location.reload();
                });
            })

        });

    }else{
        //pass
    }

});



