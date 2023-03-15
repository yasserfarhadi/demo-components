import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Splitter = ({
  children,
  vertical,
  defaultSizes,
  minSizes,
  maxSizes,
  onResize,
  splitterStyle,
  paneStyle,
  splitAt,
  splitIndex,
}) => {
  const [paneSizes, setPaneSizes] = useState(defaultSizes);
  const splitterRef = useRef(null);
  const isVertical = vertical === true;

  useEffect(() => {
    const handleResize = () => {
      const size = isVertical
        ? splitterRef.current.offsetWidth
        : splitterRef.current.offsetHeight;
      const totalSize = paneSizes.reduce((sum, size) => sum + size, 0);
      const defaultPaneSize = totalSize / paneSizes.length;
      setPaneSizes(
        paneSizes.map((size) =>
          Math.max(
            minSizes[0] || 0,
            Math.min(maxSizes[0] || Infinity, size * (size / totalSize) * size)
          )
        )
      );
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isVertical, maxSizes, minSizes, paneSizes]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const splitterRect = splitterRef.current.getBoundingClientRect();
    const pos = isVertical
      ? event.clientX - splitterRect.left
      : event.clientY - splitterRect.top;
    const newSize = Math.max(
      minSizes[splitIndex] || 0,
      Math.min(maxSizes[splitIndex] || Infinity, pos)
    );
    const newSizes = paneSizes.map((size, index) =>
      index === splitIndex ? newSize : size
    );
    setPaneSizes(newSizes);
    if (typeof onResize === 'function') {
      onResize(newSizes);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const paneStyleObj = {
    flex: 1,
    ...paneStyle,
  };

  const paneStyles = paneSizes.map((size, index) => ({
    ...(isVertical ? { height: size } : { width: size }),
    overflow: 'auto',
    ...paneStyleObj,
  }));

  const splitterStyleObj = {
    ...(isVertical ? { cursor: 'col-resize' } : { cursor: 'row-resize' }),
    ...splitterStyle,
  };

  if (!splitAt) {
    return (
      <div
        ref={splitterRef}
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'row' : 'column',
          height: '100%',
          width: '100%',
          ...splitterStyleObj,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div style={paneStyles[index]}>{child}</div>
        ))}
      </div>
    );
  }

  const firstPane = children.slice(0, splitAt);
  const secondPane = children.slice(splitAt);
  const firstSizes = paneSizes.slice(0, splitAt);
  const secondSizes = paneSizes.slice(splitAt);

  return (
    <div
      ref={splitterRef}
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        height: '100%',
        width: '100%',
        ...splitterStyleObj,
      }}
    >
      <div style={{ flex: 1 }}>
        <Splitter
          vertical={isVertical}
          defaultSizes={firstSizes}
          minSizes={minSizes}
          maxSizes={maxSizes}
          onResize={(sizes) =>
            setPaneSizes([...sizes.slice(0, splitAt), ...secondSizes])
          }
        >
          {firstPane}
        </Splitter>
      </div>
      <div
        style={{
          width: isVertical ? '100%' : `${splitterStyleObj.width}px`,
          height: isVertical ? `${splitterStyleObj.width}px` : '100%',
          ...splitterStyleObj,
        }}
        onMouseDown={handleMouseDown}
      />
      <div style={{ flex: 1 }}>
        <Splitter
          vertical={isVertical}
          defaultSizes={secondSizes}
          minSizes={minSizes}
          maxSizes={maxSizes}
          onResize={(sizes) =>
            setPaneSizes([...firstSizes, ...sizes.slice(splitAt)])
          }
        >
          {secondPane}
        </Splitter>
      </div>
    </div>
  );
};

Splitter.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  vertical: PropTypes.bool,
  defaultSizes: PropTypes.arrayOf(PropTypes.number),
  minSizes: PropTypes.arrayOf(PropTypes.number),
  maxSizes: PropTypes.arrayOf(PropTypes.number),
  onResize: PropTypes.func,
  splitterStyle: PropTypes.object,
  paneStyle: PropTypes.object,
  splitAt: PropTypes.number,
  splitIndex: PropTypes.number,
};

Splitter.defaultProps = {
  vertical: false,
  defaultSizes: [1, 1],
  minSizes: [0, 0],
  maxSizes: [Infinity, Infinity],
  splitterStyle: {},
  paneStyle: {},
  splitAt: null,
  splitIndex: 0,
};
