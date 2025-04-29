# Razorpay Payment Test Application

This is a **Razorpay Payment Integration** application built with **Next.js**. It allows users to purchase credits using Razorpay's payment gateway, dynamically calculate credits based on the selected currency, and display a summary of the user's credits.

---

## Features

### 1. **Payment Integration**
- Users can select a currency (`USD` or `INR`) and enter an amount to purchase credits.
- Razorpay SDK is integrated for seamless payment processing.
- Payments are processed securely using Razorpay's API.

### 2. **Dynamic Credit Calculation**
- Credits are calculated dynamically based on the selected currency and the current exchange rate.
- Conversion rates:
  - `1 INR = 20 credits`
  - `1 USD = 20 * exchangeRate credits`

### 3. **Credits Summary**
- Displays the user's:
  - Pending Tokens
  - Remaining Questions
  - Free Credits
  - Paid Credits
  - Total Credits
- Credits data is fetched from the `/api/creditsstatus/` endpoint.

### 4. **Dynamic Exchange Rate**
- Fetches the current exchange rate between USD and INR from an external API.

---

## Technologies Used

- **Frontend**: React.js (with Next.js)
- **Styling**: Tailwind CSS
- **Payment Gateway**: Razorpay
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Material UI**: For loading indicators

---

## Installation and Setup

### Prerequisites
- Node.js installed on your system.
- Razorpay account with API keys.
- Backend API endpoints for:
  - `/api/creditsstatus/`
  - `/api/razorpay/create-checkout/`
  - `/api/razorpay/success/`

### Steps to Run the Application

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/razorpay-payment-test.git
   cd razorpay-payment-test
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   RAZORPAY_KEY_ID=your_razorpay_key_id
   API_BASE_URL=http://127.0.0.1:8000
   EXCHANGE_RATE_API_URL=https://api.exchangerate-api.com/v4/latest/USD
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

### 1. **Fetch Credits Summary**
- **Endpoint**: `GET /api/creditsstatus/`
- **Headers**:
  - `Authorization: Token <auth_token>`
- **Response**:
  ```json
  {
    "Pending_tokens": 919200.0,
    "remaining_questions": 2760,
    "freecredits": 5000.0,
    "paidcredits": 914200.0,
    "totalcredits": 919200.0
  }
  ```

### 2. **Create Razorpay Checkout**
- **Endpoint**: `POST /api/razorpay/create-checkout/`
- **Headers**:
  - `Authorization: Token <auth_token>`
- **Request Body**:
  ```json
  {
    "amount": 1200,
    "currency": "INR"
  }
  ```
- **Response**:
  ```json
  {
    "razorpay_order_id": "order_1234567890abcdef",
    "payment_token": "db39a0ce-347e-48cc-98dd-f3c9529e9f42"
  }
  ```

### 3. **Handle Razorpay Payment Success**
- **Endpoint**: `POST /api/razorpay/success/`
- **Headers**:
  - `Authorization: Token <auth_token>`
- **Request Body**:
  ```json
  {
    "razorpay_order_id": "order_1234567890ffabcdef",
    "razorpay_payment_id": "pay_1234567890abcdef",
    "payment_token": "db39a0ce-347e-48cc-98dd-f3c9529e9f42"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Payment successful!",
    "credits_added": 24000
  }
  ```

---

## Application Structure

```
razorpay-payment-test/
├── app/
│   ├── payment/
│   │   └── page.jsx       # Main Payment Page
├── public/
│   └── ...                # Static Assets
├── styles/
│   └── globals.css        # Global Styles
├── .env.local             # Environment Variables
├── next.config.mjs        # Next.js Configuration
├── package.json           # Dependencies and Scripts
└── README.md              # Documentation
```

---

## Key Components

### 1. **Payment Page (`page.jsx`)**
- Handles the payment process using Razorpay.
- Fetches and displays the user's credits summary.
- Dynamically calculates credits based on the selected currency and amount.

### 2. **Credits Summary**
- Displays the user's free, paid, and total credits.
- Data is fetched from the `/api/creditsstatus/` endpoint.

### 3. **Razorpay Integration**
- Razorpay SDK is loaded dynamically.
- Payments are processed securely using Razorpay's API.

---

## How It Works

1. **User Interaction**:
   - The user selects a currency (`USD` or `INR`) and enters an amount.
   - The application calculates the credits dynamically based on the selected currency and exchange rate.

2. **Payment Processing**:
   - The user clicks "Pay Now," and the Razorpay checkout is triggered.
   - After successful payment, the backend updates the user's credits.

3. **Credits Summary**:
   - The application fetches and displays the updated credits summary.

---

## Screenshots

### 1. Payment Page
![Payment Page](https://via.placeholder.com/720x400?text=Payment+Page)

### 2. Credits Summary
![Credits Summary](https://via.placeholder.com/720x400?text=Credits+Summary)

---

## Future Enhancements

- Add transaction history to display past payments.
- Implement user authentication and role-based access control.
- Add support for additional currencies.
- Improve error handling and user feedback.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For any questions or feedback, feel free to reach out:

- **Email**: your-email@example.com
- **GitHub**: [Your GitHub Profile](https://github.com/your-profile)

---
