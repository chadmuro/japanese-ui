export type Category = {
  _id: string;
  name: string;
};

export type Vocabulary = {
  _id: string;
  japanese: string;
  reading: string;
  english: string;
  createdDate: Date;
  categories: Category[];
};
