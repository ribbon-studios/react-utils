import { describe, it, expect } from 'vitest';
import { Algorithms, hash } from '../../utils/subtle-crypto';

describe('Crypto Utils', () => {
  describe('fn(hash)', () => {
    it.each([
      ['SHA-1', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'],
      ['SHA-256', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'],
      ['SHA-384', '768412320f7b0aa5812fce428dc4706b3cae50e02a64caa16a782249bfe8efc4b7ef1ccb126255d196047dfedf17a0a9'],
      [
        'SHA-512',
        'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff',
      ],
    ])('should support %s', async (algorithm: Algorithms, expectedValue: string) => {
      await expect(hash(algorithm, 'test')).resolves.toEqual(expectedValue);
    });

    it('should support being provided null', async () => {
      await expect(hash('SHA-256', null)).resolves.toEqual(undefined);
    });

    it('should support being provided undefined', async () => {
      await expect(hash('SHA-256', undefined)).resolves.toEqual(undefined);
    });

    it('should support being provided no algorithm', async () => {
      await expect(hash(undefined, 'test')).resolves.toEqual(undefined);
    });

    it('should support default values', async () => {
      const defaultValue = 'hello';

      await expect(hash(undefined, 'test', defaultValue)).resolves.toEqual(defaultValue);
    });
  });
});
