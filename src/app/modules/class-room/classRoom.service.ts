import { IFloor } from './floor.interface';
import { Floor } from './floor.model';

const crateFloor = async (floor: IFloor): Promise<IFloor | null> => {
  const newfloor = await Floor.create(floor);
  return newfloor;
};

const getAllFloor = async () => {
  const allFloor = await Floor.find();
  return {
    meta: {
      page: 1,
      limit: 10,
      total: 10,
    },
    data: allFloor,
  };
};

export const FloorService = {
  crateFloor,
  getAllFloor,
};
