// const mediaSelect = document.querySelector('#media-select')
let media = {
  video: true,
  audio: true
}

// mediaSelect.addEventListener('change', (event) => {
//   const chosen = event.target.value
//   if (chosen === 'Video & Audio') {
//     console.log('AV')
//     media.video = true;
//     media.audio = true;
//   } else if (chosen === 'Video Only') {
//     console.log('Video only')
//     media.video = true;
//     media.audio = false;
//   } else if (chosen === 'Audio Only') {
//     console.log('Audio')
//     media.video = false;
//     media.audio = true;
//   } else { 
//     console.log('else')
//     media.video = false;
//     media.audio = false;
//   }
// })
navigator.getUserMedia(media, function (stream) {
  console.log('video', stream)
  let peer = new SimplePeer({ 
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })
  // let peer2 = new SimplePeer({ stream: stream})

  peer.on('signal', data => {
    document.querySelector('#yourId').value = JSON.stringify(data)
  })

  document.querySelector('#connect').addEventListener('click', () => {
    let otherId = JSON.parse(document.querySelector('#otherId').value)
    peer.signal(otherId)
  })
  peer.on('stream', function(stream){
    let video = document.querySelector('video')

    if ('srcObject' in video) {
      video.srcObject = stream
    } else {
      video.src = window.URL.createObjectURL(stream) // for older browsers
    }
    video.play()
  })
}, function (err) {
  console.error(err)
})
