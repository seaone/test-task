export const getAncestorIds = (entityId, entities) => {
  if (entityId == null || entities == null || entities.length === 0) {
    return [];
  }

  return _getParentIds(entityId, entities).reverse();
}

function _getParentIds(entityId, entities) {
  const parentId = entities['pages'][entityId]?.parentId ?? entities['anchors'][entityId]?.parentId;

  if (parentId !== undefined) {
    return [entityId, ..._getParentIds(parentId, entities)]
  } else {
    return [entityId];
  }
}
