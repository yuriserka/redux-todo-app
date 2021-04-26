export type ITodo = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  last_modification: string;
};

export type ITodoDto = {
  title: string;
  description: string;
};
