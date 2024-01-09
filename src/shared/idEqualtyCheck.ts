import { Types } from 'mongoose';

export const idEqualtyCheck = (arrayOfId: Types.ObjectId[]): string[] => {
  const teacherIds = arrayOfId.map((id: Types.ObjectId) => id.toString());
  return teacherIds;
};
