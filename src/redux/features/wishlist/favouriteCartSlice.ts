import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  variant: Variant;
  orderQuantity: 0;
  variantName: string;
  variantId: string;
  discountPercentage: number;
  discountedPrice: number;
  inStock: number;
  isDefault: boolean;
  sellingPrice: number;
  stockAlert: number;
  price: number;
  productId: string;
}

interface Variant {
  isDefault: boolean;
  discountedPrice?: number;
  sellingPrice: number;
}

interface CartState {
  products: Product[];
  subTotal: number;
  discount: number;
}

const initialState: CartState = {
  products: [],
  subTotal: 0,
  discount: 0,
};

// <== Function to save state into localStorage ==>
const saveStateToLocalStorage = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("favourite", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

// <== Function to load state from localStorage ==>
const loadStateFromLocalStorage = (): CartState | undefined => {
  try {
    const serializedState = localStorage.getItem("favourite");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

const productCartSlice = createSlice({
  name: "favourite",
  initialState: loadStateFromLocalStorage() || initialState,
  reducers: {
    addToFavourite: (state, action: PayloadAction<Product>) => {
      const addedProduct = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) =>
          product._id === addedProduct._id &&
          product.variantName === addedProduct.variantName
      );

      if (existingProductIndex !== -1) {
        return;
        // state.products[existingProductIndex].orderQuantity += 1;
      } else {
        state.products.push(addedProduct);
      }

      state.subTotal = calculateSubTotal(state.products);
      saveStateToLocalStorage(state);
    },
    removeOneFromFavourite: (state, action: PayloadAction<Product>) => {
      const removedProduct = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) =>
          product._id === removedProduct._id &&
          product.variantName === removedProduct.variantName
      );

      if (
        existingProductIndex !== -1 &&
        state.products[existingProductIndex].orderQuantity > 1
      ) {
        state.products[existingProductIndex].orderQuantity -= 1;
      }

      state.subTotal = calculateSubTotal(state.products);
      saveStateToLocalStorage(state);
    },
    removeFromFavourite: (state, action: PayloadAction<Product>) => {
      const removedProduct = action.payload;
      state.products = state.products.filter(
        (product) =>
          !(
            product._id === removedProduct._id &&
            product.variantName === removedProduct.variantName
          )
      );

      state.subTotal = calculateSubTotal(state.products);
      saveStateToLocalStorage(state);
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      saveStateToLocalStorage(state);
    },
    increaseFavQuantity: (state, action: PayloadAction<Product>) => {
      const { _id, variantName } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) => product._id === _id && product.variantName === variantName
      );

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].orderQuantity += 1;
        state.subTotal = calculateSubTotal(state.products);
        saveStateToLocalStorage(state);
      }
    },
    decreaseFavQuantity: (state, action: PayloadAction<Product>) => {
      const { _id, variantName } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) => product._id === _id && product.variantName === variantName
      );

      if (
        existingProductIndex !== -1 &&
        state.products[existingProductIndex].orderQuantity > 1
      ) {
        state.products[existingProductIndex].orderQuantity -= 1;
        state.subTotal = calculateSubTotal(state.products);
        saveStateToLocalStorage(state);
      }
    },
    resetCart: (state) => {
      localStorage.removeItem("favourite");
      return initialState;
    },
  },
});

const calculateSubTotal = (products: Product[]): number => {
  return products.reduce((total, product) => {
    return total + product.price * product.orderQuantity;
  }, 0);
};

export const {
  addToFavourite,
  removeFromFavourite,
  removeOneFromFavourite,
  setDiscount,
  resetCart,
  increaseFavQuantity,
  decreaseFavQuantity,
} = productCartSlice.actions;
export default productCartSlice.reducer;
