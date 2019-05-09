// CPF Validator for NestJS
import {
	ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'isCPF', async: false })
export class IsCPF implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments) {
    let sum: number;
    let rest: number;

    if (cpf === undefined || cpf.trim().length === 0 || cpf === '00000000000') {
      return false;
    }
    const auxCpf = cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '');

    sum = 0;
    for (let i = 1; i <= 9; i += 1) {
      sum = sum + parseInt(auxCpf.substring(i - 1, i), 10) * (11 - i);
    }
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
      rest = 0;
    }
    if (rest !== parseInt(auxCpf.substring(9, 10), 10)) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i += 1) {
      sum = sum + parseInt(auxCpf.substring(i - 1, i), 10) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
      rest = 0;
    }
    if (rest !== parseInt(auxCpf.substring(10, 11), 10)) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    if (args.value.lenght !== 11) {
      return 'The CPF value must be contains 11 digits!';
    } else {
      return 'The value <$value> isn\'t a valid CPF!';
    }
  }
}
