import { BadRequestException, ConflictException, HttpStatus, Injectable, NotAcceptableException, NotFoundException, Res } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';
import { ToysService } from 'src/toys/toys.service';

@Injectable()
export class ChildrenService {

  constructor(
    private readonly prismaService : PrismaService,
    private readonly toysService: ToysService) {}

  async create(createChildDto: CreateChildDto) {
    try{ await this.prismaService.child.create({
      data:createChildDto
    })
    return createChildDto.name + " sikeresen létrehozva"
  }
  catch(err) {
    throw new Error(err)
  }
  }

  async findAll() {
    return await this.prismaService.child.findMany({
      include: {
        ctt : {
        include: {
          toys:true
        }
      }
      }
    })
  }


  async findOne(id: number) {
    try {
    const child = await this.prismaService.child.findUnique({
      where: {id}
    })
  }
  catch(err) {
    throw new NotFoundException("child not found")
  }
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    try {
    return await this.prismaService.child.update({
      where: {id},
      data: updateChildDto
    })
    }
    catch (err) {
      throw new Error(err)
    }
  }

  async remove(id: number) {
    try {
    return await this.prismaService.child.delete({
      where: {id}
    })
  }
  catch(err) {
    throw new Error("Could not delete")
  }
  }

  async addToyToChild(childid: number, toyid: number){
    try {
      if (!this.findOne(childid))
        {
          throw new NotFoundException()
        }
      if (!this.toysService.findOne(toyid)) 
        {
          throw new NotFoundException()
        }
  
      if ((await this.prismaService.child.findUnique({where: {id:childid}})).behaved == false) {
        throw new ConflictException()
      }

      return await this.prismaService.childrenToToys.create({
        data: {
          child_id: childid,
          toy_id: toyid,
        }
      })
    }
    catch(err){
      throw new ConflictException("Child already has this toy or did not behave.")
  }
}

  async removeToyFromChild(childid: number, toyid: number){

    try {
      const result = await this.prismaService.childrenToToys.deleteMany(
        {where:
          {
            child_id : childid,
            toy_id : toyid
          }
        }
      )
      if (result.count == 0) {
        throw new Error()
      }
    }
    catch(err){
      throw new BadRequestException(`No child with id ${childid} found with toy id ${toyid} `)
    }

  }
}
