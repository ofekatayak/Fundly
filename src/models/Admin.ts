// src/models/Admin.ts

import User, { UserType } from './User';

export default class Admin extends User {
  constructor(uid: string, name: string, email: string, type: UserType) {
    super(uid, name, email, 'Admin');
  }
}
