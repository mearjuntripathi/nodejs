// JavaScript (login-signup.js)
window.onload = function () {
    initializeForm();
};

function initializeForm() {
    const hash = window.location.hash;
    const defaultFormId = hash === '#signup' ? 'signup' : 'login';
    toggleForm(defaultFormId);

    const passwordInputs = document.querySelectorAll('.password');
    passwordInputs.forEach((passwordInput) => {
        const icon = passwordInput.querySelector('.fa');
        const input = passwordInput.querySelector('input');

        icon.addEventListener('click', () => togglePasswordVisibility(icon, input));
        input.addEventListener('input', () => togglePasswordIcon(icon, input));
    });

    document.getElementById('loginForm').addEventListener('submit', (event) => handleFormSubmission(event, 'login'));
    document.getElementById('signupForm').addEventListener('submit', (event) => handleFormSubmission(event, 'signup'));
}

function toggleForm(formId) {
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');

    loginForm.style.display = formId === 'login' ? 'block' : 'none';
    signupForm.style.display = formId === 'signup' ? 'block' : 'none';
}

function togglePasswordVisibility(icon, input) {
    if (icon.classList.contains('fa-eye')) {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        input.type = 'text';
    } else if (icon.classList.contains('fa-eye-slash')) {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        input.type = 'password';
    }
}

function togglePasswordIcon(icon, input) {
    if (input.value !== '') {
        icon.classList.remove('fa-lock');
        icon.classList.add('fa-eye');
    } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-lock');
    }
}

function handleFormSubmission(event, formName) {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (checkFormValidity(formData, formName)) {
        console.log(`Custom ${formName} submission`);
        submitForm(formData, formName);
    } else {
        const errorMessage = '<p>Inserted data is not matched</p>';
        document.getElementById(formName).querySelector('.message').innerHTML = errorMessage;
    }
}

function checkFormValidity(formData, formName) {
    if (formName === 'signup') {
        return formData.get('password') === formData.get('confirm_password') &&
            formData.get('email') !== '' &&
            formData.get('password') !== '';
    } else {
        return formData.get('email') !== '' && formData.get('password') !== '';
    }
}

function submitForm(formData, formName) {
    const requestOptions = {
        method: 'POST',
    };

    if (formName === 'signup') {
        requestOptions.body = formData;
    } else {
        const jsonData = Object.fromEntries(formData);
        requestOptions.body = JSON.stringify(jsonData);
        requestOptions.headers = {
            'Content-Type': 'application/json',
        };
    }
    var code
    fetch(`/${formName}`, requestOptions)
        .then(response => {
            code = response.status
            return response.json();
        })
        .then(data => {
            if (code === 200 && formName === 'signup') {
                const loginFormId = 'login'; // Assuming 'login' is the ID of your login form
                toggleForm(loginFormId);
                document.getElementById('message').classList.add('success');
                document.getElementById('message').innerHTML = `<p>${data.message}</p>`;
            }

            if(code === 400 || code === 500 && formName === 'signup'){
                document.getElementById('message').classList.add('error');
                document.getElementById('message').innerHTML = `<p>${data.message}</p>`;
            }

            if (code === 200 && formName === 'login') {
                window.location.href = '/home';
            }

            if(code === 401 || code === 500 && formName === 'login'){
                document.getElementById('message').classList.add('error');
                document.getElementById('message').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:');
        });
}


function changeImage(value) {
    const reader = new FileReader();
    reader.readAsDataURL(value.files[0]);
    reader.onload = function (event) {
        document.querySelector('.user-img').src = event.target.result;
    };
}