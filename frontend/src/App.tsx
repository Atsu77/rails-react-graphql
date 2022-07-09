import React, { useState } from "react";
import {
  useBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "./generated/graphql";

function App() {
  const { data: { books = [] } = {} } = useBooksQuery();
  const [createBook] = useCreateBookMutation({ refetchQueries: ["books"] });
  const [deleteBook] = useDeleteBookMutation({ refetchQueries: ["books"] });
  const [updateBook] = useUpdateBookMutation({ refetchQueries: ["books"] });
  const [title, setTitle] = useState("");

  return (
    <div style={{ width: "400px", margin: "40px auto" }}>
      <h1>書籍一覧</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button
        onClick={() => {
          createBook({ variables: { params: { title: title } } });
          setTitle("");
        }}
      >
        保存
      </button>
      {books.map((book) => (
        <div
          key={book.id}
          style={{ display: "flex", gap: "10px", marginBottom: "4-px" }}
        >
          <input
            value={book.title || ""}
            onChange={(e) => 
              updateBook({
                variables: { id: book.id, params: { title: e.target.value } },
              })
            }
          />
          <button onClick={() => deleteBook({ variables: { id: book.id } })}>
            削除
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
