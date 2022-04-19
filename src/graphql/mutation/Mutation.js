import { gql, useMutation } from "@apollo/client";
import { Books } from "../queries/Queries";

export const addbook = gql`
  mutation AddBook($title: String!, $author: String!, $description: String!) {
    addBook(title: $title, author: $author, description: $description) {
      title
      author {
        name
        description
      }
      description
    }
  }
`;

export const addauthor = gql`
  mutation AddAuthor($name: String!, $description: String!) {
    addAuthor(name: $name, description: $description) {
      name
      description
    }
  }
`;

export const delBook = gql`
  mutation DelBook($_id: ID!) {
    delBook(_id: $_id) {
      _id
      title
      description
    }
  }
`;

// export const updateBook = gql`
//   mutation UpdateBook(
//     $_id: ID!
//     $title: String!
//     $author: String!
//     $description: String!
//   ) {
//     updateBook(
//       _id: $_id
//       title: $title
//       author: $author
//       description: $description
//     ) {
//       _id
//       title
//       author {
//         name
//         description
//       }
//       description
//     }
//   }
// `;

export const updatebook = gql`
  mutation UpdateBook(
    $_id: ID!
    $title: String!
    $author: String!
    $description: String!
  ) {
    updateBook(
      _id: $_id
      title: $title
      author: $author
      description: $description
    ) {
      _id
      title
      author {
        name
        description
      }
      description
    }
  }
`;

export const updateAuthor = gql`
  mutation UpdateAuthor($_id: ID!, $name: String!, $description: String!) {
    updateAuthor(_id: $_id, name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

export const useDeleteBook = () =>
  useMutation(delBook, {
    refetchQueries: [Books],
    onError: (error) => console.log(error),
  });

export const useAddBook = () => {
  useMutation(addbook, {
    refetchQueries: [Books],
    onError: (error) => console.log(error),
  });
};

export const useAddAuthor = () => {
  useMutation(addauthor, {
    refetchQueries: [Books],
    onError: (error) => console.log(error),
  });
};

export const useUpdateBook = () => {
  useMutation(updatebook, {
    refetchQueries: [Books],
    onError: (error) => console.log(error),
  });
};

export const useUpdateAuthor = () => {
  useMutation(updateAuthor, {
    refetchQueries: [Books],
    onError: (error) => console.log(error),
  });
};
