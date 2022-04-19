import { gql } from "@apollo/client";

export const Books = gql`
  query getbooks {
    books {
      _id
      title
      author {
        _id
        name
        description
      }
      description
    }
  }
`;

export const Authors = gql`
  query getauthors {
    authors {
      _id
      name
      description
    }
  }
`;
