// grafics charts
document.addEventListener('DOMContentLoaded', function () {
    const pieCtx = document.getElementById('pieChart').getContext('2d');

    const pieData = {
        labels: ['Purchase', 'Sales', 'Expense', 'Gross Profit'],
        datasets: [{
            data: [25, 35, 20, 20],
            backgroundColor: ['#36A2EB', '#60ea80', '#FFCE56', '#FF6384']
        }]
    };

    const pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: pieData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const total = pieData.datasets[0].data.reduce((a, b) => a + b, 0);
                            const value = pieData.datasets[0].data[tooltipItem.dataIndex];
                            const percentage = ((value / total) * 100).toFixed(2);
                            return `${pieData.labels[tooltipItem.dataIndex]}: ${percentage}%`;
                        }
                    }
                },
                datalabels: {
                    formatter: (value, context) => {
                        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return percentage + '%';
                    },
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 16
                    }
                }
            }
        },
        plugins: [{
            id: 'datalabels',
            beforeDraw: function (chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, i) {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index) {
                            const value = dataset.data[index];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(2);
                            ctx.fillStyle = '#fff';
                            const fontSize = 16;
                            const fontStyle = 'bold';
                            const fontFamily = 'Arial';
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            const position = element.tooltipPosition();
                            ctx.fillText(percentage + '%', position.x, position.y);
                        });
                    }
                });
            }
        }]
    });

    document.querySelectorAll('.legend-item').forEach(function (legendItem, index) {
        legendItem.addEventListener('mouseenter', function () {
            pieChart.data.datasets[0].backgroundColor = pieChart.data.datasets[0].backgroundColor.map((color, i) => {
                return i === index ? color : Chart.helpers.color(color).alpha(0.3).rgbString();
            });
            pieChart.update();
        });

        legendItem.addEventListener('mouseleave', function () {
            pieChart.data.datasets[0].backgroundColor = ['#36A2EB', '#60ea80', '#FFCE56', '#FF6384'];
            pieChart.update();
        });
    });


// Bar Chart
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2022'],
        datasets: [
            {
                label: 'Opening Stock',
                data: [1.0, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0],
                backgroundColor: 'rgba(250, 147, 51, 0.8)',
                borderColor: 'rgba(250, 147, 51, 1)',
                borderWidth: 1,
                barThickness: 40,
            },
            {
                label: 'Closing Stock',
                data: [0.5, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5],
                backgroundColor: 'rgba(51, 51, 250, 0.8)',
                borderColor: 'rgba(51, 51, 250, 1)',
                borderWidth: 1,
                barThickness: 40,
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Stock Analysis',
                font: {
                    size: 20,
                    weight: 'bold'
                }
            },
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Stock (Last 8 Years)',
                    color: '#1e40af',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Stock (Amount)',
                    color: '#fa9333',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    stepSize: 0.5
                },
                grid: {
                    borderColor: '#1e40af',
                    lineWidth: 1
                }
            }
        }
    }
});

// Line Chart

new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Profit',
                data: [7, 9, 11, 6, 14, 8, 9, 7, 12, 15, 11, 20],
                borderColor: 'rgba(65, 67, 221, 1)',
                backgroundColor: 'rgba(65, 67, 221, 1)',
                fill: true,
                pointBackgroundColor: 'rgba(65, 67, 221, 1)',
                pointRadius: 13,
                pointHoverRadius: 7,
                pointBorderColor: '#fff',
                pointLabelFontSize: 14,
                pointStyle: 'rect',
                borderWidth: 3,
                tension: 0.4
            },
            {
                label: 'Loss',
                data: [5, 11, 7, 13, 6, 10, 10, 16, 13, 12, 7, 16],
                borderColor: 'rgba(71, 231, 38, 1)',
                backgroundColor: 'rgba(71, 231, 38, 1)',
                fill: true,
                pointBackgroundColor: 'rgba(71, 231, 38, 1)',
                pointRadius: 13,
                pointHoverRadius: 7,
                pointBorderColor: '#fff',
                pointLabelFontSize: 14,
                pointStyle: 'rect',
                borderWidth: 3,
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Profit & Loss Overview',
                font: {
                    size: 20,
                    weight: 'bold'
                }
            },
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem) {
                        const datasetLabel = tooltipItem.dataset.label || '';
                        const value = tooltipItem.raw;
                        return `${datasetLabel}: ${value}`;
                    }
                }
            }
        },
    }
});



//sale

function showTab(tabName) {
    const tableContainer = document.getElementById('table-container');
    let rows = data[tabName].map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${item.reference}</td>
            <td>${item.customer}</td>
            <td>${item.payment}</td>
            <td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td>
            <td>${item.amount}</td>
        </tr>
    `).join('');

    tableContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Reference</th>
                    <th>Customer</th>
                    <th>Payment Mode</th>
                    <th>Status</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    
  
    tabcontent = document.getElementsByClassName("dashboard__tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active-tab");
    }

    tablinks = document.getElementsByClassName("dashboard__stablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
        document.getElementById(tabName).classList.add("active-tab");

        evt.currentTarget.classList.add("active");

}

//Calendar
const calendarDates = document.getElementById('calendarDates');
const monthDisplay = document.getElementById('month');
const yearDisplay = document.getElementById('year');
const monthSelector = document.getElementById('monthSelector');
const yearSelector = document.getElementById('yearSelector');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
let selectedDate = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Populate the calendar with dates
function populateCalendar(month, year) {
    calendarDates.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill in previous month's empty days
    for (let i = 0; i < firstDay; i++) {
        calendarDates.innerHTML += `<div></div>`;
    }

    // Populate the current month's dates
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.textContent = day;
        dateElement.addEventListener('click', function() {
            if (selectedDate) {
                selectedDate.classList.remove('selected-date');
            }
            dateElement.classList.add('selected-date');
            selectedDate = dateElement;
        });
        calendarDates.appendChild(dateElement);
    }
}

// Update displayed month and year
function updateDisplay() {
    monthDisplay.textContent = months[currentMonth];
    yearDisplay.textContent = currentYear;
    populateCalendar(currentMonth, currentYear);
}

// Hide selectors
function hideSelectors() {
    monthSelector.style.display = 'none';
    yearSelector.style.display = 'none';
}

// Show month selector
monthDisplay.addEventListener('click', function() {
    hideSelectors();
    monthSelector.style.display = 'block';
    monthSelector.style.top = `${monthDisplay.offsetTop + monthDisplay.offsetHeight}px`;
    monthSelector.style.left = `${monthDisplay.offsetLeft}px`;
    monthSelector.innerHTML = months.map((month, index) => `<div data-month="${index}">${month}</div>`).join('');
});

// Show year selector
yearDisplay.addEventListener('click', function() {
    hideSelectors();
    yearSelector.style.display = 'block';
    yearSelector.style.top = `${yearDisplay.offsetTop + yearDisplay.offsetHeight}px`;
    yearSelector.style.left = `${yearDisplay.offsetLeft}px`;
    yearSelector.innerHTML = '';
    for (let year = currentYear - 100; year <= currentYear + 50; year++) {
        yearSelector.innerHTML += `<div data-year="${year}">${year}</div>`;
    }
});

// Handle month selection
monthSelector.addEventListener('click', function(event) {
    const month = event.target.getAttribute('data-month');
    if (month !== null) {
        currentMonth = parseInt(month);
        hideSelectors();
        updateDisplay();
    }
});

// Handle year selection
yearSelector.addEventListener('click', function(event) {
    const year = event.target.getAttribute('data-year');
    if (year !== null) {
        currentYear = parseInt(year);
        hideSelectors();
        updateDisplay();
    }
});

// Change month
prevMonthButton.addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateDisplay();
});

nextMonthButton.addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateDisplay();
});

// Hide selectors on outside click or Escape key
document.addEventListener('click', function(event) {
    if (!event.target.closest('.selector') && !event.target.closest('#month') && !event.target.closest('#year')) {
        hideSelectors();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideSelectors();
    }
});

// Initial load
updateDisplay();
});
