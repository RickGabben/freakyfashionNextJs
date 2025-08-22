/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "brand" TEXT,
    "image" TEXT,
    "sku" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Product" ("brand", "createdAt", "description", "id", "image", "name", "price", "sku", "slug") SELECT "brand", "createdAt", "description", "id", "image", "name", "price", "sku", "slug" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");
