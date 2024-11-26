import { IsInt, IsNotEmpty, IsString, IsUrl, Min, MinLength } from "class-validator"

export class CreateTravelDto{
  @IsString()
  @IsNotEmpty()
  destination: string

  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  description: string

  @IsUrl()
  @IsNotEmpty()
  imgUrl: string

  @IsInt()
  @Min(0)
  price: number
}
