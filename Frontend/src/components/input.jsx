import React from 'react'

const input = ({ id, label, type, disabled }) => {
  return (
    <div>
    <label htmlFor={id}> {label} </label>
    <input id={id} type={type} disabled={disabled}
        className="border-2 border-violet-500 p-2 w-full "
    />
</div>
  )
}

export default input;