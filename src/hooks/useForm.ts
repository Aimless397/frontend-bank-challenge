import { ChangeEvent, useState } from 'react'

type FormState<T> = {
  [K in keyof T]: string
}

export const useForm = <T extends Record<string, string>>(initialForm: T) => {
  const [formState, setFormState] = useState<FormState<T>>(initialForm)

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  }
}
