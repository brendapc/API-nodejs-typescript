import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Forecast } from '@src/services/forecast';
import { Beach } from '@src/models/Beach';


const forecast = new Forecast();

@Controller('forecast')
export class ForeclastController {
  @Get('')
  public async getForecastForLoggedUser(_: Request, res: Response): Promise<void> {
    try{
    const beaches = await Beach.find({});
    const forecastData = await forecast.processForecastForBeaches((beaches))
    res.status(200).send(forecastData)
  } catch (error){
    res.status(500).send({error: 'something went wrong'})
  }
  }
}
