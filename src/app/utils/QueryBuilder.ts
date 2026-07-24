// import { Query } from "mongoose";
// import { excludeField } from "../constants";

// export class QueryBuilder<T> {
//   public modelQuery: Query<T[], T>;
//   public readonly query: Record<string, string>;

//   constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
//     this.modelQuery = modelQuery;
//     this.query = query;
//   }

//   filter(): this {
//     const filter = { ...this.query };

//     for (const field of excludeField) {
//       // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
//       delete filter[field];
//     }

//     this.modelQuery = this.modelQuery.find(filter); // Tour.find().find(filter)

//     return this;
//   }

//   search(searchableField: string[]): this {
//     const searchTerm = this.query.searchTerm || "";
//     const searchQuery = {
//       $or: searchableField.map((field) => ({
//         [field]: { $regex: searchTerm, $options: "i" },
//       })),
//     };
//     this.modelQuery = this.modelQuery.find(searchQuery);
//     return this;
//   }

//   sort(): this {
//     const sort = this.query.sort || "-createdAt";

//     this.modelQuery = this.modelQuery.sort(sort);

//     return this;
//   }
//   fields(): this {
//     const fields = this.query.fields?.split(",").join(" ") || "";

//     this.modelQuery = this.modelQuery.select(fields);

//     return this;
//   }
//   paginate(): this {
//     const page = Number(this.query.page) || 1;
//     const limit = Number(this.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     this.modelQuery = this.modelQuery.skip(skip).limit(limit);

//     return this;
//   }

//   build() {
//     return this.modelQuery;
//   }

//   async getMeta() {
//     const totalDocuments = await this.modelQuery.model.countDocuments();

//     const page = Number(this.query.page) || 1;
//     const limit = Number(this.query.limit) || 10;

//     const totalPage = Math.ceil(totalDocuments / limit);

//     return { page, limit, total: totalDocuments, totalPage };
//   }
// }
import { Query } from "mongoose";
import { excludeField } from "../constants";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, any>; // Updated to support complex query types

  constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(): this {
    const filter = { ...this.query };

    // Clean up internal utility keywords from reaching database filter selectors
    for (const field of excludeField) {
      delete filter[field];
    }

    this.modelQuery = this.modelQuery.find(filter);
    return this;
  }

  search(searchableField: string[]): this {
    const searchTerm = this.query.searchTerm || "";

    if (searchTerm) {
      const searchQuery = {
        $or: searchableField.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      };
      this.modelQuery = this.modelQuery.find(searchQuery);
    }

    return this;
  }

  sort(): this {
    const sort = this.query.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  fields(): this {
    const fields = this.query.fields?.split(",").join(" ") || "-__v"; // Exclude internal versions by default
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  build() {
    return this.modelQuery;
  }

  async getMeta() {
    // 1. Get the current filter criteria attached to this query instance
    const filterQuery = this.modelQuery.getFilter();

    // 2. Count ONLY the documents that match this specific search/filter state
    const totalDocuments =
      await this.modelQuery.model.countDocuments(filterQuery);

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPage = Math.ceil(totalDocuments / limit);

    return {
      page,
      limit,
      total: totalDocuments,
      totalPage,
    };
  }
}
