type H5Props = {
  classes?: string;
  title: string;
};

export default function H5({ classes = '', title }: H5Props) {
  return (
    <h5 className={`mb-2 text-xl font-bold dark:text-white ${classes}`}>
      {title}
    </h5>
  );
}
