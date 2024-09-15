import ClipBoardIcon from "@/assets/ClipBoardIcon";
import FoodIcon from "@/assets/FoodIcon";
import TagIcon from "@/assets/TagIcon";

export const routes = [
  {
    name: "Cardápios",
    path: "/menus",
    icon: ClipBoardIcon(),
  },
  {
    name: "Categorias",
    path: "/categories",
    icon: TagIcon(),
  },
  {
    name: "Itens",
    path: "/items",
    icon: FoodIcon(),
  },
];
