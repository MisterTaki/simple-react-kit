const NODE_ENV = process.env.NODE_ENV;

const baseURLs = {
  development: '',
  test: '',
  production: '',
};

export const baseURL = baseURLs[NODE_ENV];
