export class AppUser{
  id: string;
  handle: string;
  name: string;
  lastName: string;
  visits: Visit[];
  monuments: Monument[];

}

export class Visit {
  userId: string;
  monumentId: string;
  now: Date;
}

export class Route {
  id: string;
  name: string;
  monuments: Monument[];
}

export class Monument {
  id: string;
  information: Information[];
  longitude: number;
  latitude: number;
  area: string;
  picture?: string;
}

export class Information {
  language: Language;
  name: String;
  description: String;
  question: Question[];
}

export class Question {
  question?: string;
  answer: string;
}

export enum Language {
  NL = 'NL',
  FR = 'FR',
  EN = 'EN',
  DE = 'DE'
}
