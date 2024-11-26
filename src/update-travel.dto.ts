import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min, MinLength } from "class-validator"

export class UpdateTravelDto{
  @IsString()
  @IsOptional()
  destination: string

  @IsString()
  @MinLength(30)
  @IsOptional()
  description: string

  @IsUrl()
  @IsOptional()
  imgUrl: string

  @IsInt()
  @IsOptional()
  @Min(0)
  price: number

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsOptional()
  discount:number
}
