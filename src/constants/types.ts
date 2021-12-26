export type Category = {
  _id: string;
  name: string;
  vocabularies: Vocabulary[];
};

export type Vocabulary = {
  _id: string;
  japanese: string;
  reading: string;
  english: string;
  createdDate: Date;
  categories: Category[];
};

export type User = {
  _id: string;
  username: string;
};
