import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios'
jest.mock('axios');

describe('StormGlass client', ()=>{
    it('should return the normalized forecast from the StromGlass sevice', async()=>{
        const lat = -33.7927338;
        const lng = 150.332324;

        axios.get = jest.fn().mockResolvedValue({})
        
        const stormGlass = new StormGlass(axios)
        const response = await stormGlass.fetchPoints(lat,lng);
        expect(response).toEqual({})
    })
});