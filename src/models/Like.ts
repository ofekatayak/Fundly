// src/models/Like.ts
export default class Like {
  constructor(
    public likeId: string,
    public userId: string,
    public companyId: string
  ) {}

  toJson() {
    return {
      likeId: this.likeId,
      userId: this.userId,
      companyId: this.companyId,
    };
  }

  static fromJson(data: any): Like {
    return new Like(data.likeId, data.userId, data.companyId);
  }
}
