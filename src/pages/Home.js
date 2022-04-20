import React from "react";
import { useQuery } from "@apollo/client";
// import { delBook } from "../graphql/mutation/Mutation";
import { Books } from "../graphql/queries/Queries";
import { useDeleteBook } from "../graphql/mutation/Mutation";
import { useNavigate } from "react-router-dom";

function Home() {
  const { loading, error, data } = useQuery(Books);
  const [delBook] = useDeleteBook();
  const navigate = useNavigate();
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const Delbook = (id) => {
    // const { loading, error, data } = useMutation(
    //   delBook({ variables: { _id: id } }),
    //   {
    //     refetchQueries: [Books],
    //     onError: (error) => console.log(error.response),
    //   }
    // );
    delBook({ variables: { _id: id } });
    console.log(id);
  };
  return (
    <div className="flex flex-wrap items-center justify-center mt-4 gap-4">
      {data?.books.map((book) => {
        return (
          <div
            className="w-[280px] h-[220px] border-2 flex flex-col gap-2 items-center"
            key={book._id}
          >
            <p className="text-sky-500 text-xl">Title</p>
            <h2 className="text-2xl">{book.title}</h2>{" "}
            <p className="text-sky-500 text-xl">Author</p>
            <button className="text-2xl">{book.author?.name}</button>
            <div>
              <button
                className="text-2xl"
                onClick={() => navigate(`/editbook/${book._id}`)}
              >
                <i className="fa-solid fa-pen-to-square text-yellow-600"></i>
              </button>
              <button
                className="text-2xl ml-[20px]"
                onClick={() => Delbook(book._id)}
              >
                <i className="fa-solid fa-trash text-red-600"></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
