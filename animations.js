// header
TweenLite.from('#user-log', 5, { opacity: 0 })
TweenLite.from('#logo', 5, { x:'90vw' })

// video 
TweenLite.fromTo('video', 2.5, {
    borderRadius: '75%', 
    scale: 0,
    delay: 0.5
}, {
    borderRadius: '0.5rem', 
    scale: 1,
    delay: 0.5
    
})

// li
TweenMax.staggerFrom('li', 0.65, { opacity:0, x:'-25vw', y:'50vh', rotation: 90, delay:3 }, 0.2)

// form
TweenMax.staggerFrom('form', 0.65, { opacity:0, x:'25vw', y:'50vh', rotation: -90, delay:4.5 }, 0.5)
