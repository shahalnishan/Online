var name
var room
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stream;
var p
var conn
var camtoggle = false


window.addEventListener('load',()=>{
	name = window.location.search.split('&')[0].slice(6)
	room = window.location.search.split('&')[1].slice(5)
	p = new Peer(name)
	p.on('open', (id)=>{
        console.log("Connected with Id: "+id)
        conn = p.connect(room)
        getUserMedia({video: true, audio: true}, (stream)=>{
            local_stream = stream;
            camtoggle = true
			// showvideobtndiv()
            let call = p.call(room, stream)
            call.on('stream', (stream)=>{
                setStream(stream,room);
            })
        }, (err)=>{
            console.log(err)
        })

        p.on('connection',function(remoteconn){
            console.log("received")
            var zero=0;
            for(var i =0;i<a.length;i++){
                if(a[i]==0){
                    zero++;
                }
            }
            if(zero>1){
                conn.send("Not Attending")
            }
            else{
                conn.send("Attending")
            }
        })

    })


})


window.addEventListener('blur',()=>{
    conn.send('Changed program')
})

function setStream(stream,id){
	var video = document.getElementById("rvideo")
	video.srcObject = stream
	video.muted = true
	video.play()
}


function videotoggle(){
    if(camtoggle){
        videoicontoggle()
        conn.send('Closed Cam')
        camtoggle = false
        var tracks = local_stream.getTracks()
        tracks[0].stop()
    }
    else{
            videoicontoggle()
            camtoggle = true
            getUserMedia({video: true, audio: false}, (stream)=>{
                local_stream = stream;
                let call = p.call(room,stream)
                call.on('stream', (stream)=>{
                    setStream(stream,room);
                })
            }, (err)=>{
                console.log(err)
            })

    }
}


function videoicontoggle(){
    if(camtoggle){
        var videobtnfont = document.getElementById("videobtn-font")
        videobtnfont.setAttribute("class","fas fa-video")
    }
    else{
        var videobtnfont = document.getElementById("videobtn-font")
        videobtnfont.setAttribute("class","fas fa-video-slash")
    }
}
