module.exports = (txt, options) => {
  if (!txt) return '';

  const { splitBy = ' ' } = options || {};

  let arr = txt.replaceAll('(', '').replaceAll(')', '')?.split(splitBy);

  arr = arr.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  arr.splice(0, 1, arr[0].toLowerCase());

  return arr.join('');
};
