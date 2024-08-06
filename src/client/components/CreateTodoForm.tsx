import { useState } from 'react'

import { api } from '@/utils/client/api'

/**
 * QUESTION 1:
 * -----------
 * Style the "Add" button so that it looks like the design in Figma.
 *
 * NOTE: You must use tailwindcss and className. Do not use other methods (eg.
 * inline styles, separate css files, css modules, etc.) unless absolutely
 * necessary. This applies to all styling-related questions in this assignment.
 *
 * Documentation references:
 *  - https://tailwindcss.com
 *  - https://www.youtube.com/watch?v=mr15Xzb1Ook
 *
 *
 *
 * QUESTION 2:
 * -----------
 * Currently our form is not keyboard accessible. Users cannot hit
 * <Enter> right after typing to submit the form (add new todo). Fix this issue.
 */

export const CreateTodoForm = () => {
  const [todoBody, setTodoBody] = useState('')

  const apiContext = api.useContext()

  const { mutate: createTodo, isLoading: isCreatingTodo } =
    api.todo.create.useMutation({
      onSuccess: () => {
        apiContext.todo.getAll.refetch()
      },
    })

  // Answer 2.1: create handleSubmit()
  const handleSubmit = () => {
    createTodo({
      body: todoBody,
    })
    setTodoBody('')
  }

  return (
    // Answer 2.1: Add onSubmit to form
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="group flex items-center justify-between rounded-12 border border-gray-200 py-2 pr-4 focus-within:border-gray-400"
    >
      <label htmlFor={TODO_INPUT_ID} className="sr-only">
        Add todo
      </label>

      <input
        id={TODO_INPUT_ID}
        type="text"
        placeholder="Add todo"
        value={todoBody}
        onChange={(e) => {
          setTodoBody(e.target.value)
        }}
        className="flex-1 px-4 text-base placeholder:text-gray-400 focus:outline-none"
      />

      {/* Answer 2.1: Change "button" type to "submit" type */}
      <button
        type="submit"
        disabled={isCreatingTodo}
        // Answer 1: Add style to "Add" button
        className="rounded-full border bg-gray-700 px-5 py-2 text-base text-white hover:bg-gray-900"
      >
        Add
      </button>
    </form>
  )
}

const TODO_INPUT_ID = 'todo-input-id'

// // Answer 2.2: Use useEffect,  eventListener after typing to submit the form
// export const CreateTodoForm = () => {
//   const [todoBody, setTodoBody] = useState('')

//   const apiContext = api.useContext()

//   const { mutate: createTodo, isLoading: isCreatingTodo } =
//     api.todo.create.useMutation({
//       onSuccess: () => {
//         apiContext.todo.getAll.refetch()
//       },
//     })

//   // Answer 2.2: Add addEventListener to handle keyboard <Enter>
//   useEffect(() => {
//     const listener = (event: { code: string; preventDefault: () => void }) => {
//       if (event.code === 'Enter' || event.code === 'NumpadEnter') {
//         event.preventDefault()
//         createTodo({
//           body: todoBody,
//         })
//         setTodoBody('')
//       }
//     }

//     document.addEventListener('keydown', listener)

//     return () => {
//       document.removeEventListener('keydown', listener)
//     }
//   }, [createTodo, todoBody])

//   return (
//     <form className="group flex items-center justify-between rounded-12 border border-gray-200 py-2 pr-4 focus-within:border-gray-400">
//       <label htmlFor={TODO_INPUT_ID} className="sr-only">
//         Add todo
//       </label>

//       <input
//         id={TODO_INPUT_ID}
//         type="text"
//         placeholder="Add todo"
//         value={todoBody}
//         onChange={(e) => {
//           setTodoBody(e.target.value)
//         }}
//         className="flex-1 px-4 text-base placeholder:text-gray-400 focus:outline-none"
//       />

//       <button
//         type="button"
//         disabled={isCreatingTodo}
//         onClick={() => {
//           createTodo({
//             body: todoBody,
//           })
//           setTodoBody('')
//         }}
//         // Add style to "Add" button
//         className="rounded-full border bg-gray-700 px-5 py-2 text-base text-white"
//       >
//         Add
//       </button>
//     </form>
//   )
// }

// const TODO_INPUT_ID = 'todo-input-id'
