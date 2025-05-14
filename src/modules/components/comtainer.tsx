import { Container, ContainerProps } from "@mui/material";

export function MainContainer({ children, ...other }: ContainerProps) {
  return (
    <Container
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        paddingTop: 2,
      }}
      {...other}
    >
      {children}
    </Container>
  );
}
