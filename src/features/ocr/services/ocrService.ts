export const fetchOcrPreview = async () => {
  return Promise.resolve({
    status: 'ready',
    supportedFormats: ['png', 'jpg', 'pdf'],
  });
};
