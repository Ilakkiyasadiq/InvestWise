import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';

interface PaymentState {
  stockSymbol: string;
  shares: number;
  totalAmount: number;
}

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const paymentState = location.state as PaymentState;

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    saveCard: false,
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue,
    }));

    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
    };

    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Invalid card number';
    }

    const [month, year] = formData.expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!month || !year || 
        Number(month) > 12 || 
        Number(month) < 1 || 
        Number(year) < currentYear || 
        (Number(year) === currentYear && Number(month) < currentMonth)) {
      newErrors.expiryDate = 'Invalid expiry date';
    }

    if (formData.cvv.length !== 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    if (formData.name.length < 3) {
      newErrors.name = 'Invalid name';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);

    // Redirect to transaction history after success
    setTimeout(() => {
      navigate('/history');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="text-gray-600">Your transaction has been processed successfully.</p>
          <p className="text-gray-600">Redirecting to transaction history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Secure Payment"
        description="Complete your stock purchase securely"
        icon={CreditCard}
      />

      {paymentState && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Stock</span>
              <span className="font-semibold">{paymentState.stockSymbol}</span>
            </div>
            <div className="flex justify-between">
              <span>Shares</span>
              <span className="font-semibold">{paymentState.shares}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total Amount</span>
              <span>${paymentState.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`p-4 border rounded-lg flex items-center justify-center ${
                  paymentMethod === 'credit'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('credit')}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Credit Card
              </button>
              <button
                type="button"
                className={`p-4 border rounded-lg flex items-center justify-center ${
                  paymentMethod === 'debit'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('debit')}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Debit Card
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className={`block w-full px-3 py-2 border rounded-md ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  maxLength={19}
                />
                <CreditCard className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
              </div>
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className={`block w-full px-3 py-2 border rounded-md ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={3}
                  />
                  <Lock className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
                </div>
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveCard"
                name="saveCard"
                checked={formData.saveCard}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                Save card for future purchases
              </label>
            </div>

            <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              Your payment information is secure and encrypted
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Processing...</span>
                </>
              ) : (
                'Complete Purchase'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}