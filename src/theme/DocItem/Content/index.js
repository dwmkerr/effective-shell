import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { useDoc } from '@docusaurus/theme-common/internal';
import BookBanner from '@site/src/components/BookBanner';
import BookFooter from '@site/src/components/BookFooter';
import HumanBookLinks from '@site/src/components/HumanBookLinks';

// Renders the book lead and the Human Book links above every chapter and the
// purchase footer below it, so individual pages don't need to remember to
// include them. Opt out per page with 'hide_book_banner: true' in front matter.
export default function ContentWrapper(props) {
  const { frontMatter, metadata } = useDoc();
  const hideBanner = frontMatter.hide_book_banner === true;
  const chapter = metadata.permalink.split('/').filter(Boolean).pop() ?? '';
  return (
    <>
      {!hideBanner && <BookBanner />}
      {!hideBanner && <HumanBookLinks chapter={chapter} />}
      <Content {...props} />
      {!hideBanner && <BookFooter />}
    </>
  );
}
