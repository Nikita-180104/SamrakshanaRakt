document.addEventListener('DOMContentLoaded', function() {
    const modeToggle = document.getElementById('modeToggle');
    const donorView = document.getElementById('donorView');
    const receiverView = document.getElementById('receiverView');
    const locationSelect = document.getElementById('locationSelect');
    const donationCentersList = document.getElementById('donationCentersList');

    modeToggle.addEventListener('change', function() {
        receiverView.style.display = this.checked ? 'block' : 'none';
        donorView.style.display = this.checked ? 'none' : 'block';
    });

    locationSelect.addEventListener('change', function() {
        const city = this.value;
        updateDonationCenters(city);
    });

    function updateDonationCenters(selectedCity) {
        // Clear existing list
        donationCentersList.innerHTML = '';
        
        if(selectedCity && donationCenters[selectedCity]) {
            donationCenters[selectedCity].forEach(center => {
                const li = document.createElement('li');
                li.textContent = center;
                donationCentersList.appendChild(li);
            });
        }
    }

    const donationCenters = {
        chandigarh: [
            'Chandigarh Blood Bank - Sector 16',
            'LifeCare Blood Center - Sector 22',
            'HealthPlus Plasma Center - Sector 35'
        ],
        panchkula: [
            'Hariyana khoon jagah - sec 12a',
            'HealWell Blood & Plasma - sector 20',
            'SaveLife Donation Center - sector 16'
        ]
    };
});
