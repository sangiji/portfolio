-- AlterTable
ALTER TABLE "_PostTags" ADD CONSTRAINT "_PostTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PostTags_AB_unique";

-- AlterTable
ALTER TABLE "_ProjectTags" ADD CONSTRAINT "_ProjectTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProjectTags_AB_unique";

-- AlterTable
ALTER TABLE "_SkillTags" ADD CONSTRAINT "_SkillTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_SkillTags_AB_unique";
