import React from 'react';
import SpeechRecognition from 'react-speech-recognition';
import { useParams, useHistory } from 'react-router-dom';
import { getResult, updateResult } from '../../api/resources/results';
import GridMode from '../../components/GridMode';
import Progress from '../../components/Progress';
import SequenceMode from '../../components/SequenceMode';
import { useMessageContext } from '../../context/Message';
import { Loading } from '../../styles/Animations.styles';
import { Container } from '../../styles/Layout.styles';
import { GAME_TYPE } from '../../utils/constants';
import AnimatedModal from '../../components/AnimatedModal';

const PlayGame: React.FC = () => {
  const { push } = useHistory();
  const { showMessage } = useMessageContext();
  const { id } = useParams<{ id: string }>();

  const [result, resultLoading] = getResult(id);
  const [update, updateLoading] = updateResult(result?.data._id, (res) => {
    if (res.data?.finished) {
      setTimeout(() => {
        showMessage({
          visible: true,
          message: 'Game completed, well done!',
          type: 'success',
        });
        setTimeout(() => {
          push(`/games/${result?.data.game._id}`);
        }, 3000);
      }, 1000);
    }
  });

  const canListen = !!SpeechRecognition.browserSupportsSpeechRecognition();

  return (
    <>
      {/* {!canListen && (
        <AnimatedModal error back={`/games/${result?.data.game._id}`}>
          <h3 className="bold large">
            Voice recognition isn&apos;t available.
          </h3>
          <p>
            Our games work using the Web Speech API which is only available in
            certain browsers, Chrome Or Edge.
          </p>
        </AnimatedModal>
      )} */}
      <Container>
        {(resultLoading || updateLoading) && <Loading bg />}
        {result && (
          <>
            {result.data.game.mode === GAME_TYPE.GRID && (
              <GridMode {...{ result: result.data, update }} />
            )}
            {result.data.game.mode === GAME_TYPE.SEQUENCE && (
              <SequenceMode
                {...{ result: result.data, update, updateLoading }}
              />
            )}
            <Progress {...{ result: result.data }} />
          </>
        )}
      </Container>
    </>
  );
};

export default PlayGame;
