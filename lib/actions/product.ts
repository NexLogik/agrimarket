'use server';

import prisma from '@/lib/prisma';
import { Product } from '@prisma/client';

type GetProductsResponse = {
  status: number;
  message: string;
  data: Product[];
};

export const getAllProducts = async (): Promise<GetProductsResponse> => {
  try {
    const products = await prisma.product.findMany();

    return {
      status: 200,
      message: 'Products retrieved successfully',
      data: products,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: 'Error retrieving products', data: [] };
  }
};

type CreateProductData = {
  id: number;
  name: string;
  userId: number;
  description: string;
  price: number;
};

type ProductResponse = {
  status: number;
  message: string;
};

export const createProduct = async (
  data: CreateProductData
): Promise<ProductResponse> => {
  try {
    await prisma.product.create({
      data: {
        name: data.name,
        userId: data.userId,
        description: data.description,
        price: data.price,
      },
    });

    return { status: 200, message: 'Product created successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, message: 'Error creating product' };
  }
};

type UpdateProductResponse = {
  status: number;
  message: string;
};

type UpdateProductData = {
  name: string;
  description: string;
  price: number;
};

export const updateProduct = async (
  id: number,
  data: UpdateProductData
): Promise<UpdateProductResponse> => {
  try {
    const isProductFound = await prisma.product.findUnique({
      where: { id },
    });

    if (!isProductFound) {
      return { status: 404, message: 'Product not found' };
    }

    await prisma.product.update({
      where: { id },
      data: {
        name: data.name ? data.name : isProductFound.name,
        description: data.description
          ? data.description
          : isProductFound.description,
        price: data.price ? data.price : isProductFound.price,
      },
    });

    return { status: 200, message: 'Product updated successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, message: 'Error updating product' };
  }
};

type DeleteProductResponse = {
  status: number;
  message: string;
};

export const deleteProduct = async (
  id: number
): Promise<DeleteProductResponse> => {
  try {
    const isProductFound = await prisma.product.findUnique({
      where: { id },
    });

    if (!isProductFound) {
      return { status: 404, message: 'Product not found' };
    }

    await prisma.product.delete({
      where: { id },
    });

    return { status: 200, message: 'Product deleted successfully' };
  } catch (error) {
    console.log(error);
    return { status: 500, message: 'Error deleting product' };
  }
};
