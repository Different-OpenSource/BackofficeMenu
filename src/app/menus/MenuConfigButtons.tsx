import DeleteIcon from "@/assets/DeleteIcon";
import PencilIcon from "@/assets/PencilIcon";
import { Fragment, useState } from "react";
import EditMenuModal from "@/components/menuModals/EditMenuModal";
import { Menu } from "@prisma/client";
import ConfirmDecisionModal from "@/components/ConfirmDecisionModal";
import APICaller from "@/utils/APICaller";
import { loaderToast } from "@/utils/loaderToast";

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
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

  async function deleteMenu() {
    loaderToast(() => APICaller(`/api/menu?menuId=${menu.id}`, "DELETE"), {
      loading: "Excluindo cardápio...",
      success: "Cardápio excluído com sucesso!",
      error: "Erro ao excluir cardápio!",
      onSuccess: () => {
        updateMenus();
      },
    });
  }

  async function activateMenu() {
    loaderToast(
      () =>
        APICaller(`/api/activeMenu`, "PATCH", {
          storeId: menu.storeId,
          menuId: menu.id,
        }),
      {
        loading: "Ativando cardápio...",
        success: "Cardápio ativado com sucesso!",
        error: "Erro ao ativar cardápio!",
        onSuccess: () => {
          updateStore();
        },
      }
    );
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
