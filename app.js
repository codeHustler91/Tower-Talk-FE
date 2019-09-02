let Lis = document.querySelectorAll('li')
const $curriculum = document.querySelector('#curriculum')
const instructorSelect = document.querySelector('#instructor-select')
const instructor = document.querySelector('#instructor-name')
const curriculumButton = document.querySelector('#curriculum-button')
const $curriculumList = document.querySelector('.curriculum-list')
const $materials = document.querySelector('.materials')

Array.from(Lis).map(li => li.addEventListener('click', event => {
    $curriculum.innerText = event.target.innerText
}))

instructorSelect.addEventListener('change', (event)=> {
    instructor.innerText = `Instructor's Name: ${event.target.value}`
})

const curriculum = [
    'Basic English Elocution',
    'Airport Terminology',
    'Aircraft Terminology',
    'Pilot Terminology',
    'Weather Terminology',
    'VFR Terminology',
    'IFR Terminology',
    'Sample Test'
]

curriculumButton.addEventListener('click', (event) => {
    if (curriculumButton.innerText === 'Hide Curriculum') {
        console.log('hit hide curriculum')
        curriculumButton.innerText = 'Show Curriculum'
        while ($curriculumList.firstChild) {
            $curriculumList.removeChild($curriculumList.firstChild)
        }
    } else {
        curriculumButton.innerText = 'Hide Curriculum'
        curriculum.map(module => {
            const ul = document.querySelector('.curriculum-list')
            const li = document.createElement('li')
            li.className = 'new-item'
            li.innerText = module
            ul.appendChild(li)
        })
        // TweenLite.to('.materials', 0.4, { expand_content, opacity:0, x:'-10vw', y:'50vh', rotation: 90 }, 0.1)
        TweenMax.staggerFrom('li', 0.4, { opacity:0, x:'-10vw', y:'50vh', rotation: 90 }, 0.1)
    }
})