// definitions
const $curriculum = document.querySelector('#curriculum')
const curriculumButton = document.querySelector('#curriculum-button')
const $curriculumList = document.querySelector('.curriculum-list')
const $materials = document.querySelector('.materials')
const $instructorView = document.querySelector('#instructor-view')
const $loginMain = document.querySelector('#login-main')
const signInButton = document.querySelector('#sign-in')
const registerButton = document.querySelector('#register')
const instructorCheck = document.querySelector('#instructor-check')
const name = document.querySelector('#name')

// const rootURL = 'http://localhost:5000/'
const rootURL = 'https://tower-talk-database.herokuapp.com/'

// Redux 
// const { combineReducers, createStore } = Redux
const { createStore } = Redux

// Reducers
const materialsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SUCCESS':
            return action.materials
        default:
            return state
    }
}
const noteReducer = (state='', action) => {
    switch (action.type) {
        case 'CHANGE':
            console.log('text change', action.note)
            return action.note
        default:
            return state
    }
}

// const rootReducer = combineReducers({ materials: materialsReducer, note: noteReducer })
const store = createStore( materialsReducer )

// actions
const materialsActionCreator = (materials) => {
    return store.dispatch( {
        type: 'SUCCESS',
        materials: materials
    })
}
// const noteActionCreator = (note) => {
//     return store.dispatch( {
//         type: 'CHANGE',
//         note
//     })
// }

// router (runs functions based on window.location)
document.addEventListener('DOMContentLoaded', (event) => {
    let currentLocation = window.location.href
    if (currentLocation.includes('student-view')) {
        console.log('student view')
        displayStudentView()
    } else if (currentLocation.includes('instructor-view')) {
        console.log('instructor view')
        displayInstructorView()
    } else {
        console.log('default')
        addEventRegister()
        addEventSignIn()
    }
})

// event listeners
// studentNote.addEventListener('change', (event) => {
//     noteActionCreator(event.target.value)
// })

// THE WORKSHOP

function saveToLocal(user) {
    const profile = JSON.stringify(user)
    console.log('savetoLocal', profile)
    sessionStorage.setItem('profile', profile)
}
function getFromLocal(targetString) {
    const rawData = sessionStorage.getItem(targetString)
    const profile = JSON.parse(rawData)
    return profile
}

function displayStudentView() {
    const student = getFromLocal('profile')
    console.log('display student!', student)
    name.innerText = `Welcome ${student.name.toUpperCase()}`
    const roomSelect = document.querySelector('#room-select')
    loadMaterials()
    addEventCurriculumButton()
}
function displayInstructorView() {
    const instructor = getFromLocal('profile')
    console.log('display instructor!', instructor)
    name.innerText = `Welcome ${instructor.name.toUpperCase()}`
    const studentSelect = document.querySelector('#student-select')
    const student = document.querySelector('#student-name')
    const noteName = document.querySelector('#student-note')
    loadMaterials()
    addEventCurriculumButton()
}

// helper functions 

// fetch calls
function createUser(user, route) {
    fetch(rootURL + route, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
        // .then(response => send)
}
function loadMaterials() {
    materialURL = rootURL + 'materials'
    fetch(materialURL)
        .then(response => response.json())
        .then(materialsActionCreator)
        .then(showMaterials)
}
function fetchUser(user, isInstructor) {
    let route = ''
    isInstructor ? route = 'instructor' : route = 'student'
    fetch(rootURL + route + '/' + user.email)
        .then(response => response.json())
        .then(profile => linkToMain(profile[0], route))
}

// student-instructor views
function addEventCurriculumButton(){
    curriculumButton.addEventListener('click', (event) => {
        if (curriculumButton.innerText === 'Hide Curriculum') {
            curriculumButton.innerText = 'Show Curriculum'
            while ($curriculumList.firstChild) {
                $curriculumList.removeChild($curriculumList.firstChild)
            }
        } else {
            curriculumButton.innerText = 'Hide Curriculum'
            showMaterials()
        }
    })
}

function showMaterials() {
    const ul = document.querySelector('.curriculum-list')
    return store.getState().map(material => {
        const li = document.createElement('li')
        li.className = 'material'
        li.innerText = material.title
        li.addEventListener('click', event => {
            $curriculum.innerText = material.title + material.content})
            ul.appendChild(li)
    // fly-in animation
    }).then(TweenMax.staggerFrom('li', 0.4, 
            {   opacity:0, 
                x:'-10vw', 
                y:'50vh', 
                rotation: 90 }, 0.1))
}

// login forms
function linkToMain(user, route) {
    saveToLocal(user)
    console.log('got to main', user, route)
    window.location.href = `./${route}-view.html`
}
function conditionalRegister(formState) {
    if (instructorCheck.checked === true) {
        console.log('instructor', instructorCheck.checked)
        Object.assign(formState, {feedback: ''})
        const userResponse = createUser(formState, 'instructors')
        console.log(userResponse)
        linkToMain(formState, 'instructor')
    } else {
        console.log('student', instructorCheck.checked)
        //tell node to give default values for instructor notes and level
        Object.assign(formState, {instructor_notes: '', level: 0})
        const userResponse = createUser(formState, 'students')
        console.log(userResponse)
        linkToMain(formState, 'student')
    }
}
// login page
// register form
function addEventRegister() {
    registerButton.addEventListener('click', (event) => {
        if (registerButton.innerText === 'Register') {
            const formState = {}
            const registerForm = document.createElement('form')
            registerForm.addEventListener('change', (event) => {
                Object.assign(formState, {[event.target.name]: event.target.value})
            })
    
            nameInput = createNameInput()
            passwordInput = createPasswordInput()
            emailInput = createEmailInput()
            phoneInput = createPhoneInput()
            submit = createSubmit('Create User')
    
            submit.addEventListener('click', (event) => {
                event.preventDefault()
                conditionalRegister(formState)
            })
    
            registerForm.append(
                nameInput.nameLabel, nameInput.nameField, 
                passwordInput.passwordLabel, passwordInput.passwordField, 
                emailInput.emailLabel, emailInput.emailField, 
                phoneInput.phoneLabel, phoneInput.phoneField,
                submit
            )
            $loginMain.appendChild(registerForm)
            registerButton.innerText = 'Hide Form'
        } else {
            $loginMain.removeChild($loginMain.lastChild)
            registerButton.innerText = 'Register'
        }
    })
}
// sign in form
function addEventSignIn() {
    signInButton.addEventListener('click', (event) => {
        if (signInButton.innerText === 'Sign In') {
            const userInfo = {}
            const signInForm = document.createElement('form')
            signInForm.addEventListener('change', (event) => {
                Object.assign(userInfo, {[event.target.name]: event.target.value})
            })
    
            emailInput = createEmailInput()
            passwordInput = createPasswordInput()
            submit = createSubmit('Sign In')
    
            submit.addEventListener('click', (event) => {
                event.preventDefault()
                fetchUser(userInfo, instructorCheck.checked)
            })
    
            signInForm.append(
                emailInput.emailLabel, emailInput.emailField, 
                passwordInput.passwordLabel, passwordInput.passwordField, 
                submit
            )
            $loginMain.appendChild(signInForm)
            signInButton.innerText = 'Hide Form'
        } else {
            $loginMain.removeChild($loginMain.lastChild)
            signInButton.innerText = 'Sign In'
        }
    })
}
function createSubmit(kind) {
    if (kind === 'Create User') {
        const submit = document.createElement('button')
        // submit.setAttribute('type', 'submit')
        submit.innerText = 'Create User'
        submit.id = 'create-user'
        return submit
    } else {
        const submit = document.createElement('button')
        submit.innerText = 'Sign In'
        submit.id = 'sign-in'
        return submit
    }
}
function createNameInput() {
    const nameField = document.createElement('input')
    nameField.id = 'name-field'
    nameField.name = 'name'
    const nameLabel = document.createElement('label')
    nameLabel.setAttribute('for', 'name-field')
    // nameLabel.id = 'name-label'
    nameLabel.innerText = 'Name'
    return { nameField, nameLabel }
}
function createPasswordInput() {
    const passwordField = document.createElement('input')
    passwordField.id = 'password-field'
    passwordField.type = 'password'
    passwordField.name = 'password'
    const passwordLabel = document.createElement('label')
    passwordLabel.setAttribute('for', 'password-field')
    passwordLabel.id = 'password'
    passwordLabel.innerText = 'Password'
    return { passwordField, passwordLabel }
}
function createEmailInput() {
    const emailField = document.createElement('input')
    emailField.type = 'email'
    emailField.id = 'email-field'
    emailField.name = 'email'
    const emailLabel = document.createElement('label')
    emailLabel.setAttribute('for', 'email-field')
    emailLabel.id = 'email'
    emailLabel.innerText = 'Email'
    return { emailField, emailLabel }
}
function createPhoneInput() {
    const phoneField = document.createElement('input')
    phoneField.placeholder = 'numbers only...'
    phoneField.id = 'phone-field'
    phoneField.name = 'phone'
    const phoneLabel = document.createElement('label')
    phoneLabel.setAttribute('for', 'phone-field')
    phoneLabel.id = 'phone'
    phoneLabel.innerText = 'Phone'
    return { phoneField, phoneLabel }
}
