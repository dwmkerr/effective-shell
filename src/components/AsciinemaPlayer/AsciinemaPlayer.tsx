// @ts-check
// This react component is based on the excellent code at:
//  https://github.com/asciinema/asciinema-player/issues/72
// Props to https://github.com/dunnkers

import React, { useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

type AsciinemaPlayerProps = {
    src: string;
    style: React.CSSProperties;
    // START asciinemaOptions
    cols: string;
    rows: string;
    autoPlay: boolean
    preload: boolean;
    loop: boolean | number;
    startAt: number | string;
    speed: number;
    idleTimeLimit: number;
    theme: string;
    poster: string;
    fit: string;
    fontSize: string;
    // END asciinemaOptions
};

const AsciinemaPlayer: React.FC<AsciinemaPlayerProps> = ({
    src,
    style,
    ...asciinemaOptions
}) => {
  return (
    <BrowserOnly>
      {
        () => {
          if (!ExecutionEnvironment.canUseDOM) {
              return <div>ASCII Cinema Player Unavailable</div>;
          }
          const AsciinemaPlayerLibrary = require('asciinema-player');
          const ref = useRef<HTMLDivElement>(null);

          useEffect(() => {
            const currentRef = ref.current;
            AsciinemaPlayerLibrary.create(src, currentRef, asciinemaOptions);
          }, [src]);

          return <div ref={ref} style={style} />;
        }
      }
    </BrowserOnly>
  )
};

export default AsciinemaPlayer;
