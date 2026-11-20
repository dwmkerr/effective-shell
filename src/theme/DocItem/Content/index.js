import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import BookBanner from '@site/src/components/BookBanner';
import BookFooter from '@site/src/components/BookFooter';
import HumanBookLinks from '@site/src/components/HumanBookLinks';

// A full copy of the theme's DocItem/Content (Docusaurus 2.2) rather than a
// wrapper, because the Human Book links and the book banner go under the
// chapter title, inside the block the theme renders the title in. Opt out per
// page with 'hide_book_banner: true' in front matter.
//
// The theme renders a "synthetic" title from front matter unless the page hides
// it or starts with its own h1. Every chapter uses front matter titles; a page
// with its own h1 gets the lead above its content instead.
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  return shouldRender ? metadata.title : null;
}

export default function DocItemContent({ children }) {
  const { frontMatter, metadata } = useDoc();
  const syntheticTitle = useSyntheticTitle();
  const showLead = frontMatter.hide_book_banner !== true;
  const chapter = metadata.permalink.split('/').filter(Boolean).pop() ?? '';
  const lead = showLead && (
    <>
      <HumanBookLinks chapter={chapter} />
      <BookBanner />
    </>
  );
  return (
    <>
      <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
        {syntheticTitle && (
          <header>
            <Heading as="h1">{syntheticTitle}</Heading>
          </header>
        )}
        {lead}
        <MDXContent>{children}</MDXContent>
      </div>
      {showLead && <BookFooter />}
    </>
  );
}
