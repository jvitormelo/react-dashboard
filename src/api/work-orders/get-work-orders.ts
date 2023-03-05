import { httpClient } from "@/infra/http-client";
import { WorkOrder } from "@/types/entities/work-order";

export const getWorkOrders = (): Promise<WorkOrder[]> =>
  httpClient.get("/workorders");
