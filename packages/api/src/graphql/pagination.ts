export function asPaginationResolver(resolver) {
  return async (...args) => {
    console.log("HERE?????")
    const result = await resolver(...args)
    return {
      nodes: result,
      // TODO edges
      // TODO pageInfo
    }
  }
}