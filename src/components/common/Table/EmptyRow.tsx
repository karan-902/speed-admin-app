import EmptyData from "../EmptyData";

interface EmptyRowProps {
  title: string;
}

export default function EmptyRow({ title }: EmptyRowProps) {
  return <EmptyData title={title} />;
}
