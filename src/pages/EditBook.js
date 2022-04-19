import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import {
  // addauthor,
  updateAuthor,
  updatebook,
  // useUpdateAuthor,
} from "../graphql/mutation/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Books } from "../graphql/queries/Queries";

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState("");
  const { loading, data: data1 } = useQuery(Books);

  useEffect(() => {
    setBook(data1?.books.filter((book) => book._id === id));
  }, [id, data1]);
  if (loading) return "Loading...";

  return book ? <EDIT book={book} id={id} /> : "";
}

export default EditBook;

function EDIT({ book, id }) {
  const navigate = useNavigate();
  const [updateBook] = useMutation(updatebook);
  // const [addAuthor] = useMutation(addauthor);
  // const [updateauthor] = useUpdateAuthor();
  const [updateauthor] = useMutation(updateAuthor);
  //   const { loading: loading2, data: data2 } = useQuery(Authors);

  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      title: book[0].title,
      //   author: book[0].author.name,
      description: book[0].description,
      authorname: book[0].author.name,
      authordesc: book[0].author.description,
    },
    onSubmit: (newbook) => {
      console.log(newbook);
      updateBook({
        variables: {
          _id: id,
          title: newbook.title,
          author: newbook.authorname,
          description: newbook.description,
        },
      });
      updateauthor({
        variables: {
          _id: book[0].author._id,
          name: newbook.authorname,
          description: newbook.authordesc,
        },
      });
      navigate("/");
    },
  });
  //   if (loading2) {
  //     return "Loading...";
  //   }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-sky-500">EditBook</h1>
      <form onSubmit={handleSubmit}>
        {/* <fieldset> */}
        <label className="text-2xl text-sky-500">Book Title</label>
        <input
          name="title"
          id="title"
          className="border rounded-2xl text-2xl bg-zinc-200 w-full py-4 px-3 m-2"
          placeholder="Enter the Book title..."
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          type="text"
        />

        <label className="text-2xl text-sky-500">Author Name</label>
        <input
          name="authorname"
          id="authorname"
          className="border-black rounded-2xl text-2xl bg-zinc-200 w-full py-4 px-3 m-2"
          placeholder="Enter the Author name..."
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.authorname}
        />

        <label className="text-2xl text-sky-500">Book Description</label>
        <textarea
          rows={5}
          cols={8}
          name="description"
          id="description"
          className="border-black text-2xl rounded-2xl bg-zinc-200 w-full py-4 px-3 m-2"
          multiple
          placeholder="Enter the Book description..."
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          type="text"
        />
        <label className="text-2xl text-sky-500">Author Description</label>
        <textarea
          rows={5}
          cols={8}
          name="authordesc"
          id="authordesc"
          className="border-black rounded-2xl text-2xl bg-zinc-200 w-full py-4 px-3 m-2"
          placeholder="Enter the Author description..."
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.authordesc}
        />
        <button
          type="submit"
          className="border bg-sky-400 text-2xl border-black p-[10px] mr-auto rounded-2xl"
        >
          Save Book
        </button>
      </form>
    </div>
  );
}
