export type Image = {
  src: string;
  text: string;
};

export type TImages = {
  desktop: {
    first: Image;
    second: Image;
    third: Image;
  };
  mobile: Image;
};
