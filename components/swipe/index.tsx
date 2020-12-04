import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import classnames from 'classnames';
import styles from './swipe.module.scss';

interface IProps {
  children: React.ReactNode | (React.ReactNode)[];
  autoPlay?: boolean;
  duration?: number,
  style?: React.CSSProperties;
}

interface IPosiiton {
  start: number;
  end: number;
}

const defaultTransition = 'transform 0.5s';

let timer: ReturnType<typeof setInterval>;

const Swipe: React.FC<IProps> = (props) => {
  const {
    children,
    style,
    autoPlay = true,
    duration = 2000,
  } = props;
  const containerRef = useRef<HTMLDivElement | undefined>();
  const firstItemRef = useRef<HTMLDivElement | undefined>();
  const lastItemRef = useRef<HTMLDivElement | undefined>();

  const [contentWidh, setContainerWidth] = useState<number>(0);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [position, setPosition] = useState<IPosiiton>({ start: 0, end: 0 });
  const [moveX, setMovex] = useState<number>(0);
  const [transition, setTransition] = useState<string>(defaultTransition);
  const [hasMoveFirstItem, setHasMoveFirstItem] = useState<boolean>(false);
  const [hasMoveLastItem, setHasMoveLastItem] = useState<boolean>(false);

  const len = React.Children.count(children);

  // 计算宽度
  useEffect(() => {
    if (containerRef.current && children) {
      const containerWidth = containerRef.current.clientWidth * len;
      setContainerWidth(containerWidth);
      setItemWidth(containerRef.current.clientWidth);
    }
  }, [children]);

  // 自动轮播
  useEffect(() => {
    if (autoPlay) {
      timer = setInterval(() => {
        setTransition(defaultTransition);
        setMovex(-(index + 1) * itemWidth);
        setIndex(index < len - 1 ? index + 1 : 0);
      }, duration);
    }
    return () => { clearInterval(timer); };
  }, [itemWidth, index, len, hasMoveFirstItem]);

  const handleTouchStart = useCallback((e) => {
    setTransition('');
    const [touch] = e.changedTouches;
    setPosition({ start: touch.clientX, end: touch.clientX });
  }, []);

  const handleTouchMove = useCallback((e) => {
    const [touch] = e.changedTouches;

    if (hasMoveFirstItem && index === 0) {
      setTransition('');
      setMovex(0);
      firstItemRef.current.style.transform = '';
      setHasMoveFirstItem(false);
    }
    if (hasMoveLastItem && index === len - 1) {
      setTransition('');
      setMovex(-(len - 1) * itemWidth);
      lastItemRef.current.style.transform = '';
      setHasMoveLastItem(false);
    }
    // 最后一个，向左滑动
    if (index === len - 1 && touch.clientX < position.start && !hasMoveFirstItem) {
      const firstItem = firstItemRef.current;
      firstItem.style.transform = `translateX(${(index + 1) * itemWidth}px)`;
      setHasMoveFirstItem(true);
    }
    // 第一个，向右滑动
    if (index === 0 && touch.clientX > position.start && !hasMoveLastItem) {
      const lastItem = lastItemRef.current;
      lastItem.style.transform = `translateX(${-len * itemWidth}px)`;
      setHasMoveLastItem(true);
    }

    setPosition({ ...position, ...{ end: touch.clientX } });
    setMovex(-index * itemWidth + touch.clientX - position.start);
  }, [position, index, hasMoveFirstItem, hasMoveLastItem, len]);

  const handleTouchEnd = useCallback(() => {
    setTransition(defaultTransition);
    setPosition({ start: 0, end: 0 });
    if (Math.abs(position.end - position.start) > itemWidth / 3) {
      if (position.end < position.start) {
        setMovex(-(index + 1) * itemWidth);
        setIndex(index < len - 1 ? index + 1 : 0);
      } else {
        setMovex(-(index - 1) * itemWidth);
        setIndex(index === 0 ? len - 1 : index - 1);
      }
    } else {
      setMovex(-(Math.max(index, 0)) * itemWidth);
    }
  }, [position, index, len]);

  const handleTransitionEnd = useCallback(() => {
    if (hasMoveFirstItem && index === 0) {
      setTransition('');
      setMovex(0);
      firstItemRef.current.style.transform = '';
      setHasMoveFirstItem(false);
    }
    if (index === len - 1 && !hasMoveFirstItem) {
      const firstItem = firstItemRef.current;
      firstItem.style.transform = `translateX(${(index + 1) * itemWidth}px)`;
      setHasMoveFirstItem(true);
    }
  }, [hasMoveFirstItem, index, len, itemWidth]);

  return (
    <div
      className={styles.swipe}
      style={{ ...style }}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTransitionEnd={handleTransitionEnd}
    >
      <>
        <div
          className={styles['swipe-content']}
          style={{
            width: contentWidh,
            transform: `translateX(${moveX}px)`,
            transition,
          }}
        >
          {
            React.Children.map(children, (child, i) => {
              return (
                <div
                  className={styles['swipe-item']}
                  style={{ width: itemWidth }}
                  ref={(input) => {
                    if (i === 0) firstItemRef.current = input;
                    if (i === len - 1) lastItemRef.current = input;
                  }}
                >
                  {child}
                </div>
              );
            })
          }
        </div>
        <div className={styles.dots}>
          {
            React.Children.map(children, (child, i) => {
              return (
                <div
                  className={classnames(styles['dot-item'], {
                    [styles['dot-active']]: i === index,
                  })}
                />
              );
            })
          }
        </div>
      </>
    </div>
  );
};

export default Swipe;
