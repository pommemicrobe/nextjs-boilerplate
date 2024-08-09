type H3Props = {
  classes?: string;
  title: string;
};

export default function H3({ classes = '', title }: H3Props) {
  return (
    <h3 className={`mb-4 text-3xl font-bold dark:text-white ${classes}`}>
      {title}
    </h3>
  );
}
