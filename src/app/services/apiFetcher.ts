import { Injectable } from '@angular/core';
import { Category, Product } from '../interfaces/product';
import { Cart, CartProduct } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class ApiFetcherService {
  constructor() {}

  // ADD TRY CATCH TO ALL FETCHES
  async getAllProducts(): Promise<Product[]> {
    const products = await fetch(APIS.URL_BASE + APIS.PRODUCTS);
    return await products.json();
  }

  async getProduct(id: number): Promise<Product> {
    const product = await fetch(APIS.URL_BASE + APIS.PRODUCT + id);
    return await product.json();
  }

  async getCategories(): Promise<Category[]> {
    const categories = await fetch(APIS.URL_BASE + APIS.CATEGORIES);
    return await categories.json();
  }

  async getCategory(category: string): Promise<Product[]> {
	if (category === 'men' || category === 'women') {
		category = category + "'s clothing";
	}
    const categories = await fetch(APIS.URL_BASE + APIS.CATEGORY + category);
    return await categories.json();
  }

  async getCart(id: number): Promise<Cart> {
    const categories = await fetch(APIS.URL_BASE + APIS.CART + id);
    return await categories.json();
  }

  async getUserCarts(id: number): Promise<Cart[]> {
    const categories = await fetch(APIS.URL_BASE + APIS.USER_CART + id);
    return await categories.json();
  }

  async addNewCart(cart: Cart): Promise<Response> {
    const response = await fetch(APIS.URL_BASE + APIS.ADD_CART, {
      method: 'POST',
      body: JSON.stringify(cart),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async createCart(cart: Cart): Promise<Cart> {
    const response = await fetch(APIS.URL_BASE + APIS.ADD_CART, {
      method: 'POST',
      body: JSON.stringify(cart),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async updateProductInCart(id: number, cartSlice: {userId: number, date: string, products: CartProduct[]}): Promise<Response> {
    const response = await fetch(APIS.URL_BASE + APIS.UPDATE_PRODUCT + id, {
      method: 'PUT',
      body: JSON.stringify(cartSlice),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async deleteCart(id: number): Promise<Response> {
    const response = await fetch(APIS.URL_BASE + APIS.DELETE_CART + id, {
      method: 'DELETE',
    });
    return await response.json();
  }
}

export const enum APIS {
  URL_BASE = 'https://fakestoreapi.com/',
  CATEGORIES = 'products/categories',
  CATEGORY = 'products/category/',
  PRODUCTS = 'products',
  PRODUCT = 'products/',
  CART = 'carts/',
  USER_CART = 'carts/user/',
  ADD_CART = 'carts',
  UPDATE_PRODUCT = 'carts/',
  DELETE_CART = 'carts/',
}
