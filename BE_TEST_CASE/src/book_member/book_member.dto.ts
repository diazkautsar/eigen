import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsString, ValidationOptions, registerDecorator } from "class-validator"


export function IsOnlyDate(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Please provide only date like 2020-12-08',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
}

export class BorrowBookDto {
  @IsString()
  @ApiProperty()
  book_code: string

  @IsString()
  @ApiProperty()
  member_code: string

  @IsOnlyDate()
  date: string
}

export class ReturnedBookDto extends BorrowBookDto {}