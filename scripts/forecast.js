// get weather information
const getWeather = async (locationKey) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${locationKey}?apikey=${apiKey}`; 
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

// get city information
const getCity = async (q) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${apiKey}&q=${q}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

getCity('manchester').then(data => {
    return getWeather(data.Key);
}).then(data => {
    console.log(data);
}).catch(err => console.log(err));
