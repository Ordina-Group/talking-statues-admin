export class Monument {
    id: string;
    information:Information[];
    longitude: number;
    latitude: number;
    area: String
  }
  
  export class Information {
    language:Language;
    name: String;
    description: String;
    question:Question[];
  }
  
  export class Question{
    question: String;
    answer: String;
  }
  
  export enum Language {
    NL = 'NL',
    FR = 'FR',
    EN = 'EN',
    DE = 'DE'
  }
  
  