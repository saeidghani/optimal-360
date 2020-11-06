import CONSTANTS from '../constants/config';

const fetchFullURL = (path) => {
  if (!path) return null;

  return `${CONSTANTS.mediaBaseUrl}${path}`;
};

const generateNewPassword = () => {
  return Math.random().toString(36).slice(-8);
};

// eslint-disable-next-line import/prefer-default-export
export { fetchFullURL, generateNewPassword };
