import express from 'express';
import posts from './routes/posts.js';
import loggerMiddlerware from './middlewares/logger.js';
import errorMiddleware from './middlewares/error.js';
import notFoundMiddleware from './middlewares/notFound.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

const app = express();

// body parser middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger middleware
app.use(loggerMiddlerware);

// Static server
app.use(express.static(path.join(__dirname, 'public')));

// posts route
app.use('/api/posts', posts);

// error handler 
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})