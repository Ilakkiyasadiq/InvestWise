import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function StockCalculator() {
  const [calculatorType, setCalculatorType] = useState('profit');
  const [formData, setFormData] = useState({
    initialInvestment: '',
    shares: '',
    buyPrice: '',
    sellPrice: '',
    years: '',
    returnRate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateProfit = () => {
    const shares = parseFloat(formData.shares);
    const buyPrice = parseFloat(formData.buyPrice);
    const sellPrice = parseFloat(formData.sellPrice);
    
    if (isNaN(shares) || isNaN(buyPrice) || isNaN(sellPrice)) return null;
    
    const initialInvestment = shares * buyPrice;
    const finalValue = shares * sellPrice;
    const profit = finalValue - initialInvestment;
    const profitPercentage = (profit / initialInvestment) * 100;
    
    return {
      profit,
      profitPercentage,
      initialInvestment,
      finalValue,
    };
  };

  const calculateCompoundInterest = () => {
    const principal = parseFloat(formData.initialInvestment);
    const years = parseFloat(formData.years);
    const rate = parseFloat(formData.returnRate) / 100;
    
    if (isNaN(principal) || isNaN(years) || isNaN(rate)) return null;
    
    const finalAmount = principal * Math.pow(1 + rate, years);
    const profit = finalAmount - principal;
    
    return {
      finalAmount,
      profit,
      totalReturn: (profit / principal) * 100,
    };
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Stock Calculator"
        description="Calculate potential returns and analyze investments"
        icon={Calculator}
      />

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6">
          <select
            value={calculatorType}
            onChange={(e) => setCalculatorType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="profit">Profit Calculator</option>
            <option value="compound">Compound Interest Calculator</option>
          </select>
        </div>

        {calculatorType === 'profit' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Shares</label>
                <input
                  type="number"
                  name="shares"
                  value={formData.shares}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter number of shares"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Buy Price</label>
                <input
                  type="number"
                  name="buyPrice"
                  value={formData.buyPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter buy price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sell Price</label>
                <input
                  type="number"
                  name="sellPrice"
                  value={formData.sellPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter sell price"
                />
              </div>
            </div>

            {formData.shares && formData.buyPrice && formData.sellPrice && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                {(() => {
                  const result = calculateProfit();
                  if (!result) return null;
                  return (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Initial Investment</p>
                        <p className="text-lg font-semibold">${result.initialInvestment.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Final Value</p>
                        <p className="text-lg font-semibold">${result.finalValue.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Profit/Loss</p>
                        <p className={`text-lg font-semibold ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${Math.abs(result.profit).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Return</p>
                        <p className={`text-lg font-semibold ${result.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {result.profitPercentage.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Initial Investment</label>
                <input
                  type="number"
                  name="initialInvestment"
                  value={formData.initialInvestment}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter initial investment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Period (Years)</label>
                <input
                  type="number"
                  name="years"
                  value={formData.years}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter number of years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Annual Return Rate (%)</label>
                <input
                  type="number"
                  name="returnRate"
                  value={formData.returnRate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter expected return rate"
                />
              </div>
            </div>

            {formData.initialInvestment && formData.years && formData.returnRate && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                {(() => {
                  const result = calculateCompoundInterest();
                  if (!result) return null;
                  return (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Final Amount</p>
                        <p className="text-lg font-semibold">${result.finalAmount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Profit</p>
                        <p className="text-lg font-semibold text-green-600">${result.profit.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Return</p>
                        <p className="text-lg font-semibold text-green-600">{result.totalReturn.toFixed(2)}%</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}