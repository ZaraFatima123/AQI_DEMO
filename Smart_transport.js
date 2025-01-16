document.addEventListener('DOMContentLoaded', function () {

    const findRoutesButton = document.getElementById('find-routes-btn');
    const locationInput = document.getElementById('location-input');
    const transportModeSelect = document.getElementById('transport-mode');
    const routesInfo = document.getElementById('routes-info');

    // Add event listener to the button
    findRoutesButton.addEventListener('click', function () {
        // Check if location input is empty, then get the location using geolocation
        let location = locationInput.value.trim(); // Get the location input value
        const transportMode = transportModeSelect.value; // Get the selected transport mode

        if (location === '') {
            // If no location entered, attempt to get the geolocation
            getGeolocation();
        } else {
            // If location is entered, proceed as usual
            displayRoutes(location, transportMode);
        }
    });

    // Function to get the geolocation of the user
    function getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Use latitude and longitude to get location (can be passed to a map service or used directly)
                const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
                locationInput.value = location; // Fill in the location field with the coordinates
                
                // Proceed to fetch routes with geolocation
                const transportMode = transportModeSelect.value;
                displayRoutes(location, transportMode);
            }, function (error) {
                // Handle error if geolocation is not available or fails
                alert('Geolocation failed: ' + error.message);
            });
        } else {
            // Handle case if the browser doesn't support geolocation
            alert('Geolocation is not supported by this browser.');
        }
    }

    // Function to display the routes
    function displayRoutes(location, transportMode) {
        // Clear previous routes info
        routesInfo.innerHTML = '';

        if (location === '') {
            routesInfo.innerHTML = '<p class="text-danger">Please enter or enable your location.</p>';
            return;
        }

        routesInfo.innerHTML = `<p>Finding routes for <strong>${location}</strong> with <strong>${transportMode}</strong>...</p>`;

        // Mocked route data (replace with actual API or dynamic fetching)
        setTimeout(function () {
            const routes = getMockRoutes(location, transportMode);
            if (routes.length > 0) {
                let routesHTML = '<ul class="list-group">';
                routes.forEach(function (route) {
                    routesHTML += `<li class="list-group-item">${route}</li>`;
                });
                routesHTML += '</ul>';
                routesInfo.innerHTML = routesHTML;
            } else {
                routesInfo.innerHTML = '<p class="text-warning">No routes found for the selected location and transport mode.</p>';
            }
        }, 2000); // Simulate data fetching delay
    }

    // Mock function to generate routes based on location and transport mode
    function getMockRoutes(location, transportMode) {
        const mockRoutes = {
            bus: [
                `${location} - Bus Route 1`,
                `${location} - Bus Route 2`,
                `${location} - Bus Route 3`
            ],
            metro: [
                `${location} - Metro Line A`,
                `${location} - Metro Line B`,
            ]
        };
        return mockRoutes[transportMode] || [];
    }
});
