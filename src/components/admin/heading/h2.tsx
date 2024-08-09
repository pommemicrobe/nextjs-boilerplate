type H2Props = {
  classes?: string;
  title: string;
};

export default function H2({ classes = '', title }: H2Props) {
  return (
    <h2 className={`mb-5 text-4xl font-bold dark:text-white ${classes}`}>
      {title}
    </h2>
  );
}
