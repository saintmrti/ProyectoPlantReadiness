import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import config from "./config.js";
import expectancyRoutes from "./routes/expectancy.routes.js";
import headingsRoutes from "./routes/headings.routes.js";
import shippableRoutes from "./routes/shippable.routes.js";
import machinesRoutes from "./routes/machines.routes.js";
import advanceRoutes from "./routes/advance.routes.js";
import phaseRoutes from "./routes/phase.routes.js";
import kpisRoutes from "./routes/kpis.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Settings
app.set("port", process.env.PORT || 3001);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/dist')));

// Routes
app.use("/api/expectativas", expectancyRoutes);
app.use("/api/rubros", headingsRoutes);
app.use("/api/entregables", shippableRoutes);
app.use("/api/maquinas", machinesRoutes);
app.use("/api/avances", advanceRoutes);
app.use("/api/fases", phaseRoutes);
app.use("/api/kpis", kpisRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

export default app;
