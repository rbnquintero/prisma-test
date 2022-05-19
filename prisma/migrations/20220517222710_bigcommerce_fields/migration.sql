-- AlterTable
ALTER TABLE "SPXGuest" ADD COLUMN     "bigcommerceId" INT4 NOT NULL DEFAULT 3;

-- AlterTable
ALTER TABLE "SPXSession" ADD COLUMN     "bigcommerceCartId" STRING;
