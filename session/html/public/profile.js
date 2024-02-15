let check = document.querySelector('#check');

check.addEventListener('click', () => {
    if (check.classList.contains('edit')) {
        check.classList.remove('edit');
        check.classList.add('cancel');
        check.innerHTML = '<i class="fa fa-times"> cancel</i>'
        document.querySelector('.pic button').style.display = "flex";
        document.querySelector('.info').style.display = "none";
        document.querySelector('.update').style.display = "flex";
    } else {
        check.classList.remove('cancel');
        check.classList.add('edit');
        document.querySelector('.pic button').style.display = "none";
        check.innerHTML = '<i class="fa fa-edit"> Edit Profile</i>'
        document.querySelector('.update').style.display = "none";
        document.querySelector('.info').style.display = "flex";
    }
})

let pass = document.getElementById('pass');
let cskpass = document.getElementById('cskpass');
pass.addEventListener('input', () => {
    compare();
    if (pass.value != "") {
        document.getElementById('passid').classList.remove('fa-lock');
        document.getElementById('passid').classList.add('fa-eye');
    } else {
        document.getElementById('passid').classList.remove('fa-eye');
        document.getElementById('passid').classList.add('fa-lock');
    }
});
cskpass.addEventListener('input', () => {
    compare();
    if (cskpass.value != "") {
        document.getElementById('cskpassid').classList.remove('fa-lock');
        document.getElementById('cskpassid').classList.add('fa-eye');
    } else {
        document.getElementById('cskpassid').classList.remove('fa-eye');
        document.getElementById('cskpassid').classList.add('fa-lock');
    }
});

let passid = document.getElementById('passid');
let cskpassid = document.getElementById('cskpassid');

passid.addEventListener('click', function () {
    if (this.classList.contains('fa-eye')) {
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
        pass.type = "text";
    } else {
        this.classList.add('fa-eye');
        this.classList.remove('fa-eye-slash');
        pass.type = "password";
    }
})

cskpassid.addEventListener('click', function () {
    if (this.classList.contains('fa-eye')) {
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
        cskpass.type = "text";
    } else {
        this.classList.add('fa-eye');
        this.classList.remove('fa-eye-slash');
        cskpass.type = "password";
    }
})

function compare() {
    if (pass.value != cskpass.value) {
        pass.parentElement.style.border = "red 1px solid";
        cskpass.parentElement.style.border = "red 1px solid";
    } else {
        pass.parentElement.style.border = "green 1px solid";
        cskpass.parentElement.style.border = "green 1px solid";
    }
}

function showImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById('pic').files[0]);
    oFReader.onload = function (oFREvent) {
        document.querySelector('.pic img').src = oFREvent.target.result;
        newImage = oFREvent.target.result;
    };
}

document.querySelector('.pic button').addEventListener('click', () => {
    document.getElementById('pic').click();
})
