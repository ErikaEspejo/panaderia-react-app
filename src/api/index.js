import * as Users from './users';
import * as Providers from './providers';
import * as Supplies from './supplies';

const API = {
  ...Users,
  ...Providers,
  ...Supplies,
};

export default API;
