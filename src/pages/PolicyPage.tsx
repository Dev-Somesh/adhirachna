import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PolicyPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Navbar />
      <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto py-16 px-8">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              Your privacy is important to us. This privacy policy explains how we collect, use,
              and protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <ul className="list-disc pl-5">
              <li>Personal Information: Name, email address, phone number, etc.</li>
              <li>Usage Data: Information about how you use our website.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use your information to provide services, communicate with you, and improve our
              website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              We take reasonable measures to protect your personal information from unauthorized
              access and misuse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">
              You have the right to access, correct, or delete your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy, please contact us.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyPage;
