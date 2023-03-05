import { queryClientHelpers } from "@/infra/query-client";
import { Unit } from "@/types/entities";

const unitItemKey = (id: number | string) => ["unit", id];

const unitArrayKey = ["units"];

const addOrUpdateUnit = (unit: Unit) => {
  queryClientHelpers.addOrUpdate<Unit>({
    arrayKey: unitArrayKey,
    item: unit,
    itemKey: unitItemKey(unit.id),
  });
};

const selectUnit = (unit: Unit) => {
  queryClientHelpers.select(unitItemKey(unit.id), unit);
};

const deleteUnit = (id: number) => {
  queryClientHelpers.removeFromCache<Unit>({
    id,
    arrayKey: unitArrayKey,
    itemKey: unitItemKey(id),
  });
};

export const unitCacheActions = {
  addOrUpdateUnit,
  selectUnit,
  deleteUnit,
};
