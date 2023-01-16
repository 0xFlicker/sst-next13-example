
interface Props {
  children: React.ReactNode;
}

export default function Empty(props: Props) {
  return (
    <div>
      <p>{props.children}</p>
    </div>
  );
}
