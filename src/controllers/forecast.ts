import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Forecast } from '@src/services/forecast';
import { Beach } from '@src/models/Beach';


const forecast = new Forecast();

@Controller('forecast')
export class ForeclastController {
  @Get('')
  public async getForecastForLoggedUser(_: Request, res: Response): Promise<void> {
    const beaches = await Beach.find({});
    const forecastData = await forecast.processForecastForBeaches((beaches))
    res.status(200).send(forecastData)
  }
}
