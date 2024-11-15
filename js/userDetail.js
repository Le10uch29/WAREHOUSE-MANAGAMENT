document.addEventListener('DOMContentLoaded', function () {

    const userId = new URLSearchParams(window.location.search).get('id');
    const userList = JSON.parse(localStorage.getItem('listWidthAddUser')) || [];
    const user = userList.find(user => user.id == userId);

    if (user) {


        document.getElementById('Firstname').value = user.firstname || '';
        document.getElementById('Lastname').value = user.lastname || '';
        document.getElementById('userPhone').value = user.phone || '';
        document.getElementById('userEmail').value = user.email || '';
        document.getElementById('userGender').value = user.gender || '';
        document.getElementById('Username').value = user.username || '';
        document.getElementById('userPassword').value = user.password || '';
        document.getElementById('userRole').value = user.role || '';
        document.getElementById('userPosition').value = user.userPosition || '';
        document.getElementById('dobUser').value = user.dob || '';
        document.getElementById('spanRole').textContent = user.role || 'Unknown';
        document.getElementById('userFullName').textContent = `${user.firstname || ''} ${user.lastname || ''}`;
        const userImg = document.getElementById('userImg');
        userImg.alt = `${user.firstname || 'Profile Image'}`;
    } else {
        alert('User not found');
    }


    const formInputs = document.querySelectorAll('.input-control');
    const updateBtn = document.getElementById('updateBtn');
    const editBtn = document.getElementById('editBtn');

    function toggleFormInputs(disabled) {
        formInputs.forEach(input => input.disabled = disabled);
        updateBtn.disabled = disabled;
    }


    toggleFormInputs(true);


    let isEditing = false;

    editBtn.addEventListener('click', function () {

        isEditing = !isEditing;


        toggleFormInputs(!isEditing);
    });


    document.getElementById('detailForm').addEventListener('submit', function (event) {
        event.preventDefault();

        if (isEditing) {
            user.firstname = document.getElementById('Firstname').value;
            user.lastname = document.getElementById('Lastname').value;
            user.phone = document.getElementById('userPhone').value;
            user.email = document.getElementById('userEmail').value;
            user.gender = document.getElementById('userGender').value;
            user.username = document.getElementById('Username').value;
            user.password = document.getElementById('userPassword').value;
            user.role = document.getElementById('userRole').value;
            user.userPosition = document.getElementById('userPosition').value;
            user.dob = document.getElementById('dobUser').value

            document.getElementById('userFullName').textContent = `${user.firstname || ''} ${user.lastname || ''}`;
            document.getElementById('spanRole').textContent = `${user.firstname || ''} ${user.lastname || ''}`;

            localStorage.setItem('listWidthAddUser', JSON.stringify(userList));

            alert('Profile updated successfully');
            window.location.href = './user-list.html';
        }
    });
});