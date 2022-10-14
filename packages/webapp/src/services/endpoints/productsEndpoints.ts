import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseOutput } from "../../types/BaseOutput";

export interface Product {
  id: number;
  title: string;
}
export const productEndpoints = (
  builder: EndpointBuilder<ReturnType<any>, string, "api">
) => ({
  upsertProducts: builder.mutation<BaseOutput<string>, any>({
    query: (body) => ({
      url: "/products",
      method: "POST",
      body,
    }),
  }),
  deleteProducts: builder.mutation<BaseOutput<string>, any>({
    query: (body) => ({
      url: "/products",
      method: "DELETE",
      body,
    }),
  }),
  listProducts: builder.mutation<BaseOutput<Product[]>, null>({
    query: () => ({
      url: "/products",
      method: "GET",
    }),
  }),
  listSingleProduct: builder.mutation<BaseOutput<Product>, {id: number}>({
    query: ({id}) => ({
      url: `/products/${id}`,
      method: "GET",
    }),
  }),
});
