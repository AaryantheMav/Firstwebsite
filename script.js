function showFlats(area) {
    const flatsData = {
        "Thicket Street": [
            {
                name: "Thicket Street 1",
                images: ["Website Images/0.jpg","Website Images/1.jpg"],
                details: "Spacious two-bedroom flat with a scenic view."
            },
            { name: "Thicket Street 2", images: ["images/thicket2.jpg"], details: "Cozy one-bedroom flat, perfect for singles or couples." },
            { name: "Thicket Street 3", images: ["images/thicket3.jpg"], details: "Modern three-bedroom flat with all amenities included." }
        ],
        "Thicket Crescent": [
            { name: "Thicket Crescent 1", images: ["images/crescent1.jpg"], details: "Luxurious four-bedroom property with a private garden." },
            { name: "Thicket Crescent 2", images: ["images/crescent2.jpg"], details: "Affordable studio with excellent community facilities." },
            { name: "Thicket Crescent 3", images: ["images/crescent3.jpg"], details: "Family-friendly three-bedroom house with a playground nearby." }
        ],
        // Additional entries for other areas...
    };

    let flats = flatsData[area] || [];
    let flatsInfo = document.getElementById('flatsInfo');
    flatsInfo.innerHTML = flats.map(flat => `
        <div class="flat" onclick="showFlatDetails('${flat.details}', '${flat.name}', '${flat.images}')">
            <img src="${flat.images[0]}" alt="${flat.name}">
            <p>${flat.name}</p>
        </div>
    `).join('');
}

function showFlatDetails(details, name, images) {
    images = images.split(',');
    let modal = document.getElementById('modal');
    document.getElementById('modalDetails').innerHTML = `
        <h2>${name}</h2>
        <div class="carousel slide" data-ride="carousel" id="carouselExampleControls">
            <div class="carousel-inner">
                ${images.map((img, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img class="d-block w-100" src="${img}" alt="Slide ${index + 1}">
                    </div>
                `).join('')}
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <p>${details}</p>
    `;
    modal.style.display = 'block';
    $('.carousel').carousel(); // Ensure jQuery is loaded to use this
}

function searchLocations() {
    let input = document.getElementById('searchBar').value.toUpperCase();
    let items = document.querySelectorAll('.topbar .menu-item');
    for (let i = 0; i < items.length; i++) {
        let txtValue = items[i].textContent || items[i].innerText;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

document.getElementById('accountForm').onsubmit = function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('/register', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.status === 'success' ? 'User registered successfully!' : 'Registration failed. Please check your details.');
        closeModal('accountModal');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error registering user.');
        closeModal('accountModal');
    });
}

document.querySelectorAll('.modal .close').forEach(button => {
    button.onclick = function() {
        closeModal(this.closest('.modal').id);
    };
});

window.onload = function() {
    document.getElementById('accountModal').style.display = 'block';
}
