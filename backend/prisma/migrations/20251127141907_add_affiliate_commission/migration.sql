-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AffiliateAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "balance" REAL NOT NULL DEFAULT 0,
    "commissionRate" REAL NOT NULL DEFAULT 150,
    CONSTRAINT "AffiliateAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AffiliateAccount" ("balance", "code", "id", "userId") SELECT "balance", "code", "id", "userId" FROM "AffiliateAccount";
DROP TABLE "AffiliateAccount";
ALTER TABLE "new_AffiliateAccount" RENAME TO "AffiliateAccount";
CREATE UNIQUE INDEX "AffiliateAccount_userId_key" ON "AffiliateAccount"("userId");
CREATE UNIQUE INDEX "AffiliateAccount_code_key" ON "AffiliateAccount"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
