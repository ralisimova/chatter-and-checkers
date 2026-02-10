import { Paper, styled, Typography } from "@mui/material";

const Container = styled(Paper)(() => ({
  padding: "40px 20px",
  textAlign: "center",
  cursor: "pointer",
  borderRadius: "18px",
  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
  color: "white",
  transition: "0.3s",
  boxShadow: "0px 6px 15px rgba(0,0,0,0.25)",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

interface Props {
  onClick: () => void;
  title: string;
  description: string;
}

export function Tile({ onClick, title, description }: Props) {
  return (
    <Container onClick={onClick}>
      <Typography variant="h5">{title}</Typography>
      <Typography>{description}</Typography>
    </Container>
  );
}
