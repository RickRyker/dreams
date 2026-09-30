// server/src/index.ts

import { createServer } from "./server/bootstrap";

const { server } = createServer();

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
