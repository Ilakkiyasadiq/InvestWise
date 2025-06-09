import React from 'react';
import { ScrollText } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function Terms() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Terms and Policies"
        description="Please read our terms and conditions carefully"
        icon={ScrollText}
      />

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Terms of Service</h2>
          <p className="text-gray-600">
            By accessing and using InvestPro's services, you agree to be bound by these terms and conditions,
            all applicable laws and regulations, and agree that you are responsible for compliance with any
            applicable local laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. Investment Risks</h2>
          <p className="text-gray-600">
            All investments involve risk, and the past performance of a security, industry, sector, market,
            or financial product does not guarantee future results or returns. Investors should consider
            their investment objectives and risks carefully before investing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Privacy Policy</h2>
          <p className="text-gray-600">
            We respect your privacy and are committed to protecting your personal information. Our privacy
            policy outlines how we collect, use, and safeguard your data when you use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Account Security</h2>
          <p className="text-gray-600">
            You are responsible for maintaining the confidentiality of your account credentials and for
            all activities that occur under your account. Please notify us immediately of any unauthorized
            use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Trading Rules</h2>
          <p className="text-gray-600">
            Users must comply with all applicable trading rules and regulations. Market manipulation,
            insider trading, and other fraudulent activities are strictly prohibited and may result in
            account termination.
          </p>
        </section>
      </div>
    </div>
  );
}