/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query LocationsByCharacterQuery($page: Int, $name: String) {\n  characters(page: $page, filter: {name: $name}) {\n    info {\n      pages\n      count\n      next\n      prev\n    }\n    results {\n      image\n      id\n      name\n      status\n      location {\n        id\n        name\n        type\n      }\n    }\n  }\n}": types.LocationsByCharacterQueryDocument,
    "query LocationsByEpisodeQuery($page: Int, $name: String) {\n  episodes(page: $page, filter: {name: $name}) {\n    info {\n      pages\n      count\n      next\n      prev\n    }\n    results {\n      characters {\n        image\n        id\n        name\n        status\n        location {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n}": types.LocationsByEpisodeQueryDocument,
    "query LocationsQuery($page: Int, $name: String) {\n  locations(page: $page, filter: {name: $name}) {\n    info {\n      pages\n      count\n      next\n      prev\n    }\n    results {\n      id\n      name\n      type\n      residents {\n        image\n        id\n        name\n        status\n      }\n    }\n  }\n}": types.LocationsQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LocationsByCharacterQuery($page: Int, $name: String) {\n  characters(page: $page, filter: {name: $name}) {\n    info {\n      pages\n      count\n      next\n      prev\n    }\n    results {\n      image\n      id\n      name\n      status\n      location {\n        id\n        name\n        type\n      }\n    }\n  }\n}"): (typeof documents)["query LocationsByCharacterQuery($page: Int, $name: String) {\n  characters(page: $page, filter: {name: $name}) {\n    info {\n      pages\n      count\n      next\n      prev\n    }\n    results {\n      image\n      id\n      name\n      status\n      location {\n        id\n        name\n        type\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LocationsByEpisodeQuery($page: Int, $name: String) {\n  episodes(page: $page, filter: {name: $name}) {\n    info {\n      pages\n      count\n      next\n      prev\n    }\n    results {\n      characters {\n        image\n        id\n        name\n        status\n        location {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query LocationsByEpisodeQuery($page: Int, $name: String) {\n  episodes(page: $page, filter: {name: $name}) {\n    info {\n      pages\n      count\n      next\n      prev\n    }\n    results {\n      characters {\n        image\n        id\n        name\n        status\n        location {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LocationsQuery($page: Int, $name: String) {\n  locations(page: $page, filter: {name: $name}) {\n    info {\n      pages\n      count\n      next\n      prev\n    }\n    results {\n      id\n      name\n      type\n      residents {\n        image\n        id\n        name\n        status\n      }\n    }\n  }\n}"): (typeof documents)["query LocationsQuery($page: Int, $name: String) {\n  locations(page: $page, filter: {name: $name}) {\n    info {\n      pages\n      count\n      next\n      prev\n    }\n    results {\n      id\n      name\n      type\n      residents {\n        image\n        id\n        name\n        status\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;