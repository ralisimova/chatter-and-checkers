import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { gradients } from "../theme/theme";

export const Header = styled(Box)({
  textAlign: "center",
  marginBottom: "25px",
  padding: "22px",
  borderRadius: "16px",
  background: gradients.primary,
  color: "white",
});
