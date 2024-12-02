import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';
import { Type } from 'class-transformer';

@Injectable()
export class ChildrenService {

  constructor(private readonly prismaService : PrismaService) {}

  create(createChildDto: CreateChildDto, @Res() res) {
    try{ this.prismaService.child.create({
      data:createChildDto
    })
    return res.status(HttpStatus.CREATED).json("Child created successfully", createChildDto)
  }
  catch(err) {
    throw new Error(err)
  }
  }

  findAll() {
    return this.prismaService.child.findMany({})
  }


  findOne(id: number) {
    try {
    return this.prismaService.child.findUnique({
      where: {id}
    })
  }
  catch(err) {
    throw new Error(err)
  }
  }

  update(id: number, updateChildDto: UpdateChildDto) {
    try {
    return this.prismaService.child.update({
      where: {id},
      data: updateChildDto
    })
    }
    catch (err) {
      throw new Error(err)
    }
  }

  remove(id: number) {
    try {
    return this.prismaService.child.delete({
      where: {id}
    })
  }
  catch(err) {
    throw new Error(err)
  }
  }

  addToyToChild(childid: number, toyid: number){

    this.findOne(childid)
    
    try {
      return this.prismaService.childrenToToys.create({
        data: {
          child_id: childid,
          toy_id: toyid,
        }
      })
    }
    catch(err){
      throw new Error(err)
    }

  }
}
