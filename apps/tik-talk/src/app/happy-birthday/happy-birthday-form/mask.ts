import type { MaskitoOptions } from '@maskito/core';

export const phoneMask: MaskitoOptions = {
  mask: [
    '+',
    '7',
    ' ',
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
};

export const dateMask: MaskitoOptions = {
  mask: [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/], // Маска для даты ДД.ММ.ГГГГ
};

export const timeMask: MaskitoOptions = {
  mask: [/\d/, /\d/, ':', /\d/, /\d/], // Маска для времени ЧЧ:ММ
};
