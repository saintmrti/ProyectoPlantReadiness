const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const expectancyRoutes = require("./routes/expectancy.routes");
const headingsRoutes = require("./routes/headings.routes");
const shippableRoutes = require("./routes/shippable.routes");
const machinesRoutes = require("./routes/machines.routes");
const advanceRoutes = require("./routes/advance.routes");
const phaseRoutes = require("./routes/phase.routes");
const kpisRoutes = require("./routes/kpis.routes");
const projectsRoutes = require("./routes/projects.routes");
const championRoutes = require("./routes/champion.routes");

const app = express();
const port = process.env.PORT || 3001;

// Settings
app.set("port", port);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/dist")));

// Routes
app.use("/api/expectativas", expectancyRoutes);
app.use("/api/rubros", headingsRoutes);
app.use("/api/entregables", shippableRoutes);
app.use("/api/maquinas", machinesRoutes);
app.use("/api/avances", advanceRoutes);
app.use("/api/fases", phaseRoutes);
app.use("/api/kpis", kpisRoutes);
app.use("/api/proyectos", projectsRoutes);
app.use("/api/champions", championRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

module.exports = app;
