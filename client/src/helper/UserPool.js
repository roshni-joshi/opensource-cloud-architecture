import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_3WtlPgRWP',
  ClientId: '7a9p01q4dt85pvok3kgm10vq48',
};

export default new CognitoUserPool(poolData);
