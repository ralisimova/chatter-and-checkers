import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Tile } from "../components/Tile";
import { useNavigate } from "react-router-dom";
import { gradients } from "../theme/theme";

const AppWrapper = styled(Container)(() => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const Header = styled(Box)(() => ({
  textAlign: "center",
  marginBottom: "25px",
  padding: "22px",
  borderRadius: "16px",
  background: gradients.primary,
  color: "white",
}));

const TileGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
}));

export function Home() {
  const navigate = useNavigate();

  return (
    <AppWrapper maxWidth="sm">
      <Header>
        <Typography variant="h4">🎲 Board Games Assistant</Typography>
        <Typography variant="subtitle1">Choose how you'd like help</Typography>
      </Header>

      <TileGrid>
        <Tile
          onClick={() => {
            navigate("/ask");
          }}
          title="Ask About Any Game"
          description="Rules, strategies, explanations"
        />

        <Tile
          onClick={() => {
            navigate("/find");
          }}
          title="Find a Game"
          description="Get personalized recommendations"
        />
      </TileGrid>
    </AppWrapper>
  );
}
