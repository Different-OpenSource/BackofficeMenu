import DeleteIcon from "@/assets/DeleteIcon";
import PencilIcon from "@/assets/PencilIcon";
import { Fragment, useState } from "react";
import EditMenuModal from "@/components/menuModals/EditMenuModal";
import { Menu } from "@prisma/client";
import { useRouter } from "next/navigation";
import ConfirmDecisionModal from "@/components/ConfirmDecisionModal";
import APICaller from "@/utils/APICaller";
import toast from "react-hot-toast";

export default function MenuConfigButtons({
  isActive,
  menu,
  updateMenus,
  updateStore,
}: {
  isActive: boolean;
  menu: Menu;
  updateMenus: () => void;
  updateStore: () => void;
}) {
  const router = useRouter();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

  async function deleteMenu() {
    try {
      const response = await APICaller(`/api/menu?menuId=${menu.id}`, "DELETE");
      if (response.success) {
        updateMenus();
        toast.success("Menu excluído com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar menu:", error);
    }
  }

  async function activateMenu() {
    try {
      const response = await APICaller(`/api/activeMenu`, "PATCH", {
        storeId: menu.storeId,
        menuId: menu.id,
      });

      if (response.success) {
        updateStore();
        toast.success("Menu ativado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao ativar menu:", error);
    }
  }
  return (
    <Fragment>
      <div className="flex gap-4">
        <button
          className={
            isActive ? "pointer-events-none text-gray-500" : "text-primary"
          }
          onClick={() => activateMenu()}
        >
          Ativar
        </button>

        <button onClick={() => setIsOpenEdit(true)}>
          <PencilIcon />
        </button>
        <button
          className="text-red-500"
          onClick={() => setIsOpenConfirmDelete(true)}
        >
          <DeleteIcon />
        </button>
      </div>
      <EditMenuModal
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        menu={menu}
        updateMenus={updateMenus}
      />
      <ConfirmDecisionModal
        isOpen={isOpenConfirmDelete}
        onClose={() => setIsOpenConfirmDelete(false)}
        onConfirm={() => {
          deleteMenu();
        }}
        message="Tem certeza que deseja excluir este cardápio?"
        title="Excluir menu"
        onDecline={() => {}}
      />
    </Fragment>
  );
}
