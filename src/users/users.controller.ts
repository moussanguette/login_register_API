import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginCredentialDto } from './dto/login-credential.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
    ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) : Promise<Partial<User>>{
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginCredentialDto: LoginCredentialDto) : Promise<Partial<User>>{
    return this.usersService.login(loginCredentialDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
