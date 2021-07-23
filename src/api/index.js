import * as Users from './users';
import * as Providers from './providers';
import * as Supplies from './supplies';
import * as Products from './products';
import * as Production from './production';
import * as Costs from './costs';
import * as Workers from './workers';
import * as Sales from './sales';

const API = {
  ...Users,
  ...Providers,
  ...Supplies,
  ...Products,
  ...Production,
  ...Costs,
  ...Workers,
  ...Sales,
};

export default API;
