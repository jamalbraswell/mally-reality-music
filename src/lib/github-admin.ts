const REPO = "jamalbraswell/mally-reality-music";
const BRANCH = "main";

function getToken() {
  const token = process.env.GITHUB_PAT;
  if (!token) throw new Error("GITHUB_PAT is not configured");
  return token;
}

function getPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not configured");
  return password;
}

export function verifyAdminPassword(authHeader: string | null) {
  if (!authHeader?.startsWith("Bearer ")) return false;
  return authHeader.slice(7) === getPassword();
}

interface GitHubFile {
  sha: string;
  content: string;
}

export async function readRepoFile(path: string): Promise<{ content: string; sha: string }> {
  const token = getToken();
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to read ${path}: ${res.status}`);
  }

  const data = (await res.json()) as GitHubFile;
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { content, sha: data.sha };
}

export async function writeRepoFile(
  path: string,
  content: string,
  message: string,
  sha?: string,
) {
  const token = getToken();
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to write ${path}: ${res.status} ${err}`);
  }

  return res.json();
}

export async function writeRepoBinary(
  path: string,
  buffer: Buffer,
  message: string,
  sha?: string,
) {
  const token = getToken();
  const body: Record<string, string> = {
    message,
    content: buffer.toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to upload ${path}: ${res.status} ${err}`);
  }

  return res.json();
}
