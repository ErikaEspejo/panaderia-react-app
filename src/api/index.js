import * as Users from './users';
import * as Providers from './providers';
import * as Supplies from './supplies';
import * as Products from './products';
import * as Production from './production';

const API = {
  ...Users,
  ...Providers,
  ...Supplies,
  ...Products,
  ...Production,
};

export default API;
