import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HeroSection() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>Effective Shell</h1>
          <p className={styles.heroSubtitle}>
            Master the command line and transform your productivity. A free
            online book for developers, sysadmins, and power users who want to
            work faster and smarter.
          </p>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonPrimary}
              to="/transitioning-to-the-shell/">
              Read for Free
            </Link>
            <Link
              className={styles.buttonSecondary}
              href="https://amzn.to/4ho0F91">
              Amazon
            </Link>
            <Link
              className={styles.buttonSecondary}
              href="https://nostarch.com/effective-shell">
              No Starch
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <a href="https://amzn.to/4ho0F91">
            <img
              className={styles.bookCover}
              src="/images/es-amazon-cover.png"
              alt="Effective Shell Book Cover"
            />
          </a>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  const features = [
    {
      title: 'From Beginner to Power User',
      description:
        'Start with the basics and progress to advanced techniques. Each chapter works as a standalone guide.',
    },
    {
      title: 'Practical & Immediately Useful',
      description:
        'Real-world examples you can apply right away. No fluff, just techniques that make a difference.',
    },
    {
      title: 'Cross-Platform',
      description:
        'Works on Linux, macOS, and Windows (WSL). Learn skills that transfer across systems.',
    },
    {
      title: 'Shell Scripting',
      description:
        'Automate repetitive tasks with scripts. From simple one-liners to robust shell programs.',
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.featuresContainer}>
        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Master the command line with Effective Shell - a free online book for developers and power users">
      <main>
        <HeroSection />
        <FeatureSection />
      </main>
    </Layout>
  );
}
