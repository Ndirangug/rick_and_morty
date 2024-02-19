export default function RedisentStatus({
  status,
  inline = false,
}: {
  status: string;
  inline: boolean;
}) {
  return (
    <div className={`${inline ? "inline" : ""}`}>
      <span>
        {status === "Alive" ? "🫀  " : status === "Dead" ? "⚰️  " : "❓  "}
      </span>
      <span className="text-md italic font-extralight">{status} </span>
    </div>
  );
}
