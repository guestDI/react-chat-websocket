const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center p-6">
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-3xl font-bold text-white">About Us</h1>
        </div>
        <div className="p-6 space-y-4">
          <section>
            <h2 className="text-xl font-semibold text-white">Our Mission</h2>
            <p className="mt-2">
              Our mission is to create the best possible product that improves
              the lives of our users. We believe in quality, innovation, and
              user satisfaction.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Our Vision</h2>
            <p className="mt-2">
              We envision a world where technology bridges gaps and fosters
              closer relationships. Our goal is to be a leader in this
              transformation.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Our Values</h2>
            <ul className="list-disc list-inside mt-2">
              <li>Integrity</li>
              <li>Innovation</li>
              <li>Customer Centricity</li>
              <li>Excellence</li>
              <li>Collaboration</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Our Team</h2>
            <p className="mt-2">
              Our team is composed of dedicated professionals from diverse
              backgrounds, all working together to achieve our common goals. We
              value each team member's unique perspective and contribution.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Contact Us</h2>
            <p className="mt-2">
              If you have any questions or feedback, feel free to reach out to
              us at{' '}
              <a href="mailto:contact@company.com" className="text-blue-400">
                contact@company.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
