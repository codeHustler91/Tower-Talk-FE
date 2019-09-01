const Lis = document.querySelectorAll('li')
const curriculum = document.querySelector('#curriculum')

Array.from(Lis).map(li => li.addEventListener('click', event => {
    curriculum.innerText = event.target.innerText
    }))