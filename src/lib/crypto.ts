import crypto from 'crypto';

const hash512 = (text: string): string => {
  const hash = crypto.createHash('sha512');
  const data = hash.update(text, 'utf-8');

  return data.digest('hex');
};

export {
  hash512,
};
