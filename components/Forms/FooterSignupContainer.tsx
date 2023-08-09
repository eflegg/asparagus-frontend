import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import FooterSignupForm from "./FooterSignupForm";

const FooterSignupContainer = (props) => {
  const postUrl = `https://eepurl.us16.list-manage.com/subscribe/post?u=48412d1cef9610dca90286de4&amp;id=4e95f09911&amp;f_id=00d7abe0f0`;

  return (
    <div className="mc__form-container">
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status, message }) => (
          <FooterSignupForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
};

export default FooterSignupContainer;
