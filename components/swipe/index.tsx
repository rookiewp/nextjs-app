import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import classnames from 'classnames';
import styles from './swipe.module.scss';

interface IProps {
  children: React.ReactNode | (React.ReactNode)[];
  autoPlay?: boolean;
  duration?: number;
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
  // 轮播内容总宽度
  const [contentWidh, setContainerWidth] = useState<number>(0);
  // 轮播视口宽度
  const [swipeViewWidth, setSwipeViewWidth] = useState<number>(0);
  // 轮播项的index
  const [index, setIndex] = useState<number>(0);
  // 触摸点的开始位置和结束位置
  const [position, setPosition] = useState<IPosiiton>({ start: 0, end: 0 });
  // 轮播内容偏移距离，也就是translateX值
  const [moveX, setMovex] = useState<number>(0);
  // 切换过度效果
  const [transition, setTransition] = useState<string>(defaultTransition);
  // 是否停止自动轮播
  const [sotpAutoPlay, setStopAutoPlay] = useState<boolean>(false);
  const [hasMoveFirstItem, setHasMoveFirstItem] = useState<boolean>(false);
  const [hasMoveLastItem, setHasMoveLastItem] = useState<boolean>(false);

  const len = React.Children.count(children);

  // 计算宽度
  useEffect(() => {
    if (containerRef.current && children) {
      const containerWidth = containerRef.current.clientWidth * len;
      setContainerWidth(containerWidth);
      setSwipeViewWidth(containerRef.current.clientWidth);
    }
  }, [children]);

  // 自动轮播
  useEffect(() => {
    if (autoPlay && !sotpAutoPlay) {
      timer = setInterval(() => {
        setTransition(defaultTransition);
        setMovex(-(index + 1) * swipeViewWidth);
        setIndex(index < len - 1 ? index + 1 : 0);
      }, duration);
    }
    return () => { clearInterval(timer); };
  }, [swipeViewWidth, index, len, sotpAutoPlay, duration, autoPlay]);

  const handleTouchStart = useCallback((e) => {
    // 停止自动轮播
    if (timer) {
      clearInterval(timer);
    }
    setStopAutoPlay(true);
    // 取消过度效果
    setTransition('');
    const [touch] = e.touches;
    setPosition({ start: touch.clientX, end: touch.clientX });
  }, [timer]);

  const handleTouchMove = useCallback((e) => {
    const [touch] = e.touches;

    // if (hasMoveFirstItem && index === 0) {
    //   setMovex(0);
    //   firstItemRef.current.style.transform = '';
    //   setHasMoveFirstItem(false);
    // }
    // if (hasMoveLastItem && index === len - 1) {
    //   setMovex(-(len - 1) * swipeViewWidth);
    //   lastItemRef.current.style.transform = '';
    //   setHasMoveLastItem(false);
    // }
    // 最后一个，向左滑动，展示第一项
    if (index === len - 1 && touch.clientX < position.start && !hasMoveFirstItem) {
      const firstItem = firstItemRef.current;
      firstItem.style.transform = `translateX(${(index + 1) * swipeViewWidth}px)`;
      setHasMoveFirstItem(true);
    }
    // 第一个，向右滑动，展示最后一项
    if (index === 0 && touch.clientX > position.start && !hasMoveLastItem) {
      const lastItem = lastItemRef.current;
      lastItem.style.transform = `translateX(${-len * swipeViewWidth}px)`;
      setHasMoveLastItem(true);
    }

    setPosition({ ...position, ...{ end: touch.clientX } });
    setMovex(-index * swipeViewWidth + touch.clientX - position.start);
  }, [position, index, hasMoveFirstItem, hasMoveLastItem, len]);

  const handleTouchEnd = useCallback(() => {
    setStopAutoPlay(false);
    setTransition(defaultTransition);
    setPosition({ start: 0, end: 0 });
    if (Math.abs(position.end - position.start) > swipeViewWidth / 3) {
      if (position.end < position.start) {
        setMovex(-(index + 1) * swipeViewWidth);
        setIndex(index < len - 1 ? index + 1 : 0);
      } else {
        setMovex(-(index - 1) * swipeViewWidth);
        setIndex(index === 0 ? len - 1 : index - 1);
      }
    } else {
      setMovex(-(Math.max(index, 0)) * swipeViewWidth);
    }
  }, [position, index, len]);

  // 过度结束后，一些重置
  const handleTransitionEnd = useCallback(() => {
    const firstItem = firstItemRef.current;
    const lastItem = lastItemRef.current;
    setTransition('');
    setHasMoveLastItem(false);
    lastItem.style.transform = '';
    if (index === 0) {
      setMovex(0);
      firstItem.style.transform = '';
      setHasMoveFirstItem(false);
    }
    if (index === len - 1) {
      firstItem.style.transform = `translateX(${len * swipeViewWidth}px)`;
      setHasMoveFirstItem(true);
      setMovex(-index * swipeViewWidth);
    }
  }, [index, len, swipeViewWidth, firstItemRef.current, lastItemRef.current]);

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
                  style={{ width: swipeViewWidth }}
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
