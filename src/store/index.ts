import { create } from 'zustand';
import defaultSettings from '../settings.json';
import { Product } from '@/service/dashboard';
export interface GlobalState {
  settings?: typeof defaultSettings;
  userInfo?: {
    name?: string;
    avatar?: string;
    job?: string;
    organization?: string;
    location?: string;
    email?: string;
    permissions: Record<string, string[]>;
  };
  userLoading?: boolean;
}

const initialState: GlobalState = {
  settings: defaultSettings,
  userInfo: {
    permissions: {},
  },
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case 'update-settings': {
      const { settings } = action.payload;
      return {
        ...state,
        settings,
      };
    }
    case 'update-userInfo': {
      const { userInfo = initialState.userInfo, userLoading } = action.payload;
      return {
        ...state,
        userLoading,
        userInfo,
      };
    }
    default:
      return state;
  }
}

type AddGetter<T> = {
  [K in keyof T  as `get${Capitalize<K & string>}`]: () => T[K]
}

type AddSetter<T> = {
  [K in keyof T  as `set${Capitalize<K & string>}`]: (arg: T[K]) => void
}

type ProductsStore = {
  products: Product[]
}

export const useProductsStore = create<ProductsStore & AddGetter<ProductsStore> & AddSetter<ProductsStore>>((set, get) => ({
  products: null,
  setProducts: (products) => void set({ products }),
  getProducts: () => get().products,
}))