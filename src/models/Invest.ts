import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';

class Invest {
  investId: string;
  investorUid: string;
  companyUid: string;
  investNumber: number;
  investAmount: number;
  investDate: Timestamp;

  constructor(
    investorUid: string,
    companyUid: string,
    investNumber: number,
    investAmount: number,
    investId?: string,
    investDate?: Timestamp
  ) {
    this.investId = investId ?? uuidv4();
    this.investorUid = investorUid;
    this.companyUid = companyUid;
    this.investNumber = investNumber;
    this.investAmount = investAmount;
    this.investDate = investDate ?? Timestamp.now(); // Initialize to current timestamp if not provided
  }

  toJson() {
    return {
      investId: this.investId,
      investorUid: this.investorUid,
      companyUid: this.companyUid,
      investNumber: this.investNumber,
      investAmount: this.investAmount,
      investDate: this.investDate, // Firestore can directly store Timestamp objects
    };
  }

  static fromJson(json: { [key: string]: any }): Invest {
    return new Invest(
      json.investorUid,
      json.companyUid,
      json.investNumber,
      json.investAmount,
      json.investId,
      json.investDate instanceof Timestamp
        ? json.investDate
        : Timestamp.fromDate(new Date(json.investDate))
    );
  }

  // Helper method to get JavaScript Date object if needed
  getInvestDate(): Date {
    return this.investDate.toDate();
  }
}

export default Invest;
