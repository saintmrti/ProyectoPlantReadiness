import express from "express";
import morgan from "morgan";
import cors from "cors";

import config from "./config.js";
import expectancyRoutes from "./routes/expectancy.routes.js";
import headingsRoutes from "./routes/headings.routes.js";
import shippableRoutes from "./routes/shippable.routes.js";
import machinesRoutes from "./routes/machines.routes.js";
import advanceRoutes from "./routes/advance.routes.js";

const app = express();

// Settings
app.set("port", config.port);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", expectancyRoutes);
app.use("/api", headingsRoutes);
app.use("/api", shippableRoutes);
app.use("/api", machinesRoutes);
app.use("/api", advanceRoutes);

export default app;
