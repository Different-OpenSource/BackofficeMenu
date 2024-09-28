import ClipBoardIcon from "@/assets/ClipBoardIcon";
import FoodIcon from "@/assets/FoodIcon";
import HomeIcon from "@/assets/HomeIcon";
import TagIcon from "@/assets/TagIcon";

export const routes = [
  {
    name: "Visão Geral",
    path: "/home",
    icon: HomeIcon(),
  },
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
