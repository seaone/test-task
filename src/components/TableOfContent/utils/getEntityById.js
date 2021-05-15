export const getEntityById = (id, entities) => {
  return entities['pages'][id] ?? entities['anchors'][id] ?? null;
}