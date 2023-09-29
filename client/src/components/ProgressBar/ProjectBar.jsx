import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ProjectBar = ({ percentage }) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h6">{percentage}%</Typography>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ width: "200px", mt: 2 }}
      />
    </Box>
  );
};
