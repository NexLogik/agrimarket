'use server';

import prisma from '@/lib/prisma';

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

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type ProductResponse = {
  status: number;
  message: string;
};

export const createProduct = async (
  data: Product
): Promise<ProductResponse> => {
  try {
    await prisma.product.create({
      data: {
        name: data.name,
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
