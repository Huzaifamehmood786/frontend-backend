import { useRef } from "react";

function OTPInput({ otp, setOtp }) {
const inputs = useRef([]);

const handleChange = (value, index) => {
if (!/^[0-9]?$/.test(value)) return;


const newOtp = [...otp];
newOtp[index] = value;
setOtp(newOtp);

// next box focus
if (value && index < 5) {
  inputs.current[index + 1].focus();
}


};

const handleKeyDown = (e, index) => {
// backspace move
if (e.key === "Backspace" && !otp[index] && index > 0) {
inputs.current[index - 1].focus();
}
};

const handlePaste = (e) => {
const paste = e.clipboardData.getData("text").slice(0, 6);


if (!/^\d+$/.test(paste)) return;

const newOtp = paste.split("");
setOtp(newOtp);

inputs.current[5].focus();


};

return ( <div style={styles.container}>
{otp.map((digit, index) => (
<input
key={index}
ref={(el) => (inputs.current[index] = el)}
value={digit}
maxLength="1"
onChange={(e) => handleChange(e.target.value, index)}
onKeyDown={(e) => handleKeyDown(e, index)}
onPaste={handlePaste}
style={styles.input}
/>
))} </div>
);
}

const styles = {
container: {
display: "flex",
gap: "10px",
justifyContent: "center",
margin: "15px 0"
},
input: {
width: "45px",
height: "50px",
fontSize: "20px",
textAlign: "center",
border: "1px solid #ccc",
borderRadius: "8px"
}
};

export default OTPInput;
