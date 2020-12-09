import React, { useRef, useEffect, useState } from 'react';
import BetterScroll from 'better-scroll';

export interface IPos {
  x: number,
  y: number,
}

interface IProps {
  children: React.ReactNode | (React.ReactNode)[];
  options?: Record<string, unknown>;
  instance?: {
    current: any,
  };
  onScroll?: (pos: IPos) => void;
}

const BtScroll: React.FC<IProps> = (props) => {
  const {
    children,
    options = {},
    instance,
    onScroll,
  } = props;
  const divRef = useRef<HTMLDivElement | undefined>();
  const [betterScroll, setBetterScroll] = useState(null);

  useEffect(() => {
    if (divRef.current) {
      const previous = divRef.current.previousElementSibling;
      if (previous && !betterScroll) {
        const bts = new BetterScroll(previous, options);
        setBetterScroll(bts);
      }
      if (instance && betterScroll) {
        instance.current = betterScroll;
      }
      if (onScroll && betterScroll) {
        betterScroll.on('scroll', onScroll);
      }
    }
    return () => {
      if (betterScroll) betterScroll.off('scroll', onScroll);
    };
  }, [divRef.current, onScroll, betterScroll]);
  return (
    <>
      {
        [children, <div ref={divRef} key="" />]
      }
    </>
  );
};

export default BtScroll;
