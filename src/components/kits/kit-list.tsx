import { Kit } from "@/libs/api";
import { KitItem } from "./kit-item";

type Props = {
  list: Kit[];
};

export const KitList = ({ list }: Props) => {
  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-gray-400 text-6xl mb-4">🎁</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Nenhum kit disponível
        </h3>
        <p className="text-gray-500 text-center">
          No momento não temos kits disponíveis. Volte em breve!
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((item) => (
        <KitItem key={item.id} data={item} />
      ))}
    </section>
  );
};