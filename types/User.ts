export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  profilePicture?: string;
  nearestStationHome: string;
  walkTimeHome: number;
  nearestStationSchool: string;
  walkTimeSchool: number;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  visaType: string;
  visaStatusImage?: string;
  japaneseLevel: 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
  preferredDays: string[];
  preferredJobTypes: string[];
  workExperience: string;
  isProfileComplete: boolean;
}