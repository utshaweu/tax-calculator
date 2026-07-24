import { EXAMPLE_CASE_1, EXAMPLE_CASE_2 } from '../helpers/taxConstants'

export function ExampleButtons({ onLoad, onClear }) {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      <button className="example-btn" onClick={() => onLoad(EXAMPLE_CASE_1)}>Load Case 1 – ৳50,000/mo</button>
      <button className="example-btn" onClick={() => onLoad(EXAMPLE_CASE_2)}>Load Case 2 – ৳1,00,000/mo</button>
      <button className="example-btn example-btn-clear" onClick={onClear}>Clear</button>
    </div>
  )
}
