// @ts-check
// This react component is based on the excellent code at:
//  https://github.com/asciinema/asciinema-player/issues/72
// Props to https://github.com/dunnkers

import React, { useEffect, useRef } from 'react';
import * as AsciinemaPlayerLibrary from 'asciinema-player';

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
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentRef = ref.current;
        AsciinemaPlayerLibrary.create(src, currentRef, asciinemaOptions);
    }, [src]);

    return <div ref={ref} style={style} />;
};

export default AsciinemaPlayer;
