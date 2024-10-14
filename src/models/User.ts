// src/models/User.ts
export type UserType = 'Investor' | 'Company' | 'Admin' | 'uknown';

export default class User {
  constructor(
    public uid: string,
    public name: string,
    public email: string,
    public userType: string
  ) {}

  toJson() {
    return {
      uid: this.uid,
      name: this.name,
      email: this.email,
      userType: this.userType,
    };
  }

  userToJSON() {
    return this.toJson();
  }

  static fromJson(json: any): User {
    return new User(json.uid, json.name, json.email, json.userType);
  }
}
