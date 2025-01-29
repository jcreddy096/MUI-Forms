import { create } from "zustand";
import { IProduct } from "../Schema/Schema"; // Assuming your schema is in the given path

type ProductFormState = {
  formData: IProduct;
  setFormData: (data: Partial<IProduct>) => void;
  resetForm: () => void;
}

export const useProductStore = create<ProductFormState>((set) => ({
  formData: {
    id: undefined,
    title: "",
    description: "",
    price: 0,
    mrp: 0,
    status: "active",
    rating: 0,
    review: "",
    brand: "",
  },
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () =>
    set({
      formData: {
        id: undefined,
        title: "",
        description: "",
        price: 0,
        mrp: 0,
        status: "active",
        rating: 0,
        review: "",
        brand: "",
      },
    }),
}));
