import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_s1iFxhZ7I',
  ClientId: '7lmkt3ggs4hh30su7b8eao1jfu',
};

export default new CognitoUserPool(poolData);
