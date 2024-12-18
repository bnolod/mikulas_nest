import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { Type } from 'class-transformer';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childrenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childrenService.update(+id, updateChildDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childrenService.remove(+id);
  }

  @Put(':childid/toys/:toyid')
  addToyToChild(
    @Param('childid', ParseIntPipe) childid: number,
    @Param('toyid', ParseIntPipe) toyid: number,
  ) {
    return this.childrenService.addToyToChild(childid, toyid);
  }
  
  @Delete(':childid/toys/:toyid')
  removeToyFromChild(
    @Param('childid', ParseIntPipe) childid: number,
    @Param('toyid', ParseIntPipe) toyid: number,
  ) {
    return this.childrenService.removeToyFromChild(childid, toyid);
  }
  
}
