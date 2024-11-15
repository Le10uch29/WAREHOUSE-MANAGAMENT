//register
const SERVER_URL = 'http://localhost:8020/ms-user';

let NewUsers = [];

console.log('SERVER_URL', SERVER_URL + '/register');
async function serverAddUser(user) {
    let response = await fetch(SERVER_URL + '/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('Failed to register user');
    }

    let data = await response.json();
    return data;
}

async function serverGetUsers(id = '') {
    let response = await fetch(SERVER_URL + '/register' + (id ? '/' + id : ''), {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    let data = await response.json();
    return data;
}

async function initialize() {
    try {
        let serverData = await serverGetUsers();
        if (serverData) {
            NewUsers = serverData;
            render(NewUsers);
        }
    } catch (error) {
        console.error(error);
    }
}

initialize();





document.getElementById('addUserForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    let name = document.getElementById('addName');
    let username = document.getElementById('addUsername');
    let userEmail = document.getElementById('addEmail');
    let userPhone = document.getElementById('addPhone');
    let userRole = document.getElementById('addRole');
    let userPassword = document.getElementById('password');


        let newUser = {
            id: Date.now(),
            name: name.value,
            username: username.value,
            userEmail: userEmail.value,
            phone: userPhone.value,
            role: userRole.value,
            password: userPassword.value
        };


try {
    let registeredUser = await serverAddUser(newUser);

    NewUsers.push(registeredUser);

    console.log(NewUsers);
    alert(`${newUser.username}, Congratulations! You have successfully registered.`);


    window.location.href = './login.html';
} catch (error) {
    console.error(error);
    alert('Registration failed.');
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