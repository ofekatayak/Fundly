import User from './User';

export interface InvestorPreferences {
  categories: string[];
  investmentRange: string;
  preferenceCountry: string;
  investInPublicCompanies: boolean;
}

export default class Investor extends User {
  preferences: InvestorPreferences;

  constructor(
    uid: string,
    name: string,
    email: string,
    preferences: InvestorPreferences
  ) {
    super(uid, name, email, 'Investor');
    this.preferences = preferences;
  }

  // פונקציה להמרה ל-JSON
  toJson() {
    return {
      uid: this.uid,
      name: this.name,
      email: this.email,
      userType: this.userType,
      preferences: this.preferences,
    };
  }

  // פונקציה ליצירה מ-JSON
  static fromJson(json: any): Investor {
    return new Investor(json.uid, json.name, json.email, json.preferences);
  }
}
