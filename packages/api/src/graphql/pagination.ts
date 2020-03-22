export function asPaginationResolver(resolver) {
  return async (...args) => {
    const result = await resolver(...args);
    return {
      nodes: result,
      // TODO edges
      // TODO pageInfo
    };
  };
}
