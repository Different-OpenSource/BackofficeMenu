/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[activeMenuId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Menu';

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "activeMenuId" TEXT;

-- CreateTable
CREATE TABLE "CategoryItem" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "CategoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_activeMenuId_key" ON "Store"("activeMenuId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_activeMenuId_fkey" FOREIGN KEY ("activeMenuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryItem" ADD CONSTRAINT "CategoryItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryItem" ADD CONSTRAINT "CategoryItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
