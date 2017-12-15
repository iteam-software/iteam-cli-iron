import routes from '../../routes';

const items = routes.map(({caption, path: to}) => ({caption, to}));

export const nav = (state = {items}, action) => state;