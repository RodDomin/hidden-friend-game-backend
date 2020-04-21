interface Params {
  page: number;
  limit: number;
}

export default ({ page = 0, limit }: Params): number => {
  switch (page) {
    case 0:
      return 0;
    case 1:
      return limit;
    default:
      return page * limit;
  }
};
