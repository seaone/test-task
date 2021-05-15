export const getEntityIds = (ids, filteredIds) => {
  if (filteredIds == null) {
    return [];
  }

  return filteredIds.length > 0 ? ids.filter((id) => filteredIds.includes(id)) : ids;
}
