import {AxiosStatic} from 'axios';

export class StormGlass {

    constructor(protected request: AxiosStatic){};

    public async fetchPoints(lat: number, lng:number): Promise<{}>{
        return this.request.get(`https://api.stormglass.io/v2/weather/point?params=swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection&source=noaa&end=1592113802&lat=${lat}lng=${lng}`)
        
    }
}