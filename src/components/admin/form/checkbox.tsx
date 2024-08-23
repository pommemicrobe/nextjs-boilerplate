type SelectProps = {
  classes?: string;
  defaultChecked?: string[];
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  name: string;
  readOnly?: boolean;
  values: { value: string; label: string | number }[];
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  classes = '',
  defaultChecked,
  disabled = false,
  errorMessage,
  label,
  name,
  readOnly = false,
  values,
  onChange,
}: SelectProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>

      {values.map((value, index) => (
        <div className="flex items-center mb-4" key={index}>
          <input
            id="default-checkbox"
            defaultChecked={defaultChecked?.includes(value.value)}
            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${classes}`}
            defaultValue={value.value}
            disabled={disabled}
            readOnly={readOnly}
            name={name}
            type="checkbox"
            onChange={onChange}
          />
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {value.label}
          </label>
        </div>
      ))}

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
