type H6Props = {
  classes?: string;
  title: string;
};

export default function H6({ classes = '', title }: H6Props) {
  return (
    <h6 className={`mb-1 text-lg font-bold dark:text-white ${classes}`}>
      {title}
    </h6>
  );
}
