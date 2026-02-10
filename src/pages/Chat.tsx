import { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";

import { chatService } from "../chat/service";
import { Message, Role } from "../types/message";
import { gradients } from "../theme/theme";
import { AppWrapper } from "../components/Container";
import { Header } from "../components/Header";

const ChatContainer = styled(Paper)({
  height: "300px",
  padding: "18px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  borderRadius: "16px",
});

const MessageBubble = styled(Box)({
  padding: "12px",
  borderRadius: "14px",
  maxWidth: "75%",
});

const UserMessage = styled(MessageBubble)(({ theme }) => ({
  alignSelf: "flex-end",
  backgroundColor: theme.palette.primary.main,
  color: "white",
}));

const BotMessage = styled(MessageBubble)(({ theme }) => ({
  alignSelf: "flex-start",
  backgroundColor: theme.palette.action.disabled,
}));

const InputArea = styled(Box)({
  display: "flex",
  gap: "10px",
  marginTop: "15px",
});

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
            <UserMessage key={index}>
              <Typography>{msg.content}</Typography>
            </UserMessage>
          ) : (
            <BotMessage key={index}>
              <Typography>{msg.content}</Typography>
            </BotMessage>
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
            background: gradients.primary,
          }}
        >
          Send
        </Button>
      </InputArea>
    </AppWrapper>
  );
}
