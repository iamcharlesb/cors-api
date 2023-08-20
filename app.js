import express from 'express';
import session from 'express-session';
import cors from 'cors';

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://www.w3schools.com', 'https://localhost:3000'], // Replace with your frontend domain
  credentials: true, // Allow cookies to be sent and received
};
app.use(cors(corsOptions));

// Express session configuration
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: 'none', // Set to 'none' for cross-origin cookies
    },
  })
);

// Your API endpoints
app.post('/api/login', (req, res) => {
  // Handle login logic
  // Example: Set a session variable
  req.session.user = { id: 123, username: 'exampleUser' };
  res.status(200).json({ message: 'Logged in successfully' });
});

app.get('/api/user', (req, res) => {
  // Access the session variable
  const user = req.session.user;
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});