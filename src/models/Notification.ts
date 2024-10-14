import { Timestamp } from "firebase/firestore";

class MyNotification {
  constructor(
    public senderId: string,
    public reciverId:string,
    public subject: string,
    public description: string,
    public createdAt: Timestamp = Timestamp.now()
  ) {}

  toJson(): object {
    return {
      senderId: this.senderId,
      reciverId:this.reciverId,
      subject: this.subject,
      description: this.description,
      createdAt: this.createdAt, // Firestore can directly store Timestamp objects
    };
  }

  static fromJson(json: any): MyNotification {
    return new MyNotification(
      json.senderId,
      json.reciverId,
      json.subject,
      json.description,
      json.createdAt instanceof Timestamp ? json.createdAt : Timestamp.now()
    );
  }
}

export default MyNotification;
