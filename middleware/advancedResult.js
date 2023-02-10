const advancedResult = (model, populate) => async (req, res, next) => {
  // copy req query
  const reqQuery = { ...req.query };
  // field to delete
  const fields = ["select", "sort", "page", "limit"];

  // remove field
  fields.forEach((field) => delete reqQuery[field]);

  // filtering gt, gte, lt, lte, and in
  const queryString = JSON.stringify(reqQuery).replace(
    /\b(gt|gte|lt|lte|in|regex)\b/g,
    (match) => `$${match}`
  );

  console.log(JSON.stringify(queryString));

  const query = model.find(JSON.parse(queryString)).populate(populate);

  // select
  if (req.query.select) {
    const select = req.query.select.split(",").join(" ");
    query.select(select);
  }

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query.sort(sortBy);
  }

  // pagination
  let page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const totalDocs = await model.countDocuments(JSON.parse(queryString));
  const maxPage = Math.ceil(totalDocs / limit);
  page = page > maxPage ? 1 : page;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // paginate
  query.skip(startIndex).limit(limit);

  // get page
  const getPage = (pageNum) => {
    const fullpathUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`;
    if (!/\?/.test(fullpathUrl)) {
      return `${fullpathUrl}?page=${pageNum}`;
    }
    if (!/page/.test(fullpathUrl)) {
      return `${fullpathUrl}&page=${pageNum}`;
    }
    if (/page\=[0-9]{1,}/.test(fullpathUrl)) {
      return `${fullpathUrl}`.replace(/page\=[0-9]{1,}/, `page=${pageNum}`);
    }
  };

  res.advancedResult = query;
  res.pagination = {
    page,
    limit,
    maxPage,
    totalDocs,
    prev: startIndex > 0 ? getPage(page - 1) : null,
    next: endIndex < maxPage ? getPage(page + 1) : null,
  };
  next();
};

module.exports = advancedResult;
