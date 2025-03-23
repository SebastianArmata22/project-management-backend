import { BadRequestException, HttpException } from '@nestjs/common';
import { MongoServerError } from 'mongodb';

export function mongodbErrorHandler(error: MongoServerError): never {
  switch (error.name) {
    case 'ValidationError':
      throw new BadRequestException('Validation failed: ' + error.message);
  }
  throw new HttpException(error.message, 500);
}
