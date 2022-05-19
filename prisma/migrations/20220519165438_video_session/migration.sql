-- CreateTable
CREATE TABLE "SPXVideoSession" (
    "roomId" STRING NOT NULL,
    "sessionId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SPXVideoSession_pkey" PRIMARY KEY ("roomId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SPXVideoSession_roomId_key" ON "SPXVideoSession"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "SPXVideoSession_sessionId_key" ON "SPXVideoSession"("sessionId");

-- AddForeignKey
ALTER TABLE "SPXVideoSession" ADD CONSTRAINT "SPXVideoSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SPXSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
