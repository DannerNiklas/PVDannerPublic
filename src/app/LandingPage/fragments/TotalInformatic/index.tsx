export default async function TotalInformatic(props: {
  title: string;
  power: number;
  unit: string;
}) {
  return (
    <section className="flex flex-col h-full w-full items-center outline-none cursor-default text-xl font-bold border rounded-xl text-left bg-gray text-white  overflow-hidden">
      <h1 className="w-full text-center font-bold bg-green-500">
        {props.title}
      </h1>

      <div className="w-full text-center font-normal">
        <p>
          {props.power} {props.unit}
        </p>
      </div>
    </section>
  );
}
