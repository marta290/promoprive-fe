import axios from "../interceptor";
import { type ITokenResponse } from "../types/Config.Interface";

export const getAppConfigurationData = async ( uuid: string | null, tenantId: string | null,): Promise<ITokenResponse | null> => {
  if (!uuid || !tenantId) return null;

  const response = await axios.get<ITokenResponse>("/api/token", {
    params: { uuid, tenantId },
  });

  return response.data;
};
