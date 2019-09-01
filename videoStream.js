// get video/voice stream
navigator.getUserMedia({ video: true, audio: true }, gotMedia, () => {})

function gotMedia (stream) {
    console.log('video', stream)
  var peer1 = new SimplePeer({ initiator: true, stream: stream })
  var peer2 = new SimplePeer({ stream: stream})

  peer1.on('signal', data => {
    peer2.signal(data)
  })

  peer2.on('signal', data => {
    peer1.signal(data)
  })

  peer2.on('stream', stream => {
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector('video')

    if ('srcObject' in video) {
      video.srcObject = stream
    } else {
      video.src = window.URL.createObjectURL(stream) // for older browsers
    }

    video.play()
  })
}