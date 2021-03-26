export default (props, propName, componentName) => {
  componentName = componentName || 'ANONYMOUS';

  // eslint-disable-next-line react/destructuring-assignment
  const spacingType = props[propName];

  if (spacingType === undefined) {
    return null;
  }

  if (Array.isArray(spacingType)) {
    if (
      spacingType.length > 4 ||
      spacingType.length < 1 ||
      !spacingType.every(item => isValidToken(item))
    ) {
      return new Error(
        `Invalid prop '${propName}' requires an array length up to 4, and a value of 0-8 in each element <${componentName}>`,
      );
    }
  }

  const parsedSpacing =
    typeof spacingType !== 'number'
      ? parseInt(spacingType, 10)
      : spacingType;

  if (parsedSpacing > 8 || parsedSpacing < 0) {
    return new Error(
      `Invalid prop '${propName}' requires a value of 0-8 in <${componentName}>`,
    );
  }
  return null;
};

const isValidToken = token => {
  if (token.split && token.split(' ').length > 1) {
    return token.split(' ').every(t => isValidToken(t));
  }
  return [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
  ].some(v => token === v);
};
