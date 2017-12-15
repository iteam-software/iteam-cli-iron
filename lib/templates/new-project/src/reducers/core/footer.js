import pkg from '../../../package.json';
import titleCase from 'title-case';

export const footer = (state = {copyright: titleCase(pkg.name)}, action) =>
  state;