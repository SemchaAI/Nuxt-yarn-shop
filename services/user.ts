import type IUser from '@/models/IUser';
import type { IAuthResponse } from '@/models/response/AuthResponce';
import {
  USER_ROUTE_LOGIN,
  USER_ROUTE_LOGOUT,
  USER_ROUTE_REGISTRATION,
  USER_ROUTE_USERS,
} from '@/utils/consts';

export const UserService = {
  async login(email: string, password: string) {
    const http = server();
    return await http(USER_ROUTE_LOGIN, {
      method: 'POST',
      body: {
        email,
        password,
      },
    });
  },
  async logout(): Promise<void> {
    const http = server();
    return http(USER_ROUTE_LOGOUT, { method: 'POST' });
  },
  async registration(
    email: string,
    password: string,
    name: string
  ): Promise<IAuthResponse> {
    const http = server();
    return http<IAuthResponse>(USER_ROUTE_REGISTRATION, {
      method: 'POST',
      body: {
        email,
        password,
        name,
      },
    });
  },
  async getAllUsers(): Promise<IUser[]> {
    const http = server();
    return http<IUser[]>(USER_ROUTE_USERS);
  },

  // async registration(
  //   email: string,
  //   password: string,
  //   name: string
  // ): Promise<AxiosResponse<IAuthResponse>> {
  //   return server.post<IAuthResponse>(USER_ROUTE_REGISTRATION, { email, password, name })
  // },
  // async logout(): Promise<void> {
  //   return server.post(USER_ROUTE_LOGOUT)
  // },
  // async getAllUsers(): Promise<AxiosResponse<IUser[]>> {
  //   return server.get<IUser[]>(USER_ROUTE_USERS)
  // }
};
