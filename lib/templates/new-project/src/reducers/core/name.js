import pkg from '../../../package.json';
import titleCase from 'title-case';

export const name = (state = titleCase(pkg.name), action) => state;