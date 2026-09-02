import type { NextFunction, Request, Response } from 'express';
import * as inventoryService from '../services/inventoryService.js';
import type { TransactionQueryInput } from '../validators/inventoryValidators.js';

export async function stockIn(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await inventoryService.stockIn(req.body);
    res.status(200).json({
      success: true,
      message: 'Stock received',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function stockOut(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await inventoryService.stockOut(req.body);
    res.status(200).json({
      success: true,
      message: 'Stock issued',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function adjustStock(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await inventoryService.adjustStock(req.body);
    res.status(200).json({
      success: true,
      message: 'Stock adjusted',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function listTransactions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transactions = await inventoryService.listTransactions(
      req.query as unknown as TransactionQueryInput,
    );
    res.status(200).json({
      success: true,
      data: { transactions },
    });
  } catch (error) {
    next(error);
  }
}

export async function listTransactionsByProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transactions = await inventoryService.listTransactionsByProduct(
      req.params.productId,
    );
    res.status(200).json({
      success: true,
      data: { transactions },
    });
  } catch (error) {
    next(error);
  }
}

export async function listLowStock(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const products = await inventoryService.listLowStockProducts();
    res.status(200).json({
      success: true,
      data: { products },
    });
  } catch (error) {
    next(error);
  }
}
