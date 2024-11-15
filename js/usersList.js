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

 //input img
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

document.addEventListener('DOMContentLoaded', function () {

    const listWidthAddUser = JSON.parse(localStorage.getItem('listWidthAddUser')) || [];

    function createUserFormItem() {
        const addUserForm = document.getElementById('addUserForm');
        const supplierName = document.getElementById('addName');
        const phone = document.getElementById('addPhone');
        const gender = document.getElementById('addGender');
        const email = document.getElementById('addEmail');
        const username = document.getElementById('addUserName');
        const password = document.getElementById('password');
        let role = document.getElementById('addRole');
        const profileImg = document.getElementById('addProfileImage');
        if (!addUserForm) return;


        addUserForm.addEventListener('submit',  function (event) {
            event.preventDefault();

            let profileImgBase64 = './img/user-Bigprofile.png'; 

            if (profileImg.files[0]) {
                
                profileImgBase64 =  getBase64(profileImg.files[0]);
            }

            const newUser = {
                id: Date.now(),
                supplierName: supplierName.value,
                phone: phone.value,
                gender: gender.value,
                username: username.value,
                email: email.value,
                password: password.value,
                role: role.value,
                profileImg: profileImgBase64,
            };


            listWidthAddUser.push(newUser);

            localStorage.setItem('listWidthAddUser', JSON.stringify(listWidthAddUser));


            supplierName.value = '';
            phone.value = '';
            gender.value = '';
            username.value = '';
            email.value = '';
            password.value = '';
            role.value = '';
            profileImg.value = '';
            detailUserLink = ','

            addUserForm.reset();

            window.location.href = './user-list.html';
        });




        return testRow;

    }
    createUserFormItem();

    function renderUsersTable() {
        const usersTable = document.getElementById('usersTableBody');
        usersTable.innerHTML = '';




        if (!usersTable) return;

        listWidthAddUser.forEach((user, id) => {
            const row = document.createElement('tr');
            row.classList.add('user-list__items');

            row.innerHTML = `
                <td class="users-list__borderless  users-list__borderless-Checkbox"><input type="checkbox" class="user-list__checkbox"></td>
                <td class="users-list__borderless">${id + 1}</td>
                <td class="users-list__borderless">${user.supplierName}</td>
                <td class="users-list__borderless">${user.phone}</td>
                <td class="users-list__borderless">${user.email}</td>
                <td class="users-list__borderless">${user.role}</td>
                <td class="users-list__borderless"><span class="users-list__status">${user.status || 'Offline'}<span></td>
                <td class="users-list__borderless-adress">${user.userPosition || ''}</td>
                <td class="users-list__borderless-User-Edit">
                <a href="./user-detail.html?id=${user.id}">Detail link</a></td>
            `;

            usersTable.appendChild(row);
        });
    }


    //img

    // Function to generate a PDF file


    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF()
        let rowData = '';
        let yPosition = 10;

        listWidthAddUser.forEach((user, index) => {
            rowData += `${index + 1}. ${user.supplierName} | ${user.phone} | ${user.email} | ${user.role} | ${user.address || 'N/A'}`;
            doc.text(rowData, 10, yPosition);
            yPosition += 10;
        })

        doc.save('users-list.pdf')

    }


    // Function to generate a CSV file


    function generateCSV() {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "SL, Name, Phone, Email, Role, Address\n";


        listWidthAddUser.forEach((user, index) => {
            csvContent += (`${index + 1}. ${user.supplierName}, ${user.phone}, ${user.email}, ${user.role}, ${user.address}\n`);
        })

        const encodedUri = encodeURI(csvContent);


        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);

        link.setAttribute("download", "users-list.csv");

        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }


    // Function to print the user list


    function printUsersList() {


        print()

    }

    const pdfBtn = document.getElementById('pdf');
    const csvBtn = document.getElementById('scv');
    const printBtn = document.getElementById('print');

    if (pdfBtn) {
        pdfBtn.addEventListener('click', generatePDF)
    }

    if (csvBtn) {
        csvBtn.addEventListener('click', generateCSV)
    }

    if (printBtn) {
        printBtn.addEventListener('click', printUsersList)
    }

    function deleteSelectedUsers() {
        const checkboxes = document.querySelectorAll('.user-list__checkbox');
        const updatedList = listWidthAddUser.filter((user, id) => !checkboxes[id].checked);


        localStorage.setItem('listWidthAddUser', JSON.stringify(updatedList));

        listWidthAddUser.length = 0;

        listWidthAddUser.push(...updatedList);

        renderUsersTable();
    }

    function toggleAllCheckboxes() {
        const usersListCheckbox = document.getElementById('usersListCheckbox');
        const checkboxes = document.querySelectorAll('.user-list__checkbox');

        checkboxes.forEach(checkbox => {
            checkbox.checked = usersListCheckbox.checked;
        });
    }

    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteSelectedUsers);
    }

    const usersListCheckbox = document.getElementById('usersListCheckbox');
    if (usersListCheckbox) {
        usersListCheckbox.addEventListener('change', toggleAllCheckboxes);
    }

    if (document.getElementById('usersTableBody')) {
        renderUsersTable(listWidthAddUser);
    }

    function filterUsers() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const rows = document.querySelectorAll('.user-list__items');


        rows.forEach(row => {
            const cells = row.querySelectorAll('td')

            let matchFound = false;


            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(searchInput)) {
                    matchFound = true;
                }


            })

            if (matchFound) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }

        })

    }
    const searchInputField = document.getElementById('searchInput');
    if (searchInputField) {
        searchInputField.addEventListener('input', filterUsers);
    }

});

