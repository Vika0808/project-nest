
import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  private connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'user',
      password: 'password',
      database: 'db'
    });

    this.connection.connect();
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { username, email, password, dateOfBirth } = createUserDto;
    const query = `INSERT INTO Users (username, email, password, date) VALUES (?, ?, ?, ?)`;
    const values = [username, email, password, dateOfBirth];

    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
