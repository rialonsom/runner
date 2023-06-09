import Realm from 'realm';
import { createRealmContext } from '@realm/react';
import { Run } from './run/runModel';

const realmConfig: Realm.Configuration = {
  schema: [Run],
};

export const { RealmProvider, useObject, useQuery, useRealm } =
  createRealmContext(realmConfig);
