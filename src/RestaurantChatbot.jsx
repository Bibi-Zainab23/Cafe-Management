import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";

export default function RestaurantChatbot() {
  const initialMessages = [
    { from: "bot", text: "👋 Welcome to Zainab’s Café!" },
    {
      from: "bot",
      text:
        "Please select an option:\n" +
        "1. Display menu\n" +
        "2. What are your opening and closing hours?\n" +
        "3. Can I book a table for [time/date]?\n" +
        "4. Do you support online ordering?\n" +
        "5. What is the delivery time?\n" +
        "6. What payment methods do you accept?\n" +
        "7. Do you offer catering for events?\n" +
        "8. Do you have feedback or complaint support?\n" +
        "9. What is your contact number?\n" +
        "10. Where is your restaurant located?",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [awaitingYesNo, setAwaitingYesNo] = useState(false);

  // Ref for auto-scroll
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Responses based on selection
  const responses = {
    1: "Our Menu:\n ☕ Beverages\n- Cappuccino – ₹120\n- Iced Latte – ₹140\n- Hot Chocolate– ₹130\n- Masala Chai– ₹20\n 🥪 Snacks & Light Meals\n- Veg Grilled Sandwich – ₹90\n- Cheese Garlic Bread – ₹110\n- French Fries – ₹120\n- Paneer Wrap – ₹130\n 🍕 Fast Bites\n- Margherita Mini Pizza – ₹140\n- Veggie Loaded Pizza – ₹160\n 🍰 Desserts\n- Vanilla Ice Cream Scoop – ₹60\n- Chocolate Brownie– ₹100\n- Blueberry Cheesecake Slice – ₹160",
    2: "We are open from 10:00 AM to 11:00 PM every day.",
    3: "Yes! You can book a table by telling us the time and date.",
    4: "Yes, we support online ordering through our website!",
    5: "Delivery time is usually 30–40 minutes.",
    6: "We accept Cash, UPI, Credit Card, and Debit Card.",
    7: "Yes, we offer catering services for small and large events.",
    8: "You can submit feedback or complaints here. We are happy to assist!",
    9: "Our contact number is +91 98765 43210",
    10: "We are located at: MG Road, Mumbai, India.",
  };

  const showMenu = () => ({
    from: "bot",
    text:
      "Please select an option:\n" +
      "1. Display menu\n" +
      "2. What are your opening and closing hours?\n" +
      "3. Can I book a table for [time/date]?\n" +
      "4. Do you support online ordering?\n" +
      "5. What is the delivery time?\n" +
      "6. What payment methods do you accept?\n" +
      "7. Do you offer catering for events?\n" +
      "8. Do you have feedback or complaint support?\n" +
      "9. What is your contact number?\n" +
      "10. Where is your restaurant located?",
  });

  // Handle user input
  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);

    // Restart command
    if (input.toLowerCase() === "restart" || input.toLowerCase() === "start") {
      setMessages([
        {
          from: "bot",
          text: "👋 Welcome back to Zainab’s Café!",
        },
        showMenu(),
      ]);
      setAwaitingYesNo(false);
      setInput("");
      return;
    }

    if (awaitingYesNo) {
      if (input.toLowerCase() === "yes") {
        setMessages((prev) => [...prev, showMenu()]);
      } else if (input.toLowerCase() === "no") {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "😊 Thank you for visiting! Have a great day! (Type 'restart' anytime to begin again)",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Please type only 'yes' or 'no'." },
        ]);
        setInput("");
        return;
      }
      setAwaitingYesNo(false);
      setInput("");
      return;
    }

    // Handle number choice
    const num = parseInt(input);

    if (responses[num]) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: responses[num] },
        { from: "bot", text: "Do you have another query? (yes/no)" },
      ]);
      setAwaitingYesNo(true);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Invalid option. Please enter a number between 1 and 10.",
        },
      ]);
    }

    setInput("");
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, margin: "auto" }}>
      <Paper sx={{ p: 1, height: 460, overflowY: "auto", mb: 1 }}>
        <Stack spacing={1}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                textAlign: msg.from === "user" ? "right" : "left",
              }}
            >
              <Typography
                sx={{
                  display: "inline-block",
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: msg.from === "user" ? "primary.main" : "grey.300",
                  color: msg.from === "user" ? "white" : "black",
                  whiteSpace: "pre-line",
                }}
              >
                {msg.text}
              </Typography>
            </Box>
          ))}
          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </Stack>
      </Paper>

      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center", height: 40 }}
      >
        <TextField
          fullWidth
          label="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          size="small"
          sx={{ height: "100%" }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          size="small"
          sx={{ height: 36, width: 36, minWidth: 0 }}
        >
          ➤
        </Button>
      </Stack>
    </Box>
  );
}
