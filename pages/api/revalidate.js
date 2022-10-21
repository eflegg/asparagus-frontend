export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate(req.query.path);
    return res.json({
      revalidated: true,
    });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}

// export default async function handler(req, res) {
//   const { path, token } = req.query;

//   if (token !== process.env.REVALIDATION_TOKEN) {
//     return res.status(401).json({ message: "Invalid token" });
//   } else if (path.length === 0) {
//     return res.status(401).json({ message: "Path is required" });
//   }

//   try {
//     await res.unstable_revalidate(path);
//   } catch (err) {
//     return res.status(500).send("Error revalidating page");
//   }

//   return res.status(200).json({
//     revalidated: true,
//     message: `Path ${path} revalidated successfully`,
//   });
// }

// export default async function handler(req, res) {
//   const {
//     body: { paths },
//     method,
//   } = req;

//   if (
//     req.headers.authorization !== `Bearer ${process.env.REVALIDATE_SECRET_KEY}`
//   ) {
//     return res.status(401).json({ message: "Invalid token" });
//   }

//   if (method !== "PUT") {
//     return res.status(405).json({ message: `Method ${method} Not Allowed` });
//   }

//   if (!paths) {
//     return res.status(412).json({ message: "No paths" });
//   }

//   try {
//     const revalidatePaths = paths
//       .filter((path) => path.startsWith("/"))
//       .map((path) =>
//         res.unstable_revalidate(path, { unstable_onlyGenerated: false })
//       );

//     await Promise.all(revalidatePaths);

//     return res.json({ revalidated: true, message: "Paths revalidated" });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }
