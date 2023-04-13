import produce from "immer";
import React, { useState } from "react";
import { ChevronsDown, ChevronsUp, Edit2, Trash2 } from "react-feather";

function CommentBox() {
  const [comments, setComments] = useState<any>([]);
  const [newComments, setNewComments] = useState("");

  console.log("comments", comments);

  const addComments = () => {
    const data = {
      comment: newComments,
      upvote: 0,
      downvote: 0,
      isEdit: false,
    };
    const finalData = [...comments, data];
    setComments(finalData);
    setNewComments("");
  };
  console.log("newComments", newComments);

  const onEditComment = (key: string, value: any, index: number) => {
    const data = produce(comments, (draft: { [x: string]: any }) => {
      let comment = draft[index];
      comment[key] = value;
    });
    console.log("test", data);
    setComments(data);
  };

  const onDeleteComment = (index: number) => {
    const data = produce(comments, (draft: { [x: string]: any }) => {
      draft.splice(index, 1);
    });
    setComments(data);
  };

  return (
    <div className="w-full h-full flex flex-col bg-blue-50 flex items-center justify-center">
      {comments?.map((item: any, index: number) => {
        return (
          <div
            className="flex flex-col w-[50%] my-3 justify-between items-center"
            key={index}
          >
            <div className="flex w-full pl-2 justify-between items-center space-x-2 text-gray-900 ">
              {item.isEdit ? (
                <input
                  type="text"
                  id="comments"
                  placeholder="Enter comments"
                  value={item.comment}
                  onChange={(e) =>
                    onEditComment("comment", e?.target?.value || "", index)
                  }
                  className="mt-1 h-10 pl-2 text-black w-full rounded-md border-blue-800 bg-white shadow-sm sm:text-sm"
                />
              ) : (
                <div className="my-5 font-medium ">{item.comment}</div>
              )}

              <div className="flex cursor-pointer justify-between mr-2 items-center space-x-4 text-gray-900">
                <div
                  onClick={() => onEditComment("isEdit", !item.isEdit, index)}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-md">
                    <Edit2 className="w-5 h-5 text-blue-800" />
                  </div>
                </div>
                <div onClick={() => onDeleteComment(index)}>
                  <div className="w-10 h-10 flex items-center justify-center bg-red-200 rounded-md">
                    <Trash2 className="w-5 h-5 text-red-800" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-3 w-full justify-around text-gray-900">
              <div
                className="flex space-x-3 cursor-pointer items-center justifty-center "
                onClick={() => onEditComment("upvote", item.upvote + 1, index)}
              >
                <div className="w-10 h-10 mr-3 flex items-center justify-center bg-green-200 rounded-md">
                  <ChevronsUp className="w-5 mx-2 h-5 text-green-900" />
                </div>
                <>{item.upvote}</>
              </div>
              <div
                className="flex space-x-3 cursor-pointer items-center justifty-center"
                onClick={() =>
                  onEditComment("downvote", item.downvote + 1, index)
                }
              >
                <div className="w-10 h-10 mr-3 flex items-center justify-center bg-red-200 rounded-md">
                  <ChevronsDown className="w-5 mx-2 h-5 text-red-900 cursor-pointer" />{" "}
                </div>

                <>{item.downvote}</>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex w-[50%] space-x-3 items-center justify-center">
        <input
          type="text"
          id="comments"
          placeholder="Enter comments"
          value={newComments}
          onChange={(e) => setNewComments(e.target.value)}
          className="mt-1 h-16 pl-2 text-black w-full rounded-md border-blue-800 bg-white shadow-sm sm:text-sm"
        />
        <div className="mt-2" onClick={addComments}>
          <a className="inline-block rounded-full border border-indigo-600 bg-indigo-600 p-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
            <span className="sr-only"> Download </span>

            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
