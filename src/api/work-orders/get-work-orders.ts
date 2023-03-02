import { httpClient } from "@/infra/http-client";
import { WorkOrder } from "@/types/entities/workorders";

export const getWorkOrders = (): Promise<WorkOrder[]> =>
  httpClient.get("/workorders");
