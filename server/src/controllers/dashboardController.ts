import type { NextFunction, Request, Response } from 'express';
import * as dashboardService from '../services/dashboardService.js';

export async function getSummary(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const summary = await dashboardService.getDashboardSummary();
    res.status(200).json({
      success: true,
      data: { summary },
    });
  } catch (error) {
    next(error);
  }
}
