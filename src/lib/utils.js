import CONSTANTS from '../constants/config';

const fetchFullURL = (path) => {
  if (!path) return null;

  return `${CONSTANTS.mediaBaseUrl}${path}`;
};

// eslint-disable-next-line import/prefer-default-export
export { fetchFullURL };
