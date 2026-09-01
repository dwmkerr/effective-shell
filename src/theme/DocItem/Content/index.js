import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { useDoc } from '@docusaurus/theme-common/internal';
import BookBanner from '@site/src/components/BookBanner';
import BookFooter from '@site/src/components/BookFooter';

// Renders the book lead above every chapter and the purchase footer below it,
// so individual pages don't need to remember to include them. Opt out per page
// with 'hide_book_banner: true' in front matter.
export default function ContentWrapper(props) {
  const { frontMatter } = useDoc();
  const hideBanner = frontMatter.hide_book_banner === true;
  return (
    <>
      {!hideBanner && <BookBanner />}
      <Content {...props} />
      {!hideBanner && <BookFooter />}
    </>
  );
}
