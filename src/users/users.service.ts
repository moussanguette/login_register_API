import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginCredentialDto } from './dto/login-credential.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async register(createUserDto: CreateUserDto) : Promise<Partial<User>>{
    //const userEntity = new User();
    const { prenom, nom, email, password, age } = createUserDto;
    const userEntity = this.userRepository.create({
      ...createUserDto // recuperer tous les informations de createUserDto
    });
    userEntity.salt = await bcrypt.genSalt() // generer un salt
    userEntity.password = await bcrypt.hash(userEntity.password, userEntity.salt) // recuperer mot de passe et affecter au password
    // sauvegarde des informations
    try{
      await this.userRepository.save(userEntity)
    }
    catch(e){
      throw new ConflictException('le mail et le password doivent etre unique !')
    }
    // retourner les informations que nous avons besoin
    const userEntityInfo = {
      id : userEntity.id,
      prenom : userEntity.prenom,
      nom : userEntity.nom,
      email : userEntity.email,
      age : userEntity.age
    }
    return userEntityInfo;
  }

  async login(loginCredentialDto : LoginCredentialDto): Promise<Partial<User>>{
    // recuperation du login et du mot de passe
    const {email, password } = loginCredentialDto

    // verifier si l'utilisateur existe
    const user = await this.userRepository.createQueryBuilder("user")
      .where("user.email = :email or user.username= :email ",
      {email}
      )
      .getOne();// recuperer une seule entité
    console.log(user);
    
    // si not user declancher une erreur
    if(!user)
      throw("user ou mot de passe erronéé")

    // si user exit verifier que le password est correct
    const hashPassword = await bcrypt.hash(password, user.salt)
    if (hashPassword === user.password){
      return {
        email : user.email,
        id : user.id
      }
    }
    else{
      throw("user ou mot de passe erronéé")
    }

  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
