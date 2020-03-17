class Forecast {
    constructor(){
        this.apiKey = apiKey;
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.locationURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateLocation(locationSearch){
        const locationDets = await this.getLocation(locationSearch);
        const weather = await this.getWeather(locationDets.Key);
        return { locationDets, weather };
    }
    async getLocation(q){
        const query = `?apikey=${this.apiKey}&q=${q}`;
        const response = await fetch(this.locationURI + query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(locationKey){
        const query = `${locationKey}?apikey=${this.apiKey}`; 
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}