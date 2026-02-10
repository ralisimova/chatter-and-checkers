import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":mode" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
