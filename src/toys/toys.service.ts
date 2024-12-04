import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToysService {

  constructor(private readonly prismaService: PrismaService) {}

  async create(createToyDto: CreateToyDto) {
    try {
    await this.prismaService.toy.create({
      data: createToyDto
    })
    return createToyDto
  }
  catch(err) {
    throw new Error(err)
  }
  }

  async findAll() {
    return await this.prismaService.toy.findMany({})
  }

  async findOne(id: number) {
    try {
      const result = await this.prismaService.toy.findUnique({
       where: {
        id
       }
      })
      if (result) {
        return result
      }
      throw new NotFoundException("toy not found")
    }
    catch (err) {
      throw new NotFoundException("toy not found")
    }
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    try {
      const update = await this.prismaService.toy.update({
        where: {
          id: id
        },
        data: updateToyDto

      })
      return update
    }
    catch(err) {
      throw new BadRequestException("Invalid data or toy does not exist")
    }
  }

  async remove(id: number) {
    try {
    
      const result = await this.prismaService.toy.delete({
        where: {id}
      })
      if (result) {
        return "deleted" +result.name
      }
      throw new InternalServerErrorException()
    }
    catch(err) {
      throw new NotFoundException(id + " could not be deleted")
    }
  }
}
