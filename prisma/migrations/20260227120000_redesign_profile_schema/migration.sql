-- Redesign FreelancerProfile: replace skillsSummary/experienceSummary/portfolioLinks
-- with skills[], bio, and portfolioItems (Json)

-- 1. Add new columns (bio nullable initially so we can backfill)
ALTER TABLE "FreelancerProfile" ADD COLUMN "bio" TEXT;
ALTER TABLE "FreelancerProfile" ADD COLUMN "skills" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "FreelancerProfile" ADD COLUMN "portfolioItems" JSONB NOT NULL DEFAULT '[]'::jsonb;

-- 2. Backfill bio from experienceSummary for any existing rows
UPDATE "FreelancerProfile" SET "bio" = "experienceSummary";

-- 3. Make bio NOT NULL now that it's populated
ALTER TABLE "FreelancerProfile" ALTER COLUMN "bio" SET NOT NULL;

-- 4. Drop old columns
ALTER TABLE "FreelancerProfile" DROP COLUMN "skillsSummary";
ALTER TABLE "FreelancerProfile" DROP COLUMN "experienceSummary";
ALTER TABLE "FreelancerProfile" DROP COLUMN "portfolioLinks";
