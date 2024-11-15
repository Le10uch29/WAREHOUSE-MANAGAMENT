//login parol
const SERVER_URL = 'http://localhost:8020/ms-user/auth';

let admin = [
    {
        username: 'Elnur',
        password: 123456,
    }
]

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const login = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(SERVER_URL  + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: login,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Congratulation!');

            
            localStorage.setItem('username', login);

            
            window.location.href = "./index.html";
        } else {
            alert('Error! Invalid username or password');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error! Something went wrong');
    }
});


//show password
function show_hide_password(target){
	let input = document.getElementById('password');
	if (input.getAttribute('type') == 'password') {
		target.classList.add('view');
		input.setAttribute('type', 'text');
	} else {
		target.classList.remove('view');
		input.setAttribute('type', 'password');
	}
	return false;
}

