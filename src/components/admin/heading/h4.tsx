type H4Props = {
  classes?: string;
  title: string;
};

export default function H4({ classes = '', title }: H4Props) {
  return (
    <h4 className={`mb-3 text-2xl font-bold dark:text-white ${classes}`}>
      {title}
    </h4>
  );
}
