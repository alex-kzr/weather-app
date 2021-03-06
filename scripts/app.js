const locationForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = data => {
    const { locationDets, weather } = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${locationDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    const timeSrc = (weather.IsDayTime) ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
};

locationForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const locationSearch = locationForm.location.value.trim();
    locationForm.reset();
    
    forecast.updateLocation(locationSearch)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    
    // set lacal storage
    localStorage.setItem('location', locationSearch);
});

if(localStorage.getItem('location')){
    forecast.updateLocation(localStorage.getItem('location'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}