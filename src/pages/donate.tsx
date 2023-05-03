import React from 'react';
import Layout from '@theme/Layout';

export default function Donate() {
  return (
    <Layout title="Effective Shell" description="Effective Shell - Donate">
      <div className="container">
        <div className="row row--no-gutters">
          <div className="col col--4 col--offset-4 padding-top--lg" style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <p>
              Effective Shell is free and open-source. If you have found this book useful please do consider a small donation!
            </p>
              <form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="JR3Q58575L3Y8" />
<input type="image" src="https://www.paypalobjects.com/en_GB/SG/i/btn/btn_donateCC_LG.gif" style={{border: 0}} name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" style={{border: 0}} src="https://www.paypal.com/en_SG/i/scr/pixel.gif" width="1" height="1" />
</form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
