import React from 'react';
import './mailchimp-signup.css';


function MailchimpSignup() {
  return (
      <div id="mc_embed_signup" css="background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;">
        <form action="https://effective-shell.us19.list-manage.com/subscribe/post?u=eac1a082b6db34d40aaff2caf&amp;id=20c9542b27" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
          <div id="mc_embed_signup_scroll">
            <label htmlFor="mce-EMAIL">Subscribe for Updates</label>
            <input type="email" defaultValue="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
            { /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */ }
            <div css="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_eac1a082b6db34d40aaff2caf_20c9542b27" tabIndex="-1" defaultValue="" /></div>
            <div className="clear"><input type="submit" defaultValue="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
          </div>
        </form>
      </div>
  );
}

export default MailchimpSignup;
