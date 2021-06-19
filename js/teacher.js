var name
var room
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stream;
var p
var camtoggle = false
var videodiv = document.getElementById("video-div")
var messagediv = document.getElementById("message-div")
var today = new Date()
var conn_list = []
var config_2 = {
	host: 'peerjs.92k.de',
	port: 443,
	config: {'iceServers': [
			{ url: 'stun:stun.l.google.com:19302' },
			{ url: 'stun:stun1.l.google.com:19302' },
			{ url: 'stun:stun2.l.google.com:19302' },
			{ url: 'stun:stun3.l.google.com:19302' },
			{ url: 'stun:stun4.l.google.com:19302' },
			{
			    url: 'turn:numb.viagenie.ca',
			    credential: 'muazkh',
			    username: 'webrtc@live.com'
			}
		]
	},
	debug: 3
}

window.addEventListener('load',()=>{
	name = window.location.search.split('&')[0].slice(6)
	room = window.location.search.split('&')[1].slice(5)

		p = new Peer(room,config_2)
		 p.on('open',(id)=>{
		 	console.log('a peer connected with id ->',id)
		 	getUserMedia({video: true, audio: true},(stream)=>{
		 		local_stream = stream
		 		setStream(stream,name)
		 		camtoggle = true
		 	},(err)=>{
		 		console.log('error occured')
		 	})

		 	p.on('connection',(conn)=>{
		 		conn_list.push(conn.peer)
		 		conn.on('data',(data)=>{
		 			console.log(data)
		 			setMessage(conn.peer,data)
		 		})
			})
		 })
		 p.on('call',(call)=>{
		 	setMessage(call.peer,"Opened Cam")
		 	call.answer(local_stream)
		 	call.on('stream',(stream)=>{
		 		setStream(stream,call.peer)
		 	})

		 	// call.on('close',()=>{
		 	// 	setMessage(call.peer,"Left")
		 	// })
		 	// call.on('error',()=>{
		 	// 	setMessage(call.peer,"Left")
		 	// })

		 })

})


function setStream(stream,id){
	if(document.getElementById(id)){
		var video = document.getElementById(id)
		video.srcObject = stream
		video.play()
	}
	else{
		var container = document.createElement("div")
		var video = document.createElement("video")
		var label = document.createElement("label")
		label.textContent = id
		video.srcObject = stream
		video.play()
		video.setAttribute("id",id)
		container.setAttribute("class","video-container")
		container.appendChild(video)
		container.appendChild(label)
		videodiv.appendChild(container)
	}
}


function setMessage(id,message){
	var h = today.getHours()
	var m = today.getMinutes()
	var msg = document.createElement('div')
	var p = document.createElement("p")
	var l = document.createElement("label")
	p.textContent = id + " " + message
	l.textContent = h+":"+m
	msg.setAttribute("class","message")
	msg.appendChild(p)
	msg.appendChild(l)
	messagediv.appendChild(msg)

}


function generateAttend(){
	console.log(conn_list)
	for(var i=0;i<conn_list.length;i++){
		var conn = p.connect(conn_list[i])

	}
}
function Export2Word(element, filename = 'report'){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(element).innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename?filename+'.doc':'document.doc';

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}
function videoicontoggle(){
    if(camtoggle){
        var videobtnfont = document.getElementById("videobtn-font")
        videobtnfont.setAttribute("class","fas fa-video-slash")
    }
    else{
        var videobtnfont = document.getElementById("videobtn-font")
        videobtnfont.setAttribute("class","fas fa-video")
    }
}
