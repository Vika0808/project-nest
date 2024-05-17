
import { Injectable } from '@nestjs/common';
//import * as mysql from 'mysql2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../create-user.dto';

@Injectable()
export class UserService {
  //private connection;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
   
    // console.log('CONNECT USER');
    // this.connection = mysql.createConnection({
    //   host: 'localhost',
    //   user: 'root',
    //   password: 'password',
    //   database: 'db'
    // });

    // this.connection.connect(err => {
    //   if (err) {
    //     console.log('ERROR CONNETING', err);
    //     return;
    //   }

    //   console.log('Succeesfully connected');
    // });

    // this.connection.query('SELECT * FROM Users', (err, result) => {
    //   if (err) {
    //     console.log('Error reading users', err);
    //   }

    //   console.log('Reading users: OK.');
    //   console.log(result);

    // })
  }



  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { username, email, password, dateOfBirth } = createUserDto;
    const query = `INSERT INTO Users (username, email, password, date) VALUES (?, ?, ?, ?)`;
    const values = [username, email, password, dateOfBirth];
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.date = dateOfBirth;
    const newuser = this.usersRepository.create(user);

    return this.usersRepository.save(newuser);

    // return new Promise((resolve, reject) => {
    //   this.connection.query(query, values, (error, results) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve(results);
    //     }
    //   });
    // });


  }

  async getUsers () {
    return this.usersRepository.find();
  }
}
