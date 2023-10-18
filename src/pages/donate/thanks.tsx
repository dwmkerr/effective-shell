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
              Thank you for your payment. Your transaction has been completed and we've emailed you a receipt for your purchase. Log in to your PayPal account to view transaction details.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

