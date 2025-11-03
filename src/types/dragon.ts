export interface Dragon {
  id: string;
  name: string;
  type: string;
  createdAt: string;
}

export type DragonFormFields = Omit<Dragon, "id" | "createdAt">;
