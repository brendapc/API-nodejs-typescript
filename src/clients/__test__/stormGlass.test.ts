import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormGlass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormGlass_normalized_response_3_hours_fixture.json';

jest.mock('axios');

describe('StormGlass client', ()=>{
    const mockedAxios = axios as jest.Mocked<typeof axios>
    it('should return the normalized forecast from the StromGlass sevice', async()=>{
        const lat = -33.7927338;
        const lng = 150.332324;

        mockedAxios.get.mockResolvedValue({data: stormGlassWeather3HoursFixture})
        
        const stormGlass = new StormGlass(mockedAxios)
        const response = await stormGlass.fetchPoints(lat,lng);
        expect(response).toEqual(stormGlassNormalized3HoursFixture)
    })
});