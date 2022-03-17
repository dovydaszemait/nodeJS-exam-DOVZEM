const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const accountRoute  = require('./routes/accountRoute');
const { groupRoute } = require('./routes/groupRoute');
const { billsRoute } = require('./routes/billsRoute');
// const groupRoute = require('./routes/groupRoute');
// const  { groupsRoutes }  = require('./routes/groupRoute');

// const mysql = require('mysql2/promise');
// const dbConfig = require('./dbConfig');


const PORT = process.env.SERVER_PORT || 3000;
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello express');
// });


app.use('/auth', authRoutes);
// app.use('/accounts', accountRoute);
// app.use('/bills', billsRouter);
// app.use('/auth/', authRoutes);
app.use('/', groupRoute);
app.use('/', billsRoute);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
