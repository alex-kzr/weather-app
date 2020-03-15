const locationForm = document.querySelector('form');

const updateLocation = async locationSearch => {
    const locationDets = await getLocation(locationSearch);
    const weather = await getWeather(locationDets.Key);
    return {
        locationDets: locationDets,
        weather: weather
    };
};

locationForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const locationSearch = locationForm.location.value.trim();
    locationForm.reset();
    
    updateLocation(locationSearch)
        .then(data => console.log(data))
        .catch(err => console.log(err));        
});