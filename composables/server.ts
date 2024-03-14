import type { FetchResult, UseFetchOptions } from '#app';

function initOptions() {
  const { isLogin } = useUserStore();
  const config = useRuntimeConfig();

  const opts = {
    baseURL: config.public.PUBLIC_BASE_URL,
    credentials: 'include' as RequestCredentials,
    retry: 1,
    retryStatusCodes: [401],

    // headers: isLogin
    //   ? { Authorization: `Bearer ${localStorage.getItem('auth')}` }
    //   : {},

    async onRequest({ options }) {
      console.log(options);
      options.headers = {
        Authorization: `Bearer ${localStorage.getItem('auth')}` as string,
      }; // send token
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.log('HERE');
    },

    async onResponseError({ response }) {
      const { state: data, setError } = useErrorStore();
      if (response.status === 401) {
        await $fetch('/user/refresh', {
          baseURL: config.public.PUBLIC_BASE_URL,
          method: 'GET',
          server: false,
          credentials: 'include',
          onResponse({ response }) {
            localStorage.setItem('auth', response._data.accessToken);
            console.log('Токен обновлен');
            console.log(response);
          },
        });
      } else {
        console.log(response._data, 'HERE');
        setError({
          message: response._data.message,
          critical: false,
        });
      }
    },
  };
  return opts;
}

export default () => $fetch.create(initOptions());
