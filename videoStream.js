const mediaSelect = document.querySelector('#media-select')
let media = {
  video: false,
  audio: false
}

mediaSelect.addEventListener('change', (event) => {
  const chosen = event.target.value
  if (chosen === 'Video & Audio') {
    console.log('AV')
    media.video = true;
    media.audio = true;
  } else if (chosen === 'Video Only') {
    console.log('Video only')
    media.video = true;
    media.audio = false;
  } else if (chosen === 'Audio Only') {
    console.log('Audio')
    media.video = false;
    media.audio = true;
  } else { 
    console.log('else')
    media.video = false;
    media.audio = false;
  }
  navigator.getUserMedia(media, gotMedia, () => {})
}
)

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
    var video = document.querySelector('video')

    if ('srcObject' in video) {
      video.srcObject = stream
    } else {
      console.log('older browser?')
      // video.src = window.URL.createObjectURL(stream) // for older browsers
    }

    video.play()
  })
}