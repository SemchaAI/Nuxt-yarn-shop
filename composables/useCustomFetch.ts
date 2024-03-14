import type { UseFetchOptions } from '#app';
import { defu } from 'defu';

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const userAuth = useCookie('token');
  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBase,
    // this overrides the default key generation, which includes a hash of
    // url, method, headers, etc. - this should be used with care as the key
    // is how Nuxt decides how responses should be deduplicated between
    // client and server
    // key: url,
    key: url,
    server: false,
    retry: 1,
    retryStatusCodes: [401, 400],

    // set user token if connected
    headers: userAuth.value
      ? { Authorization: `Bearer ${localStorage.getItem('auth')}` }
      : {},

    onRequest({ options }) {
      options.headers = userAuth.value
        ? { Authorization: `Bearer ${localStorage.getItem('auth')}` } // send token
        : {};
    },
    async onResponseError({ response, options }) {
      if (response.status === 401) {
        await useFetch('/user/refresh', {
          baseURL: config.public.apiBaseUrl,
          method: 'POST',
          server: false,
          credentials: 'include',

          onResponse({ response }) {
            localStorage.setItem('auth', response._data.accessToken);
          },
        });
      }
    },
  };

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults);

  return useFetch(url, params);
}

// server.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('auth')}`;
//   return config;
// });
// server.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status == 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await axios.get<IAuthResponse>(
//           `${import.meta.env.VITE_BASE_URL}/user/refresh`,
//           {
//             withCredentials: true,
//           }
//         );
//         localStorage.setItem('auth', response.data.accessToken);
//         console.log('Токен обновлен');
//         // console.log(server.request(originalRequest))
//         return server.request(originalRequest);
//       } catch (e) {
//         //START ERROR BLOCK
//         const error = useErrorStore();
//         error.setError({
//           message:
//             'Вы не авторизованны. Пожалуйста, авторизуйтесь. Или обновите страницу.',
//           critical: false,
//         });
//       }
//     }
//     throw error;
//   }
// );
