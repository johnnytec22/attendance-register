

var login_modal = document.getElementById('login_modal');
var login_button = document.getElementById('login_btn');
var close_btn = document.getElementById('close');

login_button.onclick = function(event) {
    event.preventDefault();
    login_modal.style.display = 'block';
}

//closers
window.onclick = function (event) {
    if(event.target == login_modal) {
        login_modal.style.display = 'none';
    }
}

close_btn.onclick = function() {
    login_modal.style.display = 'none'
}

