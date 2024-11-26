import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Travel } from './travel';
import { CreateTravelDto } from './create-travel.dto';
import { UpdateTravelDto } from './update-travel.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  travels : Travel[] = [
    {
      id: 1,
      destination: "Japan",
      description:
        "Go hiking on Mt. Fuji, visit the Tokyo Imperial Palace, or just relax at a traditional, family owned hot spring resort.",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Views_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg",
      price: 199999,
      discount: 10,
    },
    {
      id: 2,
      destination: "Egypt",
      description: "Where the pharaohs and the oldest gods lived.",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/01_khafre_north.jpg",
      price: 155000,
      discount: 0,
    },
    {
      id: 3,
      description: "Easter Island",
      destination: "There are a few giant head statues I guess...",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/Rano_Raraku_quarry.jpg",
      price: 250000,
      discount: 50,
    }
  ];

  nextId = 4;

  @Get('travels')
  listAllTravels(){
    return this.travels
      .filter(travel => travel.destination != null)
  };

  @Get('travels/:id')
  listTravelFromId(@Param('id') id : string){
    const idNumber = parseInt(id)
    const travel = this.travels.find(travel => travel.id == idNumber)

    if(!travel){
      throw new NotFoundException("Couldn't find this ID")
    }

    return travel;
  }
  
  @Post('travels')
  createNewTravel(@Body() newTravelData : CreateTravelDto){
    const newTravel : Travel = {
      ...newTravelData,
      id: this.nextId,
      discount: 0
    }
    this.nextId++;
    this.travels.push(newTravel);
    return newTravel;
  }

  @Patch('travels/:id')
  updateTravel(@Body() updatedTravelData : UpdateTravelDto, @Param('id') id : string){
    const idNumber = parseInt(id);
    const originalTravelId = this.travels.findIndex(travel => travel.id == idNumber);
    const originalTravel = this.travels[originalTravelId];

    if (originalTravelId == -1){
      throw new NotFoundException("Couldn't find book with that ID, therefore couldn't update it")
    }

    const updatedTravel : Travel = {
      ...originalTravel,
      ...updatedTravelData,
    };

    this.travels[originalTravelId] = updatedTravel
    return updatedTravel;
  }

  @Delete('travels/:id')
  deleteTravel(@Param('id') id : string){
    const idNumber = parseInt(id);
    const idx = this.travels.findIndex(travel => travel.id = idNumber);

    if (idx == -1){
      throw new NotFoundException("Couldn't find travel with that ID, therefore couldn't delete it")
    }
    this.travels.splice(idx, 1);
  }
}
