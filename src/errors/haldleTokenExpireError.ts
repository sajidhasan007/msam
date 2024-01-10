import { IGenericErrorMessage } from '../interfaces/error';

const haldleTokenExpireError = () => {
  const errors: IGenericErrorMessage[] = [
    {
      path: '',
      message: 'Token expired',
    },
  ];

  const statusCode = 401;
  return {
    statusCode,
    message: 'Jwt Error',
    errorMessages: errors,
  };
};

export default haldleTokenExpireError;
