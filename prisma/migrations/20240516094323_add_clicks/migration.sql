-- CreateTable
CREATE TABLE "Click" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "emailKey" TEXT NOT NULL,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_emailKey_fkey" FOREIGN KEY ("emailKey") REFERENCES "Email"("key") ON DELETE CASCADE ON UPDATE CASCADE;
