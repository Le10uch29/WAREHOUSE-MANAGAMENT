let aside = document.getElementById('aside');
aside.classList.add('aside');

let asideContainer = document.createElement('div');
asideContainer.classList.add('aside__container');

let figure = document.createElement('figure');
figure.classList.add('aside__figure');

let img = document.createElement('img');
img.src = './img/LOGO.png';
img.alt = 'WAREHOUSE MANAGAMENT logo';
img.classList.add('aside__logo');

let figcaption = document.createElement('figcaption');
figcaption.classList.add('aside__figcaption');
let h2 = document.createElement('h2');
h2.classList.add('aside__title');

let aLogo = document.createElement('a');
aLogo.classList.add('logo__link');
aLogo.href = './index.html';
aLogo.textContent = 'WAREHOUSE MANAGAMENT';

h2.appendChild(aLogo);
figcaption.appendChild(h2);
figure.appendChild(img);
figure.appendChild(figcaption);


asideContainer.appendChild(figure);


let nav = document.createElement('nav');
nav.className = 'aside__nav nav';

let ul = document.createElement('ul');
ul.className = 'aside__list list-reset';

let items = [
    { href: './index.html', text: 'Dashboard', active: true },
    { href: './products.html', text: 'Products List' },
    { href: './product-add.html', text: 'Add Product' },
    { href: './user-list.html', text: 'Users List' },
    { href: './user-add.html', text: 'Add User' },
];


items.forEach(function(item) {
    let li = document.createElement('li');
    li.classList.add('aside__item');
    if (item.active) {
        li.classList.add('active');
    }

    let a = document.createElement('a');
    a.classList.add('aside__link');
    a.href = item.href;
    a.textContent = item.text;

    li.appendChild(a);
    ul.appendChild(li);
});


nav.appendChild(ul);
asideContainer.appendChild(nav);
aside.appendChild(asideContainer);

//location aside page
document.addEventListener("DOMContentLoaded", function() {
    let currentPage = window.location.pathname.split("/").pop();

    let navLinks = document.querySelectorAll('.aside__link');

    navLinks.forEach(function(link) {
        let linkPage = link.getAttribute('href').split("/").pop();
        if (linkPage ===  currentPage) {
          
            document.querySelectorAll('.aside__item').forEach(function(item) {
                item.classList.remove('active');
            });
           
            link.parentElement.classList.add('active');
        }
    });
});


