// ON STARTUP
// header
TweenLite.from('#user-log', 5, { opacity: 0, backgroundColor: 'white'})
TweenLite.from('#logo', 5, { x:'90vw' })

// video 
TweenLite.fromTo('video', 2.5, {
    borderRadius: '75%', 
    scale: 0,
    // delay: 0.5
}, {
    borderRadius: '0.5rem', 
    scale: 1,
    // delay: 0.5
    
})

// li
TweenMax.staggerFrom('li', 0.5, { opacity:0, x:'-10vw', y:'50vh', rotation: 90, delay:2.5 }, 0.2)

// form
TweenMax.staggerFrom('form', 0.5, { opacity:0, x:'20vw', y:'50vh', rotation: -90, delay:4 }, 0.3)

// EVENT LISTENERS
const logo = document.querySelector('#logo')

logo.addEventListener('click', (event) => {
    TweenLite.to('#logo', 2.5, { 
        backgroundColor: 'white',
        borderRadius: '0.35rem', 
        boxShadow: '0 0 7px 7px #007da3 inset, 0 0 10px 10px white'
    })
})
