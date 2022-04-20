import React, { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { Authors } from "../graphql/queries/Queries";
import { addauthor, addbook } from "../graphql/mutation/Mutation";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();
  const [addBook] = useMutation(addbook);
  const [addAuthor] = useMutation(addauthor);
  const [show, setshow] = useState(false);
  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      title: "",
      author: "",
      description: "",
      authorname: "",
      authordesc: "",
    },
    onSubmit: (newbook) => {
      console.log("onSubmit", newbook);
      if (newbook.authorname === "") {
        addBook({
          variables: {
            title: newbook.title,
            author: newbook.author,
            description: newbook.description,
          },
        });
      } else {
        addBook({
          variables: {
            title: newbook.title,
            author: newbook.authorname,
            description: newbook.description,
          },
        });
        addAuthor({
          variables: {
            name: newbook.authorname,
            description: newbook.authordesc,
          },
        });
      }
      navigate("/");
    },
  });
  const { loading, error, data } = useQuery(Authors);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const handleClick = () => {
    setshow(!show);
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-sky-500">AddBook</h1>
      <form onSubmit={handleSubmit}>
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
        {!show ? (
          <>
            <select
              id="author"
              name="author"
              onChange={handleChange}
              value={values.author}
              className="rounded-2xl w-1/2 text-2xl bg-zinc-200 py-4 px-3 m-2"
            >
              <option value={""}>Select author</option>
              {data?.authors.map((author) => {
                return (
                  <option key={author._id} value={author.name}>
                    {author.name}
                  </option>
                );
              })}
            </select>
          </>
        ) : (
          ""
        )}

        <textarea
          rows={4}
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
        {show ? (
          <>
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
            <textarea
              rows={4}
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
          </>
        ) : (
          ""
        )}
        <input
          type="checkbox"
          id="newauthor"
          name="newauthor"
          value="newauthor"
          onClick={handleClick}
          className="h-[25px] w-[25px] ml-2"
        />
        <label className="text-2xl" htmlFor="newauthor">
          New Author
        </label>

        <br />
        <button
          type="submit"
          className="border bg-sky-400 text-2xl border-black p-[10px] mr-auto rounded-2xl"
        >
          AddBook
        </button>
      </form>
    </div>
  );
}

export default AddBook;
