// /* eslint-disable no-console */
// import { Server } from "http";
// import mongoose from "mongoose";
// import app from "./app";
// import { envVars } from "./app/config/env";

// import { connectRedis } from "./app/config/redis.config";
// import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

// let server: Server;

// const startServer = async () => {
//   try {
//     await mongoose.connect(envVars.DB_URL);
//     console.log("Connected to DB!!");
//     server = app.listen(envVars.PORT, () => {
//       console.log(`Server is listening to port ${envVars.PORT}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// (async () => {
//   await connectRedis();
//   await startServer();
//   await seedSuperAdmin();
// })();

// process.on("SIGTERM", () => {
//   console.log("SIGTERM signal recieved... Server shutting down..");

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }

//   process.exit(1);
// });

// process.on("SIGINT", () => {
//   console.log("SIGINT signal recieved... Server shutting down..");

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }

//   process.exit(1);
// });

// process.on("unhandledRejection", (err) => {
//   console.log("Unhandled Rejecttion detected... Server shutting down..", err);

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }

//   process.exit(1);
// });

// process.on("uncaughtException", (err) => {
//   console.log("Uncaught Exception detected... Server shutting down..", err);

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }

//   process.exit(1);
// });

// // Unhandler rejection error
// // Promise.reject(new Error("I forgot to catch this promise"))

// // Uncaught Exception Error
// // throw new Error("I forgot to handle this local erro")

// /**
//  * unhandled rejection error
//  * uncaught rejection error
//  * signal termination sigterm
//  */

/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { connectRedis } from "./app/config/redis.config";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    await connectRedis();
    console.log("Connected to DB & Redis!!");

    await seedSuperAdmin();

    server = app.listen(envVars.PORT || 5000, () => {
      console.log(`Server is listening to port ${envVars.PORT || 5000}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
};

if (process.env.VERCEL !== "1") {
  startServer();
}

// Shutdown handlers
const gracefulShutdown = () => {
  console.log("Shutting down server...");
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  gracefulShutdown();
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  gracefulShutdown();
});

// ✅ Export app so Vercel can access it if targeted
export default app;
