import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleMongoDuplicateKeyError = (error: any): IGenericErrorResponse => {
  //   if (error.code === 11000 && error.keyPattern && error.keyValue) {
  const duplicatedField = Object.keys(error.keyPattern)[0];
  const duplicatedValue = error.keyValue[duplicatedField];

  const errorMessage: IGenericErrorMessage = {
    path: duplicatedField,
    message: `Duplicate value '${duplicatedValue}' for field '${duplicatedField}'`,
  };

  const statusCode = 409; // Conflict status code for duplicate entries

  return {
    statusCode,
    message: 'Duplicate Key Error',
    errorMessages: [errorMessage],
  };
};

// Handle other MongoDB errors if needed

// Default response for unhandled errors

export default handleMongoDuplicateKeyError;
