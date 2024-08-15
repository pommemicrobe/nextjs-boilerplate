type SelectProps = {
  classes?: string;
  defaultValue?: string;
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  name: string;
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
  values: { value: string; label: string | number }[];
  onChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  classes = '',
  defaultValue = '',
  disabled = false,
  errorMessage,
  label,
  multiple,
  name,
  placeholder = '',
  required = false,
  values,
  onChange,
}: SelectProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>

      <select
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classes}`}
        defaultValue={defaultValue}
        disabled={disabled}
        multiple={multiple}
        name={name}
        required={required}
        onChange={onChange}
      >
        <option>{placeholder}</option>

        {values.map((value, index) => (
          <option defaultValue={value.value} key={index}>
            {value.label}
          </option>
        ))}
      </select>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
