import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import styles from './RollingNumber.module.css';

type RollingNumberProps = {
  value: number;
  suffix?: string;
  trigger: boolean;
  durationMs?: number;
  delayMs?: number;
};

type DigitProps = {
  digit: string;
  index: number;
  length: number;
  animationState: 'idle' | 'running';
  durationMs: number;
  delayMs: number;
};

function RollingDigit({
  digit,
  index,
  length,
  animationState,
  durationMs,
  delayMs,
}: DigitProps) {
  const numericDigit = Number(digit);
  const loops = index === 0 && length > 1 ? 2 : 1;
  const sequence = useMemo(
    () => Array.from({ length: loops * 10 + numericDigit + 1 }, (_, value) => value % 10),
    [loops, numericDigit],
  );
  const targetIndex = sequence.length - 1;

  return (
    <span className={styles.digitWindow} aria-hidden="true">
      <span
        className={animationState === 'running' ? styles.digitAnimated : styles.digitIdle}
        style={
          {
            '--target-index': targetIndex,
            '--duration': `${durationMs}ms`,
            '--delay': `${delayMs + index * 40}ms`,
          } as CSSProperties
        }
      >
        {sequence.map((value, sequenceIndex) => (
          <span key={`${index}-${sequenceIndex}`} className={styles.digitCell}>
            {value}
          </span>
        ))}
      </span>
    </span>
  );
}

export function RollingNumber({ value, suffix, trigger, durationMs = 860, delayMs = 0 }: RollingNumberProps) {
  const [animationState, setAnimationState] = useState<'idle' | 'running'>('idle');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (trigger && !hasAnimated.current) {
      hasAnimated.current = true;
      setAnimationState('running');
    }
  }, [trigger]);

  const sign = value < 0 ? '-' : '';
  const digits = Math.abs(value).toString().split('');
  const finalText = `${sign}${digits.join('')}${suffix ?? ''}`;

  if (animationState === 'idle') {
    return (
      <span className={styles.placeholder} aria-label={finalText}>
        {finalText}
      </span>
    );
  }

  return (
    <span className={styles.root} aria-label={finalText}>
      {sign ? <span className={styles.staticPart}>{sign}</span> : null}
      {digits.map((digit, index) => (
        <RollingDigit
          key={`${digit}-${index}`}
          digit={digit}
          index={index}
          length={digits.length}
          animationState={animationState}
          durationMs={durationMs}
          delayMs={delayMs}
        />
      ))}
      {suffix ? <span className={styles.staticPart}>{suffix}</span> : null}
    </span>
  );
}
