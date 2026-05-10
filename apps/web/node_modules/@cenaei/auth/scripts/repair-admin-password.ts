import { hashPassword } from "better-auth/crypto";
import { prisma } from "@cenaei/db";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@cenaei.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "password123";
  const passwordHash = await hashPassword(adminPassword);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN", emailVerified: true },
    create: {
      name: "sPort Admin",
      email: adminEmail,
      role: "ADMIN",
      emailVerified: true,
    },
  });

  const credentialAccount = await prisma.account.findFirst({
    where: { userId: user.id, providerId: "credential" },
  });

  if (credentialAccount) {
    await prisma.account.update({
      where: { id: credentialAccount.id },
      data: { accountId: adminEmail, password: passwordHash },
    });
  } else {
    await prisma.account.create({
      data: {
        userId: user.id,
        providerId: "credential",
        accountId: adminEmail,
        password: passwordHash,
      },
    });
  }

  console.log(`Admin credentials repaired for ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error("Failed to repair admin credentials:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
