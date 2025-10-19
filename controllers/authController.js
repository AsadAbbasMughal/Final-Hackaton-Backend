import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body; // 👈 includes role now
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // 👈 default role
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🟦 Login Request Body:", req.body);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "User not found" });
    }

    console.log("🔹 Stored password (hashed):", user.password);
    console.log("🔹 Plain password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🟢 Compare Result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
     user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      },
    });
  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


 
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Regular expressions for validation
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex =
//   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// // ---------------- Signup ----------------
// export const signup = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // 🔍 Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }

//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         message:
//           "Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character",
//       });
//     }

//     // 🔎 Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     // 🔐 Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 🧍 Create user
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "user", // Default role = user
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//       },
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ---------------- Login ----------------
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 🧾 Validation
//     if (!email || !password)
//       return res.status(400).json({ message: "All fields are required" });

//     if (!emailRegex.test(email))
//       return res.status(400).json({ message: "Invalid email format" });

//     // 🔍 Check user
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "User not found" });

//     // 🔑 Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     // 🎫 Create token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
