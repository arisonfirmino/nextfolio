import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatedDate = (date: string) => {
  return format(date, "MMM yyyy", {
    locale: ptBR,
  });
};
