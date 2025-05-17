import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { toWords } from "number-to-words";
import khmerData from "./data/KhmerNumber.json";

const usdRate = 4000;

const convertToKhmer = (num) => {
  if (num === 0) return khmerData.digits["0"] + " រៀល";

  const digits = String(num).split("").reverse();
  const khmerWords = [];

  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    if (digit === "0") continue;

    const digitWord = khmerData.digits[digit];
    const unitWord = khmerData.units[i] || "";

    khmerWords.unshift(`${digitWord} ${unitWord}`.trim());
  }

  return khmerWords.join(" ") + " រៀល";
};

const App = () => {
  const [amountStr, setAmountStr] = useState("");
  const amount = parseInt(amountStr) || 0;

  const handleChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setAmountStr(val);
    }
  };

  const capitalizeEachWord = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 4,
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h2" gutterBottom align="center" color="primary">
          Riel Converter
        </Typography>

        <TextField
          fullWidth
          label="Enter amount in Riel"
          value={amountStr}
          onChange={handleChange}
          placeholder="e.g., 4000"
          variant="outlined"
          margin="normal"
        />

        <Card variant="outlined" sx={{ my: 2, backgroundColor: "#e3f2fd" }}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#0d47a1" }}
            >
              🇰🇭 Khmer (in words)
            </Typography>
            <Typography sx={{ fontSize: "1.3rem", fontWeight: "500" }}>
              {convertToKhmer(amount)}
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 2, backgroundColor: "#fce4ec" }}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#880e4f" }}
            >
              🇬🇧 English (in words)
            </Typography>
            <Typography sx={{ fontSize: "1.3rem", fontWeight: "500" }}>
              {capitalizeEachWord(toWords(amount))} Riel
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ backgroundColor: "#e8f5e9" }}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#1b5e20" }}
            >
              💵 Equivalent in USD
            </Typography>
            <Typography sx={{ fontSize: "1.3rem", fontWeight: "500" }}>
              ${(amount / usdRate).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default App;
