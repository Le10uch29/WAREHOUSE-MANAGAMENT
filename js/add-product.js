document.addEventListener('DOMContentLoaded', function () {

    const productList = JSON.parse(localStorage.getItem('listWidthAddProduct')) || [];

    const addProductForm = document.getElementById('addProductForm');
    const productImg = document.getElementById('imageinput');

    // Event listener for adding a new product
    if (addProductForm && productImg) {
        addProductForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const file = productImg.files[0];
            if (!file) {
                alert('Please upload a product image.');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                const newProduct = {
                    productImg: e.target.result,
                    id: Date.now(),
                    productName: document.getElementById('productName').value || '',
                    pricePerUnit: document.getElementById('pricePerUnit').value || '',
                    quantity: document.getElementById('quantity').value || '',
                    qualityCheck: document.getElementById('qualityCheck').value || '',
                    deliveryDate: document.getElementById('deliveryDate').value || '',
                    expiryDate: document.getElementById('expiryDate').value || '',
                    manufactureDate: document.getElementById('manufactureDate').value || '',
                    warehouseId: document.getElementById('warehouseId').value || ''
                };

                // Add new product to productList and store in localStorage
                productList.push(newProduct);
                localStorage.setItem('listWidthAddProduct', JSON.stringify(productList));

                // Alert and reset the form
                alert('Product added successfully');
                addProductForm.reset();

                // Re-render the table after adding a new product
                renderproductsTable(productList);
            };

            reader.readAsDataURL(file);

            detailUserLink = ','

            addUserForm.reset();

            window.location.href = './products.html';
        });
    }

    // Function to render the products table
    function renderproductsTable(products) {
        const productsTable = document.getElementById('productsTableBody');
        
        if (!productsTable) return;

        // Clear the table before rendering
        productsTable.innerHTML = '';

        // Loop through products and create table rows
        products.forEach((product, id) => {
            const row = document.createElement('tr');
            row.classList.add('products-list__items-body');

            row.innerHTML = `
                <td class="products-list__borderless products-list__borderless-Checkbox"><input type="checkbox" class="product-list__checkbox"></td>
                <td class="products-list__borderless products-list__borderless-body">${id + 1}</td>
                <td class="products-list__borderless products-list__borderless-body"><img src="${product.productImg}" alt="Product Image" class="product-list__img" style="width: 24px"></td>
                <td class="products-list__borderless products-list__borderless-body">${product.productName}</td>
                <td class="products-list__borderless products-list__borderless-body">${product.pricePerUnit}</td>
                <td class="products-list__borderless products-list__borderless-body">${product.quantity}</td>
                <td class="products-list__borderless products-list__borderless-body">${product.qualityCheck}</td>
                <td class="products-list__borderless products-list__borderless-body">${product.deliveryDate}</td>
                <td class="products-list__borderless products-list__borderless-body">${product.expiryDate}</td>
                <td class="products-list__borderless products-list__borderless-body">${product.manufactureDate}</td>
                <td class="products-list__borderless products-list__borderless-body">${product.warehouseId}</td>
                <a href="./user-detail.html?id=${user.id}">Detail link</a></td>
            `;
            
            productsTable.appendChild(row);
        });
    }

    // Call renderproductsTable to load initial data from localStorage
    renderproductsTable(productList);

    // Delete selected products
    function deleteSelectedproducts() {
        const newCheckboxes = document.querySelectorAll('.product-list__checkbox');
        const updatedList = productList.filter((product, id) => !newCheckboxes[id].checked);

        // Update localStorage and productList
        localStorage.setItem('listWidthAddProduct', JSON.stringify(updatedList));
        productList.length = 0;
        productList.push(...updatedList);

        // Re-render the updated product list
        renderproductsTable(productList);
    }

    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteSelectedproducts);
    }

    // Toggle select all checkboxes
    function toggleAllCheckboxes() {
        const productsListCheckbox = document.getElementById('productsListCheckbox');
        const checkboxes = document.querySelectorAll('.product-list__checkbox');

        checkboxes.forEach(checkbox => {
            checkbox.checked = productsListCheckbox.checked;
        });
    }

    const productsListCheckbox = document.getElementById('productsListCheckbox');
    if (productsListCheckbox) {
        productsListCheckbox.addEventListener('change', toggleAllCheckboxes);
    }

    // Filtering 
    function filterProducts() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const rows = document.querySelectorAll('.products-list__items-body'); 

        rows.forEach(row => {
            const cells = row.querySelectorAll('.products-list__borderless-body');
            let matchFound = false;

            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(searchInput)) {
                    matchFound = true;
                }
            });

            row.style.display = matchFound ? '' : 'none';
        });
    }

    const searchInputField = document.getElementById('searchInput');
    if (searchInputField) {
        searchInputField.addEventListener('input', filterProducts);
    }

    // Image input logic
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('imageinput');
    const fileNameDisplay = document.querySelector('.file-name');
    const fileSizeDisplay = document.querySelector('.file-size');
    const fileBlock = document.querySelector('.file-block');

    if (dropZone && fileInput) {
        let isFilePickerOpened = false;

        dropZone.addEventListener('click', () => {
            if (!isFilePickerOpened) {
                isFilePickerOpened = true;
                fileInput.click();
            }
        });

        fileInput.addEventListener('change', () => {
            handleFileSelect();
            isFilePickerOpened = false;
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragging');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragging');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragging');
        });
    }

    function handleFileSelect() {
        const file = fileInput.files[0];
        if (file) {
            fileBlock.style.display = 'block';
            fileNameDisplay.textContent = file.name;
            fileSizeDisplay.textContent = (file.size / 1024).toFixed(2) + ' KB';
        }
    }
});


// Function to generate a PDF file


function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF()
    let rowData = '';
    let yPosition = 10;

    listWidthAddProduct.forEach((product, index) => {
        rowData += `${index + 1}. ${product.supplierName} | ${product.phone} | ${product.email} | ${product.role} | ${product.address || 'N/A'}`;
        doc.text(rowData, 10, yPosition);
        yPosition += 10;
    })

    doc.save('product-list.pdf')

}


// Function to generate a CSV file


function generateCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID, Image, Name, Code, Category, Sub-Category, Brand, Unit, letiant, Stock, Price\n";


    listWidthAddProduct.forEach((product, index) => {
        csvContent += (`${index + 1}. ${product.productImg}, ${product.idPorduct}, ${product.productName}, ${product.productCode}, 
                ${product.categorySelect}, ${product.brand}, ${product.productUnit}, ${product.letiant},${product.stockAlert}, ${product.productPrice}\n`);
    })

    const encodedUri = encodeURI(csvContent);


    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);

    link.setAttribute("download", "products-list.csv");

    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}


// Function to print the product list


function printproductsList() {


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
    printBtn.addEventListener('click', printproductsList)
}




