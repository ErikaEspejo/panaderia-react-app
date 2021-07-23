import * as Users from './users';
import * as Providers from './providers';
import * as Supplies from './supplies';
import * as Products from './products';

const API = {
  ...Users,
  ...Providers,
  ...Supplies,
  ...Products,
};

export default API;
