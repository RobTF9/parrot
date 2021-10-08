import React, { useState, useEffect } from 'react';
import { BetaFooterWrapper } from './styles';

const HIDDEN = 'HIDDEN';
const SHOWING = 'SHOWING';

const BetaFooter: React.FC = () => {
  const [visible, setVisible] = useState<string | null>(
    localStorage.getItem('betaMessageVisible')
      ? localStorage.getItem('betaMessageVisible')
      : SHOWING
  );

  useEffect(() => {
    if (visible) {
      localStorage.setItem(`betaMessageVisible`, visible);
    }
  }, [visible]);

  return visible === SHOWING ? (
    <BetaFooterWrapper>
      <p>
        Thank you for signing up to Parrot! We&apos;re currently in beta which
        means some things are still a work in progress.{' '}
        <a href="https://github.com/RobTF9/parrot/issues/new?assignees=RobTF9&labels=bug&template=bug_report.md&title=">
          Report an issue
        </a>{' '}
        <button
          type="button"
          onClick={() => setVisible(visible === SHOWING ? HIDDEN : SHOWING)}
        >
          Hide this message
        </button>
      </p>
    </BetaFooterWrapper>
  ) : null;
};

export default BetaFooter;
