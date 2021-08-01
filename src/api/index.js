import * as Users from './users';
import * as Providers from './providers';
import * as Supplies from './supplies';
import * as Products from './products';
import * as Production from './production';
import * as Costs from './costs';
import * as Workers from './workers';
import * as Sales from './sales';
import * as Quality from './quality';
import * as Others from './others';

const API = {
  ...Users,
  ...Providers,
  ...Supplies,
  ...Products,
  ...Production,
  ...Costs,
  ...Workers,
  ...Sales,
  ...Quality,
  ...Others,
};

export default API;
