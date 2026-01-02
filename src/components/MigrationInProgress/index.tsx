import React from 'react';
import Admonition from '@theme/Admonition';

const MigrationInProgress: React.FC = () => {
  return (
    <Admonition type="note" title="Chapter Updates">
      <p>
        Each chapter is being updated to match the latest version of the print book, available from{' '}
        <a href="https://amzn.to/4ho0F91">Amazon</a> and{' '}
        <a href="https://nostarch.com/effective-shell">No Starch Press</a>.
        There may be some inconsistencies in links or minor content differences until this page is fully migrated.
      </p>
    </Admonition>
  );
};

export default MigrationInProgress;
