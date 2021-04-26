type Props = {
  className?: string;
  label?: string;
  symbol: number;
};

export default function Emoji({ className, label, symbol }: Props) {
  return (
    <span className={className} role="img" aria-label={label ?? "emoji"}>
      {String.fromCodePoint(symbol)}
    </span>
  );
}
