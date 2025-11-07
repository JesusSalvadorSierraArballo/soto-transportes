import type { GetSingleUserResponse, UserBasicInfo } from "../../types";

export const GetSingleUserResponseToUserBasicInfo = (response: GetSingleUserResponse): UserBasicInfo => {
  return {
    id: response.id,
    firstName: response.firstName,
    lastName: response.lastName,
  };
};
