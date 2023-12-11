import { IClasses } from './class.interface';
import { Class } from './class.model';

const crateClass = async (payload: IClasses): Promise<IClasses | null> => {
  const newclass = await Class.create(payload);
  return newclass;
};

// const getAllFloor = async () => {
//   const allFloor = await Class.find();
//   return {
//     meta: {
//       page: 1,
//       limit: 10,
//       total: 10,
//     },
//     data: allFloor,
//   };
// };

export const ClassService = {
  crateClass,
  // getAllFloor,
};
