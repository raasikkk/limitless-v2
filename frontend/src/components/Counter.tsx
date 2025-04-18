import { decrement, increment } from "../features/counterSlice/counterSlice"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"

const Counter = () => {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

  return (
    <div>
        <p>Counter</p>
        <p>{count}</p>
        <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    </div>
  )
}

export default Counter