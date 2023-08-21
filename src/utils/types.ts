export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type loginUser = {
  username: string;
  password: string;
};

export type CreateProductParams = {
  name: string;
  description?: string | null;
  price: number;
};

export type UpdateProductParams = {
  name: string;
  description?: string | null;
  price: number;
};
