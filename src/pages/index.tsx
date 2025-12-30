import React from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HeroSection() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h2 className={styles.heroTitle}>Effective Shell</h2>
          <p className={styles.heroSubtitle}>
            The hands-on guide for developers who want to master the command
            line and build a fast, flexible, and portable development environment.
          </p>
          <p className={styles.heroSubtitle}>
            This isn't a tour of shell commands. It's a blueprint for creating
            workflows that scale across machines, teams, and projects. By the
            end, your shell won't just be a tool; it'll be an extension of your
            thinking.
          </p>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonPrimary}
              to="/introduction/">
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
              src="/images/es-cover-3d.png"
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
      title: 'Understand Your AI',
      description:
        'AI regularly composes shell commands. Understanding the shell helps you verify and build on what AI generates.',
    },
    {
      title: 'Pipelines & Data',
      description:
        'Find, filter, and reshape data using grep, regex, and pipelines. Compose powerful commands from simple building blocks.',
    },
    {
      title: 'Scripts & Automation',
      description:
        'Automate setup, configuration, and repetitive tasks. From one-liners to robust shell programs.',
    },
    {
      title: 'Portable Toolkit',
      description:
        'Manage your environment with Git and dotfiles. Build workflows that scale across machines and projects.',
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

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.navbarLeft}>
          <Link to="/" className={styles.navbarLinkActive}>Home</Link>
          <Link to="/introduction" className={styles.navbarLink}>Read Now</Link>
        </div>
        <div className={styles.navbarRight}>
          <Link href="https://amzn.to/4ho0F91" className={styles.navbarLink}>
            Amazon
          </Link>
          <Link href="https://nostarch.com/effective-shell" className={styles.navbarLink}>
            No Starch
          </Link>
          <Link href="https://github.com/dwmkerr/effective-shell" className={styles.navbarLink}>
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="description" content="Master the command line with Effective Shell - a free online book for developers and power users" />
      </Head>
      <div className={styles.landingPage}>
        <Navbar />
        <div className={styles.topSpacer} />
        <main>
          <HeroSection />
        </main>
        <div className={styles.bottomSpacer} />
        <FeatureSection />
      </div>
    </>
  );
}
