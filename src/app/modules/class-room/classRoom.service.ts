import { IClassRoom } from './classRoom.interface';
import { ClassRoom } from './classRoom.model';

const crateClassRoom = async (
  payload: IClassRoom
): Promise<IClassRoom | null> => {
  const newClassRoom = await ClassRoom.create(payload);
  return newClassRoom;
};

// const getAllClassRoom = async () => {
//   const allClassRoom = await ClassRoom.find();
//   return {
//     meta: {
//       page: 1,
//       limit: 10,
//       total: 10,
//     },
//     data: allClassRoom,
//   };
// };

export const ClassRoomService = {
  crateClassRoom,
  // getAllClassRoom,
};
