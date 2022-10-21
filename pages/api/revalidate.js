export default async function handler(req, res) {
  const { path, token } = req.query;

  if (token !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  } else if (path.length === 0) {
    return res.status(401).json({ message: "Path is required" });
  }

  try {
    await res.unstable_revalidate(path);
  } catch (err) {
    return res.status(500).send("Error revalidating page");
  }

  return res.status(200).json({
    revalidated: true,
    message: `Path ${path} revalidated successfully`,
  });
}
