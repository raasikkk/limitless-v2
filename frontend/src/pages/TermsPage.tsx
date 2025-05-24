import { useEffect } from "react";

const TermsPage = () => {
    const colorTheme = localStorage.getItem("theme")

    useEffect(() => {
        if (colorTheme) {
            document.body.classList.add(colorTheme);
        }
    }, [])

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-darkColor">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">Terms and Conditions</h1>
          <p className="text-base leading-relaxed">
            ---Effective Date: [31.12.2025] Welcome to
            Sheksiz. These Terms and Conditions ("Terms") govern your access to and
            use of the Sheksiz platform ("we", "our", or "us"). By using our
            website, you agree to these Terms. If you do not agree, please
            discontinue use of the platform.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">1. Platform Overview</h2>
            <p>
              Sheksiz is a web-based platform where users can: Participate in competitions that
              include a title, description, and rules. Submit entries using text
              and/or images. Create and manage an account via: Email, username, and
              password authentication. Google OAuth 2.0 login. Access a customizable
              profile, including options to update username, bio, and profile picture.
              Switch between interface languages: English, Russian, and Kazakh. Toggle
              between light and dark mode.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">2. User Data and Privacy</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Account and Profile Data</h3>
                <p>
                  We collect basic information for account management, such
                  as email address, username, and profile picture. You can modify your
                  profile details at any time through your account settings.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Analytics and Tracking</h3>
                <p>
                  We use PostHog, an analytics tool that helps us understand user
                  behavior to improve the platform. PostHog: Records user interactions in
                  video-like format. Collects data such as user IP address and country.
                  Does not capture or store sensitive text input — all inputs are hashed
                  visually with star symbols before any interaction is logged, and we do
                  not see or store the actual values.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Cookies and Authentication</h3>
                <p>
                  We use cookies to store your JWT (JSON Web Token), which is necessary to
                  maintain your logged-in session securely. These cookies do not contain
                  personal or sensitive information directly but are essential for access
                  control and session management. By using the platform, you consent to
                  our use of cookies for authentication and functional purposes.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">3. User Responsibilities</h2>
            <p>
              When using Sheksiz, you agree to: Provide
              accurate, lawful, and non-malicious content. Abide by the rules of each
              competition. Respect other users and avoid submitting offensive or
              harmful material. Not attempt to manipulate, interfere with, or access
              other users' data. We reserve the right to suspend or terminate accounts
              that violate these responsibilities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">4. Intellectual Property</h2>
            <p>
              Users retain full ownership of their submissions. By participating in
              competitions, you grant Sheksiz a non-exclusive right to display your
              submissions for the purpose of showcasing entries and results.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">5. Modifications</h2>
            <p>
              We may revise these Terms at any time. Changes will be
              posted on this page with the updated "Effective Date." Continued use of
              Sheksiz after updates implies acceptance of the revised Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">6. Contact</h2>
            <p>
              For questions or concerns about these Terms, please contact us
              at: [Insert Contact Email]
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Sheksiz Community Guidelines</h2>
            <p className="mb-6">
              Last Updated: [Insert Date] Welcome to
              the Sheksiz community! These guidelines exist to maintain a respectful,
              creative, and safe environment where users can enjoy fair competition
              and express themselves freely. By using Sheksiz, you agree to follow
              these rules. Violation of these guidelines may result in content
              removal, account suspension, or permanent bans.
            </p>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">1. Respect Others</h3>
                <p>
                  Treat all users with respect and kindness. Hate speech, racism, sexism,
                  homophobia, transphobia, or any form of discrimination is not tolerated.
                  Do not harass, threaten, or bully others through submissions, comments,
                  or profile information.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">2. Keep Submissions Clean and Appropriate</h3>
                <p>
                  Do not submit or upload any content that is: Sexually explicit or
                  pornographic Violent or gory Promoting hate or illegal activity Ensure
                  your submissions follow the specific rules and theme of the competition
                  you're entering.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">3. Original Work Only</h3>
                <p>
                  Submit only your own work. Plagiarism or using someone else's images/text without permission is not
                  allowed. If your work is inspired by or includes others' content, you
                  must give proper credit and ensure you have the right to use it.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">4. Use Your Account Responsibly</h3>
                <p>
                  Do not create fake accounts or impersonate other users. Do not use Sheksiz to spam, advertise, or promote unrelated
                  content or services. Keep your login credentials secure and report any
                  suspicious activity on your account.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">5. Fair Play in Competitions</h3>
                <p>
                  Follow the rules and deadlines of each competition exactly. Do not
                  manipulate voting systems, if any exist, or use automated tools to gain
                  unfair advantages. Accept outcomes respectfully, and focus on improving
                  and learning from others.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">6. Respect Platform Integrity</h3>
                <p>
                  Do not attempt to hack, exploit bugs, or disrupt the platform. If you discover
                  a technical issue, report it to the team instead of misusing it.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">7. Language and Communication</h3>
                <p>
                  We support English, Russian, and Kazakh. You are welcome to use any supported language, but avoid using offensive or
                  vulgar language. Be constructive when giving feedback and avoid
                  negativity for the sake of criticism.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">8. Reporting and Moderation</h3>
                <p>
                  If you see behavior or content that violates these guidelines, report it
                  through the platform or contact support. Our moderators have the right
                  to take action at their discretion to protect the safety and integrity
                  of the community.
                </p>
              </section>

              <div className="mt-8">
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">Final Note</h3>
                <p>
                  Sheksiz is a space for creativity, challenge, and growth. These guidelines are here to ensure that everyone
                  feels welcome, heard, and safe. Help us build a healthy and inspiring
                  platform — one competition at a time.
                </p>
                <p className="mt-4">
                  Thank you for being part of the Sheksiz community. If you have questions or need help, please reach
                  out to [Insert Contact Email or Link].
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
