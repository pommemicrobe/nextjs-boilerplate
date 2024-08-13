import { on } from 'events';

type InputProps = {
  classes?: string;
  defaultValue?: string;
  errorMessage?: string;
  label?: string;
  name: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  type?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  classes = '',
  defaultValue = '',
  errorMessage,
  label,
  name,
  placeholder = '',
  readonly = false,
  required = false,
  type = 'text',
  onChange,
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}

      <input
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classes}`}
        defaultValue={defaultValue}
        placeholder={placeholder}
        name={name}
        readOnly={readonly}
        required={required}
        type={type}
        onChange={onChange}
      />

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
