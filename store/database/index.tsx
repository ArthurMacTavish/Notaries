import Realm from 'realm';
import {NotariesDataScheme} from './NotariesDataScheme';

export const database = new Realm({
  schema: [NotariesDataScheme],
});
