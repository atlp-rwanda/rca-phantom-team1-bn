import { catchAsyncError } from "../utils/responseHandler";
import models from "../../db/models";

export const updateProfile = catchAsyncError(async (id, payload) => {
  const profile = await models.user.findOne({ where: { id } });
  await profile.update(payload);
  return profile;
});
