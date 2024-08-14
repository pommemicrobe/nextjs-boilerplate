type TextareaProps = {
  classes?: string;
  defaultValue?: string;
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  name: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  onChange?: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea({
  classes = '',
  defaultValue = '',
  disabled = false,
  errorMessage,
  label,
  name,
  placeholder = '',
  readonly = false,
  required = false,
  rows = 4,
  onChange,
}: TextareaProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>

      <textarea
        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classes}`}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        readOnly={readonly}
        required={required}
        rows={rows}
        onChange={onChange}
      ></textarea>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
