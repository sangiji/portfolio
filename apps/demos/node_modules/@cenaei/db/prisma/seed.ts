import { prisma } from '../src/index';
import { hashPassword } from "better-auth/crypto";

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
  // Deleting users will cascade and delete accounts and sessions
  await prisma.user.deleteMany(); 

  // 2. Seed Admin User with Credential Account
  console.log('👤 Creating admin user with credentials...');
  
  const adminPasswordHash = await hashPassword("password123");

  await prisma.user.create({
    data: {
      name: 'sPort Admin',
      email: 'admin@cenaei.com',
      emailVerified: true,
      role: 'ADMIN',
      accounts: {
        create: {
          accountId: 'admin@cenaei.com', // Better Auth uses the email or a UUID for credential account IDs
          providerId: 'credential',
          password: adminPasswordHash,
        },
      },
    },
  });

  // 3. Seed Tags
  console.log('🏷️ Creating tags...');
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'React', slug: 'react', color: '#61DAFB' } }),
    prisma.tag.create({ data: { name: 'Node.js', slug: 'nodejs', color: '#339933' } }),
    prisma.tag.create({ data: { name: 'WebGL', slug: 'webgl', color: '#990000' } }),
    prisma.tag.create({ data: { name: 'Docker', slug: 'docker', color: '#2496ED' } }),
  ]);

  const [reactTag, nodeTag, webglTag, dockerTag] = tags;

  // 4. Seed Projects
  console.log('🚀 Creating projects...');
  await prisma.project.create({
    data: {
      title: 'Echoes of the Deep',
      slug: 'echoes-deep-webgl',
      summary: 'An underwater audio-visualizer built with custom WebGL shaders.',
      problem: 'Browsers struggle to render high-fidelity underwater caustics in real-time.',
      solution: 'Wrote optimized GLSL shaders computing ray-marched volumetrics directly on the GPU.',
      content: { overview: 'A sensory journey through procedural oceans.', roles: ['Tech Lead', 'Shader Artist'] },
      status: 'PUBLISHED',
      featured: true,
      order: 1,
      techStack: { connect: [{ id: webglTag.id }, { id: reactTag.id }] },
    },
  });

  await prisma.project.create({
    data: {
      title: 'Sentinel Monitoring',
      slug: 'sentinel-monitoring',
      summary: 'Container orchestration dashboard handling millions of log events.',
      content: { overview: 'Real-time Docker container tracking and anomaly detection.' },
      status: 'PUBLISHED',
      featured: true,
      order: 2,
      techStack: { connect: [{ id: dockerTag.id }, { id: nodeTag.id }] },
    },
  });

  // 5. Seed Blog Posts
  console.log('📝 Creating blog posts...');
  await prisma.blogPost.create({
    data: {
      title: 'Why I Abandoned REST for Real-Time Sockets',
      slug: 'abandoning-rest-for-sockets',
      excerpt: 'A deep dive into latency optimization for multiplayer browser games.',
      content: { body: 'When building my latest tracker game, HTTP overhead became the primary bottleneck...' },
      status: 'PUBLISHED',
      readingTime: 5,
      views: 342,
      publishedAt: new Date(),
      tags: { connect: [{ id: nodeTag.id }] },
    },
  });

  // 6. Seed Skills
  console.log('💡 Creating skills...');
  await prisma.skill.create({
    data: {
      name: 'Container Orchestration',
      slug: 'container-orchestration',
      category: 'DevOps',
      pitch: 'Deploying resilient, auto-scaling backend infrastructure.',
      businessValue: 'Ensures zero-downtime deployments and reduces server costs by 30%.',
      technicalDepth: { tools: ['Docker Compose', 'Traefik', 'Linux'] },
      yearsExp: 4,
      order: 1,
      published: true,
      usedIn: { connect: [{ id: dockerTag.id }, { id: nodeTag.id }] },
    },
  });

  console.log('✅ Seeding complete!');
  console.log('--------------------------------------------------');
  console.log('🔐 Admin Login Credentials:');
  console.log('Email: admin@cenaei.com');
  console.log('Password: password123');
  console.log('--------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });