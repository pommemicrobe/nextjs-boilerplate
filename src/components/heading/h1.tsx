type H1Props = {
  classes?: string;
  title: string;
};

export default function H1({ classes = '', title }: H1Props) {
  return (
    <h1 className={`mb-6 text-5xl font-extrabold dark:text-white ${classes}`}>
      {title}
    </h1>
  );
}
