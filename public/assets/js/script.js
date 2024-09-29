'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeHeader);



/**
 * toggle active on add to fav
 */

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
}

addEventOnElem(addToFavBtns, "click", toggleActive);



/**
 * scroll revreal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.5) {
      sections[i].classList.add("active");
    } else {
      sections[i].classList.remove("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

document.addEventListener('DOMContentLoaded', function() {
    fetchPNLData();
});

function fetchPNLData() {
    console.log('Fetching PNL data...');
    fetch('pnlData.json')
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            if (Array.isArray(data) && data.length > 0) {
                updatePNLCards(data);
            } else {
                console.error('Unexpected data structure in pnlData.json');
            }
        })
        .catch(error => {
            console.error('Error fetching PNL data:', error);
        });
}

function updatePNLCards(data) {
    const container = document.getElementById('pnlCardContainer');
    if (!container) {
        console.error('PNL card container not found');
        return;
    }

    container.innerHTML = ''; // Clear existing content

    data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="trend-card" style="text-align: center">
                <div class="card-title-wrapper" style="display: flex; justify-content: center; align-items: center;">
                    <a href="#" class="card-title" style="font-size: 1.5em; margin-left: 8px">
                        <span class="span">${item.title}</span>
                    </a>
                </div>
                <data class="card-value" value="${item.percentage}" style="display: block; margin: 10px 0"></data>
                <div class="card-analytics" style="display: flex; flex-direction: column; align-items: center;">
                    <data class="trade-date" value="${item.dateRange}" style="margin-bottom: 10px">${item.dateRange}</data>
                    <div class="badge ${item.trend === 'up' ? 'green' : 'red'}">${item.trend === 'up' ? '+' : '-'}${item.percentage}%</div>
                </div>
            </div>
        `;
        container.appendChild(li);
    });

    console.log(`${data.length} PNL cards updated`);
}

// Add a button to manually fetch data
const fetchButton = document.createElement('button');
fetchButton.textContent = 'Fetch PNL Data';
fetchButton.onclick = fetchPNLData;
document.body.insertBefore(fetchButton, document.body.firstChild);

// Optionally, set up periodic refresh
setInterval(fetchPNLData, 60000); // Refresh every minute

function updateTrendCard(data, suffix = '') {
    document.getElementById(`pnlTitle${suffix}`).textContent = data.title;
    document.getElementById(`pnlValue${suffix}`).textContent = `$${Math.round(data.value).toLocaleString('en-US')}`;
    document.getElementById(`pnlDateRange${suffix}`).textContent = data.dateRange;
    
    const percentageElement = document.getElementById(`pnlPercentage${suffix}`);
    percentageElement.textContent = `${data.percentage > 0 ? '+' : ''}${data.percentage}%`;
    percentageElement.classList.add(data.percentage >= 0 ? 'green' : 'red');
}

function calculatePNLPercentage(days) {
    const weeklyRate = 0.90; // 90% weekly
    const weeksElapsed = days / 7;
    return Math.pow(1 + weeklyRate, weeksElapsed) - 1;
}

// Fetch the PNL data from the JSON file
fetch('pnlData.json')
    .then(response => response.json())
    .then(data => {
        // Update the trend cards with the fetched data
        updateTrendCard(data.thisWeek);
        updateTrendCard(data.lastWeek, '2');
        updateTrendCard(data.monthly, '3');
        updateTrendCard(data.yearly, '4');
    })
    .catch(error => console.error('Error fetching PNL data:', error));

function updatePNLCards() {
    fetch('/pnlData.json')
        .then(response => response.json())
        .then(data => {
            // Update Last Week PNL Card
            updateCard('', data.lastWeek);
            // Update This Week PNL Card
            updateCard('2', data.thisWeek);
            // Update Monthly PNL Card
            updateCard('3', data.monthly);
            // Update Yearly PNL Card
            updateCard('4', data.yearly);
        })
        .catch(error => console.error('Error fetching PNL data:', error));
}

function updateCard(suffix, data) {
    document.getElementById(`pnlTitle${suffix}`).textContent = data.title;
    document.getElementById(`pnlValue${suffix}`).textContent = `$${Math.round(data.value).toLocaleString('en-US')}`;
    document.getElementById(`pnlDateRange${suffix}`).textContent = data.dateRange;
    
    const percentageElement = document.getElementById(`pnlPercentage${suffix}`);
    percentageElement.textContent = `${data.percentage > 0 ? '+' : ''}${data.percentage}%`;
    percentageElement.classList.add(data.percentage >= 0 ? 'green' : 'red');
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', updatePNLCards);