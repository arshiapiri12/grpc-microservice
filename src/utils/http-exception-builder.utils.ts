import { RpcException } from '@nestjs/microservices';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  PreconditionFailedException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { status as grpcStatus } from '@grpc/grpc-js';

export class GRPCError extends RpcException {
  code: grpcStatus;
  details: string;
}

/** سازنده اکسپشن‌های http */
export class HttpExceptionBuilder {
  public convert(err: GRPCError): HttpException {
    switch (err.code) {
      case grpcStatus.CANCELLED:
        return new BadRequestException(err.details);

      case grpcStatus.UNKNOWN:
        return new InternalServerErrorException(err.details);

      case grpcStatus.INVALID_ARGUMENT:
        return new BadRequestException(err.details);

      case grpcStatus.DEADLINE_EXCEEDED:
        return new BadRequestException(err.details);

      case grpcStatus.NOT_FOUND:
        return new NotFoundException(err.details);

      case grpcStatus.ALREADY_EXISTS:
        return new ConflictException(err.details);

      case grpcStatus.PERMISSION_DENIED:
        return new ForbiddenException(err.details);

      case grpcStatus.FAILED_PRECONDITION:
        return new PreconditionFailedException(err.details);

      case grpcStatus.ABORTED:
        return new BadRequestException(err.details);

      case grpcStatus.OUT_OF_RANGE:
        return new PreconditionFailedException(err.details);

      case grpcStatus.UNIMPLEMENTED:
        return new NotImplementedException(err.details);

      case grpcStatus.INTERNAL:
        return new InternalServerErrorException(err.details);

      case grpcStatus.UNAVAILABLE:
        return new ServiceUnavailableException(err.details);

      case grpcStatus.DATA_LOSS:
        return new InternalServerErrorException(err.details);

      case grpcStatus.UNAUTHENTICATED:
        return new UnauthorizedException(err.details);
    }

    return new InternalServerErrorException(err.details);
  }
}
