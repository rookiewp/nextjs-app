import React, { useRef, useEffect } from 'react';
import BetterScroll from 'better-scroll';

interface IProps {
  children: React.ReactNode | (React.ReactNode)[];
  options?: Record<string, unknown>;
  bs?: {
    current: null | HTMLDivElement,
  };
}

const BtScroll: React.FC<IProps> = (props) => {
  const {
    children,
    options,
    bs,
  } = props;
  const divRef = useRef<HTMLDivElement | undefined>();

  useEffect(() => {
    if (divRef.current) {
      const previous = divRef.current.previousElementSibling;
      if (previous) {
        const bts = new BetterScroll(previous, options);
        if (bs) {
          bs.current = bts;
        }
      }
    }
  }, [divRef.current]);
  return (
    <>
      {
        [children, <div ref={divRef} key="" />]
      }
    </>
  );
};

export default BtScroll;
