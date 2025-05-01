import { pathsToModuleNameMapper } from 'ts-jest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tsconfig = JSON.parse(
  readFileSync(resolve(__dirname, '../../tsconfig.json'), 'utf8')
);

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/../../',
  }),
};
