const app=require('./App');
// start server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`[message] Server started on port ${PORT}`);
});