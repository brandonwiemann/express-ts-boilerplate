import stringToNumber from './transformer/stringToNumber';
import { ColumnOptions } from 'typeorm';

export const money: ColumnOptions = {
    type: 'decimal',
    precision: 13,
    scale: 2,
    default: 0.00,
    transformer: stringToNumber
}
