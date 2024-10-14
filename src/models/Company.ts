import User from './User';
import { Timestamp } from 'firebase/firestore';
import img1 from '../assets/images/company1.png';
import logo1 from '../assets/images/logo1.png';

export interface CompanyDetails {
  website: string;
  promoVideoLink: string;
  country: string;
  registrarOfCompanies: boolean;
  category: string;
  description: string;
  about: string;
  image: string;
  logo: string;
}

export interface RaiseDetails {
  targetAmount: number;
  deadline: Timestamp;
  minInvestment: number;
  raisePurpose: string[];
  raisedAmount: number;
  currentInvestmentsAmount: number;
}

export default class Company extends User {
  public companyDetails: CompanyDetails;
  public raiseDetails: RaiseDetails;
  public uploadedDocuments: string[];

  constructor(
    uid: string = '',
    name: string = '',
    email: string = '',
    companyDetails: CompanyDetails = {
      website: '',
      promoVideoLink: '',
      country: '',
      registrarOfCompanies: false,
      category: 'AI',
      description: '',
      about: '',
      image: img1,
      logo: logo1,
    },
    raiseDetails: RaiseDetails = {
      targetAmount: 0,
      deadline: Timestamp.now(), // Default to current time
      minInvestment: 0,
      raisePurpose: [],
      raisedAmount: 0,
      currentInvestmentsAmount: 0,
    },
    uploadedDocuments: string[] = []
  ) {
    super(uid, name, email, 'Company');
    this.companyDetails = companyDetails;
    this.raiseDetails = raiseDetails;
    this.uploadedDocuments = uploadedDocuments;
  }

  static fromJson(json: any): Company {
    return new Company(
      json.uid,
      json.name,
      json.email,
      json.companyDetails,
      {
        ...json.raiseDetails,
        deadline:
          json.raiseDetails.deadline instanceof Timestamp
            ? json.raiseDetails.deadline
            : Timestamp.fromDate(new Date(json.raiseDetails.deadline)),
      },
      json.uploadedDocuments
    );
  }

  toJson() {
    return {
      uid: this.uid,
      name: this.name,
      email: this.email,
      userType: this.userType,
      companyDetails: this.companyDetails,
      raiseDetails: {
        ...this.raiseDetails,
        deadline: this.raiseDetails.deadline.toDate().toISOString(), // Convert Timestamp to ISO string
      },
      uploadedDocuments: this.uploadedDocuments,
    };
  }

  calculateProgress(): number {
    const progress =
      (this.raiseDetails.currentInvestmentsAmount /
        this.raiseDetails.targetAmount) *
      100;
    return parseFloat(progress.toFixed(0));
  }
}
