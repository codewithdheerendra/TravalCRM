import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-500"
      sx={{ bgcolor: "background.default", color: "text.primary" }}
    >
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <Typography
        variant="h2"
        component="h1"
        className="mb-8 font-bold text-center"
      >
        Welcome to Your Themed App
      </Typography>

      <Card
        sx={{
          minWidth: 275,
          maxWidth: "80%",
          boxShadow: 3,
        }}
        className="rounded-lg"
      >
        <CardContent className="p-8">
          <Typography variant="h5" component="div" className="mb-4">
            MUI Card with Tailwind Utilities
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            This card uses MUI&apos;s styling system, which is now aware of our
            light/dark theme.
          </Typography>
          <Typography variant="body2" className="mb-6">
            We are also using Tailwind CSS classes like{" "}
            <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">
              mb-6
            </code>{" "}
            and{" "}
            <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">
              font-bold
            </code>{" "}
            for rapid styling.
          </Typography>
          <Box className="text-center">
            <Button variant="contained">Primary Action</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
