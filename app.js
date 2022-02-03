const express = require('express');
const cors = require('cors');
const connectDb = require('./database');
const productsRoutes = require('./api/products/routes');
const shopsRoutes = require('./api/shops/routes');
const userRoutes = require("./api/users/routes");
const passport = require('passport');
const app = express();
const { localStrategy } = require("./middleware/passport")


app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
});
app.use(passport.initialize());
passport.use(localStrategy);
// Routes
app.use("/api", userRoutes) //added routes
app.use('/api/products', productsRoutes);
app.use('/api/shops', shopsRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});
connectDb();
app.listen(process.env.PORT || 5000);
