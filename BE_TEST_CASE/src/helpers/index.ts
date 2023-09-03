import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class Helpers {
  response({
    res,
    statusCode,
    success,
    message,
    data,
    error,
  }: {
    res: Response;
    statusCode: number;
    success: boolean;
    message: string;
    data?: any | null;
    error?: string | null;
  }) {
    res.status(statusCode).json({
      statusCode,
      success,
      message,
      data,
      error,
    });
  }

  createNewDataMemberCode (lastData: string) {
    const lastNumber = parseInt(lastData.substring(1), 10);
    const newNumber = lastNumber + 1;
    const newData = `M${String(newNumber).padStart(3, '0')}`;

    return newData; 
  }
}
