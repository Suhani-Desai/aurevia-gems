import type { NextFunction, Request, Response } from 'express';
import * as enquiryService from '../services/enquiryService.js';

export async function createEnquiry(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const enquiry = await enquiryService.createEnquiry(req.body);
    res.status(201).json({
      success: true,
      message: 'Enquiry submitted',
      data: { enquiry },
    });
  } catch (error) {
    next(error);
  }
}

export async function listEnquiries(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const enquiries = await enquiryService.listEnquiries();
    res.status(200).json({
      success: true,
      data: { enquiries },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateEnquiryStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const enquiry = await enquiryService.updateEnquiryStatus(
      req.params.id,
      req.body.status,
    );
    res.status(200).json({
      success: true,
      message: 'Enquiry updated',
      data: { enquiry },
    });
  } catch (error) {
    next(error);
  }
}
