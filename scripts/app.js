const locationForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

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

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else{
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);




    console.log(data);
};

const updateLocation = async locationSearch => {
    const locationDets = await getLocation(locationSearch);
    const weather = await getWeather(locationDets.Key);
    return { locationDets, weather };
};

locationForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const locationSearch = locationForm.location.value.trim();
    locationForm.reset();
    
    updateLocation(locationSearch)
        .then(data => updateUI(data))
        .catch(err => console.log(err));        
});