import { prisma } from '../src/index';

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Wipe existing data (Order matters to avoid foreign key constraint errors)
  console.log('🧹 Clearing old data...');
  await prisma.gameScore.deleteMany();
  await prisma.media.deleteMany();
  await prisma.project.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.game.deleteMany();
  await prisma.demo.deleteMany();
  await prisma.user.deleteMany();

  // 2. Seed Admin User
  console.log('👤 Creating admin user...');
  await prisma.user.create({
    data: {
      name: 'sPort Admin',
      email: 'admin@cenaei.com',
      emailVerified: true,
      role: 'ADMIN',
    },
  });

  // 3. Seed Tags
  console.log('🏷️ Creating tags...');
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'TypeScript', slug: 'typescript', color: '#3178C6' } }),
    prisma.tag.create({ data: { name: 'Next.js 16', slug: 'nextjs-16', color: '#000000' } }),
    prisma.tag.create({ data: { name: 'Three.js', slug: 'threejs', color: '#049EF4' } }),
    prisma.tag.create({ data: { name: 'PostgreSQL', slug: 'postgresql', color: '#336791' } }),
    prisma.tag.create({ data: { name: 'Colyseus', slug: 'colyseus', color: '#E83A3A' } }),
  ]);

  const [tsTag, nextTag, threeTag, pgTag, colyseusTag] = tags;

  // 4. Seed Projects
  console.log('🚀 Creating projects...');
  await prisma.project.create({
    data: {
      title: 'Aetheria 3D Experience',
      slug: 'aetheria-3d',
      summary: 'An immersive WebGL portfolio shell with physics-based interactions.',
      problem: 'Traditional portfolios lack spatial engagement and fail to show 3D math skills.',
      solution: 'Built a custom R3F renderer with optimized draw calls and a dynamic camera system.',
      content: { overview: 'A deeply interactive WebGL playground.', roles: ['Creative Developer'] },
      status: 'PUBLISHED',
      featured: true,
      order: 1,
      liveUrl: 'https://aetheria.example.com',
      techStack: { connect: [{ id: tsTag.id }, { id: threeTag.id }, { id: nextTag.id }] },
    },
  });

  await prisma.project.create({
    data: {
      title: 'Nexus Identity',
      slug: 'nexus-identity',
      summary: 'High-performance auth microservice handling 10k+ concurrent requests.',
      problem: 'Legacy OAuth wrappers were bottlenecking the primary application servers.',
      solution: 'Extracted authentication into an Edge-compatible Better Auth service.',
      content: { overview: 'Stateless, JWT-driven architecture.', metrics: '99.99% Uptime' },
      status: 'PUBLISHED',
      featured: true,
      order: 2,
      techStack: { connect: [{ id: tsTag.id }, { id: pgTag.id }] },
    },
  });

  await prisma.project.create({
    data: {
      title: 'Orbit Multiplayer Engine',
      slug: 'orbit-engine',
      summary: 'State-authoritative game server for real-time browser games.',
      content: { overview: 'Delta-compressed state sync via WebSockets.' },
      status: 'DRAFT',
      featured: false,
      order: 3,
      techStack: { connect: [{ id: tsTag.id }, { id: colyseusTag.id }] },
    },
  });

  // 5. Seed Blog Posts
  console.log('📝 Creating blog posts...');
  await prisma.blogPost.create({
    data: {
      title: 'Mastering Turborepo & Prisma v7',
      slug: 'mastering-turborepo-prisma-v7',
      excerpt: 'A deep dive into fixing strict dependency isolation and edge build errors.',
      content: { body: 'When migrating to Prisma v7, the schema URL is deprecated...' },
      status: 'PUBLISHED',
      readingTime: 6,
      views: 1240,
      publishedAt: new Date(),
      tags: { connect: [{ id: nextTag.id }, { id: pgTag.id }] },
    },
  });

  await prisma.blogPost.create({
    data: {
      title: 'Optimizing React Three Fiber Draw Calls',
      slug: 'optimizing-r3f-draw-calls',
      excerpt: 'How to use InstancedMesh to render 100,000 objects at 60fps.',
      content: { body: 'The naive approach to rendering multiple geometries...' },
      status: 'PUBLISHED',
      readingTime: 8,
      views: 890,
      publishedAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
      tags: { connect: [{ id: threeTag.id }] },
    },
  });

  // 6. Seed Skills
  console.log('💡 Creating skills...');
  await prisma.skill.create({
    data: {
      name: 'Frontend Architecture',
      slug: 'frontend-architecture',
      category: 'Engineering',
      pitch: 'Building scalable, resilient user interfaces.',
      businessValue: 'Reduces time-to-market for new features by maintaining predictable codebases.',
      technicalDepth: { paradigms: ['React RSCs', 'State Machines', 'WebGL'] },
      yearsExp: 5,
      order: 1,
      published: true,
      usedIn: { connect: [{ id: nextTag.id }, { id: tsTag.id }] },
    },
  });

  // 7. Seed Games
  console.log('🎮 Creating games...');
  const game = await prisma.game.create({
    data: {
      name: 'Asteroid Sweeper',
      slug: 'asteroid-sweeper',
      description: 'A fast-paced spatial awareness challenge.',
      type: 'LEADERBOARD',
      active: true,
    },
  });

  await prisma.gameScore.createMany({
    data: [
      { gameId: game.id, player: 'PlayerOne', score: 9500 },
      { gameId: game.id, player: 'Guest_99', score: 4200 },
      { gameId: game.id, player: 'SpeedRunner', score: 12450 },
    ],
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Gracefully close the connection pool
    await prisma.$disconnect();
  });