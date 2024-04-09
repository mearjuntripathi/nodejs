// Add this code to your login-signup.js file

window.onload = function () {
    var hash = window.location.hash;
    toggleForm(hash === '#signup' ? 'signup' : 'login');
};

document.body.addEventListener('submit', function (event) {
    if (event.target.id === 'loginForm' || event.target.id === 'signupForm') {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formName = event.target.id === 'loginForm' ? 'login' : 'signup';

        const messageElement = document.getElementById(formName).querySelector('.message'); // Find the .message element within the form

        if (check(formData, formName)) {
            submitForm(formData, formName);
        } else {
            messageElement.innerHTML = `<p>Insert data is not matched</p>`;
        }
    }
});

const passwords = document.querySelectorAll('.password');
passwords.forEach(password => {
    let eyeIcon = password.querySelector('.fa');
    let inputField = password.querySelector('input');

    eyeIcon.addEventListener('click', () => {
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
        inputField.type = inputField.type === 'password' ? 'text' : 'password';
    });

    inputField.addEventListener('input', () => {
        eyeIcon.classList.toggle('fa-lock', !inputField.value);
        eyeIcon.classList.toggle('fa-eye', inputField.value !== '');
    });
});

function check(formData, formName) {
    if (formName === 'signup') {
        return (
            formData.get('password') === formData.get('confirm_password') &&
            formData.get('email') !== '' &&
            formData.get('password') !== ''
        );
    } else {
        return formData.get('email') !== '' && formData.get('password') !== '';
    }
}

function showImage(value) {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(value.files[0]);
    oFReader.onload = function (oFREvent) {
        document.getElementById('profile-pic').src = oFREvent.target.result;
        newImage = oFREvent.target.result;
    };
}

function submitForm(formData, formName) {
    // Define the URL based on the formName parameter
    const url = formName === 'signup' ? '/signup' : '/login';
    var status = 0;

    if (formName === 'signup') {
        formData.delete('confirm_password');
    }

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch(url, { // Use the determined URL
        method: 'POST',
        body: JSON.stringify(jsonData), // Send JSON data
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => {
        status = response.status;
        console.log('Response status:', status);
        return response.json(); // Parse response as JSON
    })
    .then(data => {
        let message = document.getElementById(formName);
        if(status >= 200 && status <= 300){
            message.querySelector('.message').innerHTML = `<p class='success'>${data.message}</p>`;
        }else{
            message.querySelector('.message').innerHTML = `<p class='error'>${data.message}</p>`;
        }
        console.log('Response data:', data.message); // Log the parsed response data
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Add the toggleForm function
function toggleForm(formId) {
    document.getElementById('login').style.display = formId === 'login' ? 'block' : 'none';
    document.getElementById('signup').style.display = formId === 'signup' ? 'block' : 'none';
}