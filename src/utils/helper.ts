const convertSizeToKB = (size: number) => {
  return parseFloat((size / 1000).toFixed(2));
};

export { convertSizeToKB };
