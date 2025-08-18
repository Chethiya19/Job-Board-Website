import cookie from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),           // Expire immediately
      sameSite: "strict",             // Prevent CSRF
      path: "/",
    })
  );

  res.status(200).json({ message: "Logout successful" });
}
