// header
TweenLite.from('#user-log', 0.5, { x:-450})
TweenLite.from('#logo', 0.5, { x:450})

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
TweenMax.staggerFrom('li', 0.65, { opacity:0, x:-300, y:150, delay:3 }, 0.2)

// form
TweenMax.staggerFrom('form', 0.65, { opacity:0, x:300, y:150, delay:4.5 }, 0.5)
