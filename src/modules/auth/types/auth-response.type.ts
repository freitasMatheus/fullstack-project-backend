import { AccessTokenType } from './access-token.type';

export type AuthResponseType = AccessTokenType & {
  user: {
    id: number;
    email: string;
  };
};
