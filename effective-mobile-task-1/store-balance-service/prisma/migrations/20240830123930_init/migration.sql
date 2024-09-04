-- CreateTable
CREATE TABLE "products" (
    "plu" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("plu")
);

-- CreateTable
CREATE TABLE "shops" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balances" (
    "id" SERIAL NOT NULL,
    "shelfQuantity" INTEGER NOT NULL,
    "orderQuantity" INTEGER NOT NULL,
    "shopId" INTEGER NOT NULL,
    "plu" TEXT NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "shops_title_key" ON "shops"("title");

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_plu_fkey" FOREIGN KEY ("plu") REFERENCES "products"("plu") ON DELETE RESTRICT ON UPDATE CASCADE;
