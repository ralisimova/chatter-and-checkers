import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";

import { chatService } from "../chat/service";
import { Message, Role } from "../types/message";

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
  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
  color: "white",
}));

const ChatContainer = styled(Paper)(() => ({
  height: "300px",
  padding: "18px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  borderRadius: "16px",
}));

const UserMessage = styled(Box)(() => ({
  alignSelf: "flex-end",
  backgroundColor: "#2575fc",
  color: "white",
  padding: "12px",
  borderRadius: "14px",
  maxWidth: "75%",
}));

const BotMessage = styled(Box)(() => ({
  alignSelf: "flex-start",
  backgroundColor: "#f3f3f3",
  padding: "12px",
  borderRadius: "14px",
  maxWidth: "75%",
}));

const InputArea = styled(Box)(() => ({
  display: "flex",
  gap: "10px",
  marginTop: "15px",
}));

export function Chat() {
  const { mode } = useParams<{ mode: string }>();

  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const allMessages = [
      ...chatMessages,
      { role: Role.User, content: userInput },
    ];

    setChatMessages(allMessages);
    setUserInput("");

    const response = await chatService.sendMessage(allMessages, mode || "ask");

    setChatMessages([
      ...allMessages,
      { role: Role.Assistant, content: response },
    ]);
  };

  const onBack = () => {
    setChatMessages([]);
    navigate("/");
  };

  return (
    <AppWrapper maxWidth="sm">
      <Header>
        <Typography variant="h4">
          {mode === "ask" ? "Ask About Any Game" : "Find a Game"}
        </Typography>

        <Button
          variant="contained"
          onClick={onBack}
          sx={{ mt: 2, background: "white", color: "#2575fc" }}
        >
          Back
        </Button>
      </Header>

      <ChatContainer elevation={4}>
        {chatMessages.map((msg, index) =>
          msg.role === Role.User ? (
            <UserMessage key={index}>{msg.content}</UserMessage>
          ) : (
            <BotMessage key={index}>{msg.content}</BotMessage>
          )
        )}
      </ChatContainer>

      <InputArea>
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <Button
          variant="contained"
          onClick={sendMessage}
          sx={{
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          }}
        >
          Send
        </Button>
      </InputArea>
    </AppWrapper>
  );
}
