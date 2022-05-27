import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Query,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  
  @Get('/whoami')
  getCurrentUser(@Session() session: any) {
    console.log(session.userId);
    
    return this.userService.findOne(session.userId);
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    console.log('halo');
    
    session.userId = null;
  }

  @Serialize(UserDto)
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    console.log('handler is running');

    const user = await this.userService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }


  // TODO: Change status to 200
  @Post('/signin')
  async signin(
    @Body()
    body: CreateUserDto /* TODO: Create new DTO even though this one works */,
    @Session() session: any
  ) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // return this.userService.create(body.email, body.password);
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
