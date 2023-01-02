export default function handler(req, res) {
  if ((req.query.token !== "js") | !req.query.post) {
    return res.status(401).json({ message: "Invalid Post" });
  }
  res.setPreviewData({});
  res.redirect(`/posts/${req.query.post}`);
  return;
}
