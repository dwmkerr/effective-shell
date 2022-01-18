import React from 'react';
import { ReactMailchimpEmailSignupForm } from 'react-mailchimp-email-signup-form';


//  Note: importing css is still work in progress for docosaurus, so we have
//  to instead import this file as a global css import in the theme options
//  in docosaurus.config.js.
//  import 'react-mailchimp-email-signup-form/dist/esm/index.css';

export const EmailSignupForm = () => (
  <ReactMailchimpEmailSignupForm
    elementId="email-signup-form"
    url="https://effective-shell.us19.list-manage.com/subscribe/post?u=eac1a082b6db34d40aaff2caf&id=20c9542b27"
    title="Subscribe for Updates"
    subtitle="If you would like to get email updates when new chapters are published, please do provide your email below. I won't be using it for anything beyond updates to the book."
  />
);
