import Image from 'next/image';

type File = {
  id: number | string;
  name: string;
  src: string;
  type: string;
};

type InputProps = {
  accept?: string;
  classes?: string;
  disabled?: boolean;
  files?: File[];
  label?: string;
  multiple?: boolean;
  name: string;
  readonly?: boolean;
  required?: boolean;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: (id: number | string) => void;
};

export default function InputFile({
  accept = '',
  classes = '',
  disabled = false,
  files,
  label,
  multiple = false,
  name,
  readonly = false,
  required = false,
  onChange,
  onDelete,
}: InputProps) {
  const displayFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      return displayImage(file);
    } else if (file.type.startsWith('video/')) {
      return displayVideo(file);
    } else {
      return displayOthers(file);
    }
  };

  const displayImage = (file: File) => {
    return <Image alt={file.name} height={100} src={file.src} width={100} />;
  };

  const displayOthers = (file: File) => {
    return (
      <svg
        aria-hidden="true"
        className="w-[100px] h-[100px] border border-gray-700 fill-gray-700 text-gray-800 dark:text-white"
        fill="currentColor"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const displayVideo = (file: File) => {
    return (
      <video
        className="w-[100px] h-[100px]"
        controls
        height={100}
        key={file.id}
        width={100}
      >
        <source src={file.src} type={file.type} />
      </video>
    );
  };

  const displayFiles = (files: File[]) => {
    return files.map(file => {
      return (
        <div key={file.id}>
          {displayFile(file)}
          <button
            className="w-[100px] px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-b-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            type="button"
            onClick={
              readonly || disabled || !onDelete
                ? undefined
                : () => onDelete(file.id)
            }
          >
            <svg
              aria-hidden="true"
              className="w-[12px] h-[12px] ml-2 mr-1 text-gray-800 dark:text-white"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clipRule="evenodd"
              />
            </svg>
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>

      <input
        accept={accept}
        className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${classes}`}
        disabled={disabled}
        multiple={multiple}
        name={name}
        readOnly={readonly}
        required={required}
        type="file"
        // onChange={ev => {
        //   if (ev.currentTarget.files) {
        //     const newFiles = ev.currentTarget.files;

        //     if (!files) {
        //       files = [];
        //     }

        //     for (let i = 0; i < newFiles.length; i++) {
        //       let newFile = newFiles[i];

        //       files.push({
        //         id: 'new-' + i,
        //         name: newFile.name,
        //         src: URL.createObjectURL(newFile),
        //         type: newFile.type,
        //       });
        //     }
        //   }

        //   if (onChange) {
        //     onChange(ev);
        //   }
        // }}
        onChange={onChange}
      />

      <div className="flex flex-row gap-4 mt-4">
        {files && files.length > 0 && displayFiles(files)}
      </div>
    </div>
  );
}
