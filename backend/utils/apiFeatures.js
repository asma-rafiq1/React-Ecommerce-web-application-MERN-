class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    if (this.queryStr.category) {
      return this;
    }

    this.query = this.query.find({
      name: {
        $regex: this.queryStr.keyword,
        $options: "i", //case insensitive
      },
    });

    return this; //class return
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "limit", "currentPage"];

    removeFields.forEach((key) => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    //price[gt]  price[lt]
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.currentPage) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
