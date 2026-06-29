-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "gameType" TEXT NOT NULL,
    "score" INTEGER,
    "errors" INTEGER,
    "efficiency" DOUBLE PRECISION,
    "avgReactionTime" INTEGER,
    "interference" INTEGER,
    "nLevel" INTEGER,
    "bestStreak" INTEGER,
    "misses" INTEGER,
    "bestReactionTime" INTEGER,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
