
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";

type PolicyContent = {
  title: string;
  lastUpdated: string;
  sections: {
    heading: string;
    content: string[];
  }[]
};

const PolicyPage = () => {
  const { policyType } = useParams<{ policyType: string }>();
  
  const policies: Record<string, PolicyContent> = {
    "privacy-policy": {
      title: "Privacy Policy",
      lastUpdated: "November 1, 2023",
      sections: [
        {
          heading: "Information We Collect",
          content: [
            "Adhirachna Engineering Solutions collects personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services when you participate in activities on the Website or otherwise when you contact us.",
            "The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make, and the products and features you use. The personal information we collect may include the following: name, phone numbers, email addresses, mailing addresses, job titles, contact preferences, and other similar information."
          ]
        },
        {
          heading: "How We Use Your Information",
          content: [
            "We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.",
            "We use the information we collect or receive to communicate with you. For example, we may contact you about our services, to respond to your inquiries, and to inform you about changes to terms, conditions, and policies."
          ]
        },
        {
          heading: "Will Your Information Be Shared With Anyone?",
          content: [
            "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.",
            "We may process or share your data based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, Legal Obligations, and Vital Interests."
          ]
        },
        {
          heading: "How Long Do We Keep Your Information?",
          content: [
            "We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).",
            "When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information."
          ]
        }
      ]
    },
    "terms-of-service": {
      title: "Terms of Service",
      lastUpdated: "November 1, 2023",
      sections: [
        {
          heading: "Agreement to Terms",
          content: [
            "These Terms of Service constitute a legally binding agreement made between you and Adhirachna Engineering Solutions concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.",
            "You agree that by accessing the website, you have read, understood, and agree to be bound by all of these Terms of Service."
          ]
        },
        {
          heading: "Intellectual Property Rights",
          content: [
            "Unless otherwise indicated, the website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.",
            "Provided that you are eligible to use the website, you are granted a limited license to access and use the website and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use."
          ]
        },
        {
          heading: "User Representations",
          content: [
            "By using the website, you represent and warrant that: (1) you have the legal capacity to agree to these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the website through automated or non-human means; (4) you will not use the website for any illegal or unauthorized purpose; and (5) your use of the website will not violate any applicable law or regulation.",
            "If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the website."
          ]
        },
        {
          heading: "Prohibited Activities",
          content: [
            "You may not access or use the website for any purpose other than that for which we make the website available. The website may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.",
            "As a user of the website, you agree not to: systematically retrieve data or other content from the website to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us."
          ]
        }
      ]
    },
    "cookie-policy": {
      title: "Cookie Policy",
      lastUpdated: "November 1, 2023",
      sections: [
        {
          heading: "What Are Cookies",
          content: [
            "Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third-party to recognize you and make your next visit easier and the service more useful to you.",
            "Cookies can be 'persistent' or 'session' cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser."
          ]
        },
        {
          heading: "How We Use Cookies",
          content: [
            "When you use and access our website, we may place a number of cookie files in your web browser. We use cookies for the following purposes: to enable certain functions of the website, to provide analytics, and to store your preferences.",
            "We use both session and persistent cookies on the website and we use different types of cookies to run the website: Essential cookies, Functionality cookies, and Analytics cookies."
          ]
        },
        {
          heading: "Third-Party Cookies",
          content: [
            "In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and to deliver advertisements on and through the website.",
            "Some of our advertising partners may use cookies and web beacons on our site. Our advertising partners include Google Analytics and Google AdSense."
          ]
        },
        {
          heading: "What Are Your Choices Regarding Cookies",
          content: [
            "If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer.",
            "Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit www.allaboutcookies.org."
          ]
        }
      ]
    }
  };
  
  const policy = policyType ? policies[policyType] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-adhirachna-light py-24">
        <div className="max-w-4xl mx-auto px-6">
          {policy ? (
            <>
              <h1 className="text-4xl font-bold text-adhirachna-darkblue mb-4">{policy.title}</h1>
              <p className="text-adhirachna-gray mb-8">Last Updated: {policy.lastUpdated}</p>
              
              <div className="glass-card p-8">
                {policy.sections.map((section, index) => (
                  <div key={index} className={index > 0 ? "mt-8" : ""}>
                    <h2 className="text-xl font-semibold text-adhirachna-darkblue mb-4">{section.heading}</h2>
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className={`text-adhirachna-gray ${pIndex > 0 ? "mt-4" : ""}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="glass-card p-8 text-center">
              <h1 className="text-2xl font-bold text-adhirachna-darkblue mb-4">Policy Not Found</h1>
              <p className="text-adhirachna-gray">
                The requested policy page could not be found. Please navigate back to the home page.
              </p>
              <a href="/" className="btn-primary mt-6 inline-block">
                Return to Home
              </a>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PolicyPage;
