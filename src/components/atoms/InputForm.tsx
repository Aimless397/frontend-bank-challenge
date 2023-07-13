import React, { InputHTMLAttributes } from 'react'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type?: string
  value: string
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputForm = ({
  label,
  type,
  value,
  onInputChange,
  ...rest
}: InputFormProps) => {
  const name = label.toLowerCase().replace(' ', '')

  return (
    <div className='form-group mt-2'>
      <label className='fw-bold' htmlFor={name}>
        {label}
      </label>
      <input
        type={type ?? 'text'}
        className='form-control'
        name={name}
        id={name}
        value={value}
        onChange={onInputChange}
        required
        {...rest}
      />
    </div>
  )
}
