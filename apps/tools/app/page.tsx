export default function ToolsLandingPage() {
  return (
    <main>
      <h1>Tools</h1>
      <p>
        OSS tools are routed on this host via Traefik path prefixes (e.g. <code>/uptime</code>,{" "}
        <code>/n8n</code>) — see <code>infra/docker/docker-compose.prod.yml</code>.
      </p>
    </main>
  );
}
