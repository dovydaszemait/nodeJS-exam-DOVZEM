const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
// const groupsRoutes = require('./routes/groupsRoutes');
// const accountsRoutes = require('./routes/accountsRoutes');

// const mysql = require('mysql2/promise');
// const dbConfig = require('./dbConfig');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello express');
// });


app.use('/auth/', authRoutes);
// app.use('/auth/', groupsRoutes);
// app.use('/auth/', accountsRoutes);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
