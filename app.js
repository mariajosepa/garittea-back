import express from 'express'
import personRoutes from './routes/personRoutes.js'
import creditRoutes from './routes/creditRoutes.js';
import creditNoteRoutes from './routes/creditNoteRoutes.js';
import cors from 'cors';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3039',
}));

//define the routes
app.use(express.json());
app.use('/person', personRoutes);
app.use('/credits', creditRoutes);
app.use('/creditNotes', creditNoteRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the root route!');
});


//launch the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})