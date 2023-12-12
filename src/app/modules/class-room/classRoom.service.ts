import { IClassRoom } from './classRoom.interface';
import { ClassRoom } from './classRoom.model';

const createClassRoom = async (
  payload: IClassRoom
): Promise<IClassRoom | null> => {
  const newClassRoom = await ClassRoom.create(payload);
  return newClassRoom;
};

const getAllClassRoom = async (payload: string) => {
  console.log('my id is = ', payload);
  const allClassRoom = await ClassRoom.find({ teacherId: payload });
  return {
    meta: {
      page: 1,
      limit: 10,
      total: 10,
    },
    data: allClassRoom,
  };
};

export const ClassRoomService = {
  createClassRoom,
  getAllClassRoom,
};
