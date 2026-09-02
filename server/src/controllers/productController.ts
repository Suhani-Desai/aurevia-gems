import type { NextFunction, Request, Response } from 'express';
import * as productService from '../services/productService.js';
import type { ProductQueryInput } from '../validators/productValidators.js';

export async function listProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const products = await productService.listProducts(
      req.query as unknown as ProductQueryInput,
    );
    res.status(200).json({
      success: true,
      data: { products },
    });
  } catch (error) {
    next(error);
  }
}

export async function getProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      data: { product },
    });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      message: 'Product created',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Product updated',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Product deleted',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
