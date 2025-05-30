
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PolicyPageProps {
  type?: 'privacy' | 'terms' | 'cookie';
}

const PolicyPage = ({ type = 'privacy' }: PolicyPageProps) => {
  const [isDarkMode] = useState(false);

  const getContent = () => {
    switch (type) {
      case 'terms':
        return {
          title: 'Terms of Service',
          sections: [
            {
              title: 'Acceptance of Terms',
              content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.'
            },
            {
              title: 'Service Description',
              content: 'We provide engineering solutions and consulting services. The specific terms of each service will be outlined in separate agreements.'
            },
            {
              title: 'User Responsibilities',
              content: 'You agree to use our services responsibly and in accordance with all applicable laws and regulations.'
            },
            {
              title: 'Limitation of Liability',
              content: 'Our liability is limited to the extent permitted by law. We are not responsible for indirect or consequential damages.'
            },
            {
              title: 'Changes to Terms',
              content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.'
            }
          ]
        };
      case 'cookie':
        return {
          title: 'Cookie Policy',
          sections: [
            {
              title: 'What Are Cookies',
              content: 'Cookies are small text files that are stored on your device when you visit our website.'
            },
            {
              title: 'How We Use Cookies',
              content: 'We use cookies to improve your browsing experience, analyze site traffic, and personalize content.'
            },
            {
              title: 'Types of Cookies',
              content: 'We use both session cookies (temporary) and persistent cookies (stored for longer periods).'
            },
            {
              title: 'Managing Cookies',
              content: 'You can control and manage cookies through your browser settings. Note that disabling cookies may affect site functionality.'
            },
            {
              title: 'Third-Party Cookies',
              content: 'We may use third-party services that place cookies on your device. These are governed by their respective privacy policies.'
            }
          ]
        };
      default:
        return {
          title: 'Privacy Policy',
          sections: [
            {
              title: 'Introduction',
              content: 'Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.'
            },
            {
              title: 'Information We Collect',
              content: 'We collect personal information such as name, email address, phone number, and usage data about how you use our website.'
            },
            {
              title: 'How We Use Your Information',
              content: 'We use your information to provide services, communicate with you, and improve our website.'
            },
            {
              title: 'Data Security',
              content: 'We take reasonable measures to protect your personal information from unauthorized access and misuse.'
            },
            {
              title: 'Your Rights',
              content: 'You have the right to access, correct, or delete your personal information.'
            },
            {
              title: 'Contact Us',
              content: 'If you have any questions about this privacy policy, please contact us.'
            }
          ]
        };
    }
  };

  const content = getContent();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Navbar />
      <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto py-16 px-8">
          <h1 className="text-4xl font-bold mb-8">{content.title}</h1>

          {content.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <p className="mb-4">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyPage;
