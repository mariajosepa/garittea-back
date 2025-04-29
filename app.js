import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';  
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import personRoutes from './routes/personRoutes.js';
import creditRoutes from './routes/creditRoutes.js';
import creditNoteRoutes from './routes/creditNoteRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import { authenticateJWT } from './middleware/jwtAuth.js';
import billRoutes from './routes/billRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: 'http://localhost:3039',
  credentials: true, 
}));

//define the routes
app.use(express.json());
app.use(cookieParser());    

app.use('/auth', authRoutes);
app.use('/users', authenticateJWT, userRoutes);
app.use('/person', authenticateJWT, personRoutes);
app.use('/credits', authenticateJWT, creditRoutes);
app.use('/creditNotes', authenticateJWT, creditNoteRoutes);
app.use('/faculty', authenticateJWT, facultyRoutes);
app.use('/bills', authenticateJWT, billRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the root route!');
});


//launch the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})