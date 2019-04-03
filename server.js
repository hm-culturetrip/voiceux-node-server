const app = require("./app");
const PORT = 5000;

app.default.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});