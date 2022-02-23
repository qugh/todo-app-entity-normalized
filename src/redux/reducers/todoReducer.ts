import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { ITodo } from '../../types/Todo'
import { RootState } from '../store'

const todoSliceName = 'todos'

const todosAdapter = createEntityAdapter<ITodo>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const todoSlice = createSlice({
  name: todoSliceName,
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: todosAdapter.addOne,
    removeTodo: todosAdapter.updateOne,
    changeTodo: todosAdapter.updateOne,
    removeMarkedTodos: todosAdapter.removeMany,
    restoreTodo: todosAdapter.updateOne,
  },
})

export const {
  addTodo,
  changeTodo,
  removeTodo,
  removeMarkedTodos,
  restoreTodo,
} = todoSlice.actions

export const {
  selectById: selectTodoById,
  selectAll: selectALlTodos,
  selectIds: selectTodoIds,
  selectEntities: selectTodoEntities,
} = todosAdapter.getSelectors((state: RootState) => state.todoList)

export default todoSlice.reducer
